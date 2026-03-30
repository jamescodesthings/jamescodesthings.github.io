# Desired Architecture

Reference document based on [campsnap-filters](https://github.com/jamescodesthings/campsnap-filters).

## Overview

A Node.js (pure ESM) build system orchestrated via Docker Compose with a Makefile as the task runner. The pattern:

- **Input**: JSON definition files in a `source-packs/` directory
- **Processing**: Node scripts that read definitions, run a pipeline, and write outputs
- **Output**: Built artifacts in a `packs/` directory + intermediate cache in `tmp/`
- **Infrastructure**: Docker Compose services; Makefile wraps all compose invocations

The repo demonstrates a clean pattern for a **data-in → pipeline → artifacts-out** project with proper caching, multi-service composition, and a simple make-based DX.

---

## Directory Structure

```
project/
├── Makefile                   # Task runner — wraps docker-compose
├── docker-compose.yml         # Service definitions
├── Dockerfile                 # Main app container (Node + system deps)
├── package.json               # ESM Node, npm scripts: start / sanitize / pages
├── src/
│   ├── index.js               # Main entry — orchestrates the full pipeline
│   ├── config.js              # Central path config object
│   ├── utils.js               # fs wrappers, hashing, zipping, PDF conversion
│   ├── pack-helpers.js        # Iterators: forEachPack / forEachFilter / forEachItem
│   ├── filter-tools.js        # Serialization: JSON definitions → output file format
│   ├── timers.js              # hrtime-based timer utility
│   └── ...                    # Domain-specific processing modules
├── source-packs/              # Input: JSON definition files
├── packs/                     # Output: built artifacts (gitignored)
├── tmp/                       # Cache: intermediate files keyed by md5 hash (gitignored)
├── static/                    # Static assets: fonts, images, CSS, EJS templates
└── scripts/                   # Bash utility scripts (own-packs, compress-pdf, etc.)
```

---

## Key Files

### Makefile

All targets use a `docker-compose-run` helper function that builds, runs, logs on failure, and tears down.

```makefile
SHELL := bash
.ONESHELL:
.SILENT:
.SHELLFLAGS := -euo pipefail -c

define docker-compose-run
	docker compose build
	docker compose run --rm $(1) && exit_status=$$? || exit_status=$$?
	[ "$$exit_status" -ne 0 ] && docker compose ps && docker compose logs
	docker compose down
	(exit $$exit_status)
endef

build:
	export PACK=$(pack);
	$(call docker-compose-run,build)
.PHONY: build

test:
	export TEST=1
	$(call docker-compose-run,build)
.PHONY: test

sanitize:
	$(call docker-compose-run,sanitize)
.PHONY: sanitize

own:
	./scripts/own-packs
.PHONY: own

clean:
	rm -rf packs
	rm -rf tmp
.PHONY: clean

clean-pdf:
	rm -rf ./tmp/*.pdf
.PHONY: clean-pdf

pages:
	$(call docker-compose-run,pages)
.PHONY: pages
```

**Key patterns:**

- `define docker-compose-run ... endef` — reusable shell function avoids repeating compose boilerplate
- Captures exit status manually (`&& exit_status=$$? || exit_status=$$?`) to allow `docker compose logs` before teardown
- `make build pack=./source-packs/foo.json` — passes a value into the container via `export PACK=$(pack)`
- `.ONESHELL:` — each target's recipe runs in a single shell (needed for `export` to persist across lines)

---

### docker-compose.yml

Five services: a static file server, a PDF renderer, the main build, and two secondary tasks.

```yaml
services:
  serve:
    image: joseluisq/static-web-server:2-alpine
    container_name: 'serve'
    ports:
      - 8080:80
    restart: unless-stopped
    environment:
      - SERVER_ROOT=/var/public
      - SERVER_HEALTH=true
    volumes:
      - ./:/var/public
    healthcheck:
      test: 'nc -z localhost 80 || exit 1'
      interval: 10s
      timeout: 5s
      retries: 5

  gotenberg:
    build:
      context: .
      dockerfile: gotenberg.Dockerfile
    environment:
      API_TIMEOUT: 300s
      LOG_LEVEL: info
    depends_on:
      serve:
        condition: service_healthy
    restart: unless-stopped
    ports:
      - 3000:3000
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
      interval: 10s
      timeout: 5s
      retries: 10

  build:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      TEST:
      PACK:
      SERVER_URL: http://serve:80
      GOTENBERG_URL: http://gotenberg:3000
    working_dir: /app
    depends_on:
      serve:
        condition: service_healthy
      gotenberg:
        condition: service_healthy
    volumes:
      - ./:/app
    command: sh -c "npm install && npm start"

  sanitize:
    image: node:22-alpine
    working_dir: /app
    volumes:
      - ./:/app
    command: sh -c "npm install && npm run sanitize"

  pages:
    image: node:22-alpine
    working_dir: /app
    volumes:
      - ./:/app
    command: sh -c "npm install && npm run pages"
```

**Key patterns:**

- `depends_on: condition: service_healthy` — build waits for dependent services to pass healthchecks before starting
- `TEST:` / `PACK:` with no value — Docker passes the host env var through (empty = not set, value = forwarded)
- Simple tasks (`sanitize`, `pages`) use plain `node:22-alpine` with no custom image; only `build` needs the custom Dockerfile
- The repo root is volume-mounted as `/app` — output files land on the host without a copy step

---

### Dockerfile

```dockerfile
FROM node:22-alpine

RUN apk add --no-cache fontconfig ghostscript

RUN mkdir -p /usr/share/fonts/truetype/custom

COPY ./static/fonts /usr/share/fonts/truetype/custom

RUN fc-cache -f -v

WORKDIR /app
```

Minimal Alpine base + system packages + custom fonts. No `npm install` here — that runs at container start via the compose `command`.

---

### package.json

```json
{
  "name": "campsnap-filters",
  "version": "1.0.0",
  "scripts": {
    "start": "node --no-deprecation ./src/index.js",
    "sanitize": "node --no-deprecation ./src/sanitize.js",
    "pages": "node --no-deprecation ./src/pages.js"
  },
  "type": "module",
  "dependencies": {
    "adm-zip": "0.5.16",
    "debug": "^4.4.3",
    "ejs": "3.1.10",
    "merge-img": "^2.1.3",
    "sharp": "0.34.3",
    "showdown": "^2.1.0"
  }
}
```

**Key patterns:**

- `"type": "module"` — all `.js` files are ESM; no TypeScript, no bundler
- Three explicit entry points: `start`, `sanitize`, `pages` — each is a standalone node script
- `--no-deprecation` suppresses noisy npm warnings in container output

---

### src/config.js

Central path config — imported everywhere. All paths are relative strings resolved at call sites.

```js
const config = {
  destDir: './packs',
  sourceDir: './source-packs',
  previewDir: 'preview',
  validationDir: 'validation',
  imageDir: './static/images',
  validationImage: 'validation.png',
  defaultPreviewImages: './static/images/preview-images',
  tmpDir: './tmp',
};

export default config;
```

---

### src/index.js (main pipeline)

The pipeline entry point. Reads source JSON files, dispatches to typed build branches, runs sequential async steps.

```js
import Debug from 'debug';
import config from './config.js';
import {
  ls,
  readFile,
  writeFile,
  mkdirp,
  rmrf,
  isTest,
  createTempDir,
  tempDir,
  cp,
  exists,
  md5,
  htmlToPdf,
  zip,
  gsCompressPDF,
} from './utils.js';
import { jsonToCS8Filter, jsonToCSProFilter } from './filter-tools.js';
import { forEachFilter, forEachPack, forEachPreviewImage } from './pack-helpers.js';
import { timer } from './timers.js';

const debug = Debug('campsnap-filters:index');
debug.enabled = true;

const { PACK } = process.env;

async function buildAllFilterPacks() {
  const overallTimer = timer('+ buildAllFilterPacks');
  await createTempDir();

  // Collect source files, respect PACK / TEST env vars
  const allSourceFiles = (await ls(config.sourceDir))
    .map(f => `${config.sourceDir}/${f}`)
    .filter(f => f.endsWith('.json'));

  let sourceFiles;
  if (PACK) {
    sourceFiles = [PACK];
  } else if (isTest()) {
    sourceFiles = testPacks;
  } else {
    sourceFiles = allSourceFiles;
  }

  await cleanOutputDirectory(sourceFiles);
  await prepareOutputDirectories(sourceFiles);

  // Split by type suffix, run type-specific pipeline
  const csproSourceFiles = sourceFiles.filter(f => f.endsWith('.cspro.json'));
  if (csproSourceFiles.length !== 0) {
    await buildFilters(csproSourceFiles, jsonToCSProFilter);
    await buildPreviewImages(csproSourceFiles, applyCsProFilterToFile);
    await buildValidationImages(csproSourceFiles, applyCsProFilterToFile);
    await buildCoverImages(csproSourceFiles);
  }

  const cs8SourceFiles = sourceFiles.filter(f => f.endsWith('.cs8.json'));
  if (cs8SourceFiles.length !== 0) {
    await buildFilters(cs8SourceFiles, jsonToCS8Filter);
    await buildPreviewImages(cs8SourceFiles, applyCs8FilterToFile);
    await buildValidationImages(cs8SourceFiles, applyCs8FilterToFile);
    await buildCoverImages(cs8SourceFiles);
  }

  // Shared steps for all packs
  await buildFilterSummaryImages(sourceFiles);
  await buildPackReadmesEJS(sourceFiles);
  await convertToPdf(sourceFiles);
  await compressPdf(sourceFiles);
  await zipPacks(sourceFiles);

  debug(overallTimer());
}

// Each build step follows this pattern:
async function buildFilters(sourceFiles, fn) {
  const time = timer('+ buildFilters');
  await forEachPack(sourceFiles, async (pack, directory) => {
    await forEachFilter(pack, async (padded, filter) => {
      const filepath = `${directory}/${padded}-${filter.filename}.${pack.camera}.flt`;
      const contents = fn(filter.settings);
      await writeFile(filepath, contents);
    });
  });
  debug(time());
}

// md5-based cache pattern: check tmp/ before doing work
async function buildPreviewImages(sourceFiles, fn) {
  const time = timer('+ buildPreviewImages');
  await forEachPack(sourceFiles, async (pack, directory) => {
    await forEachFilter(pack, async (padded, filter) => {
      await forEachPreviewImage(pack, filter, async (sourceImagePath, index, _, hash) => {
        const tempImagePath = `${tempDir()}/${pack.directory}/${padded}-${filter.filename}-${index + 1}-${hash}.png`;
        if (await exists(tempImagePath)) {
          debug(`Skipping (cached): ${tempImagePath}`);
          return;
        }
        await mkdirp(`${tempDir()}/${pack.directory}`);
        await fn(sourceImagePath, tempImagePath, filter.settings);
      });
    });
  });
  debug(time());
}

await buildAllFilterPacks();
```

**Key patterns:**

- Top-level `await` — entry point uses ESM top-level await, no `main()` wrapper needed
- Every step accepts `sourceFiles` array + a function `fn` for the type-specific logic — keeps steps generic
- Cache check pattern: `md5(settings + path)` → check `tmp/` → skip if found
- `timer(label)` wraps every step for performance visibility in logs

---

### src/pack-helpers.js (iterators)

Shared iterator functions so all pipeline steps loop packs/filters the same way.

```js
import { padNumber, readJson, md5 } from './utils.js';
import config from './config.js';

export async function forEachPack(sourceFiles, fn) {
  for (const sourceFile of sourceFiles) {
    const pack = await readJson(sourceFile);

    // Skip incomplete packs gracefully
    if (!pack.directory || !pack.name || !pack.description || !pack.filters) continue;
    if (!Array.isArray(pack.filters) || pack.filters.length === 0) continue;

    const directory = `${config.destDir}/${pack.directory}`;
    await fn(pack, directory);
  }
}

export async function forEachFilter(pack, fn) {
  for (let i = 0; i < pack.filters.length; i++) {
    const filter = pack.filters[i];
    if (!filter.filename || !filter.description) continue; // skip incomplete
    const paddedFilterNumber = padNumber(i + 1); // "01", "02", ...
    await fn(paddedFilterNumber, filter);
  }
}

export async function forEachPreviewImage(pack, filter, fn) {
  const sources = filter.previewImages || defaultPreviewImages;
  for (let i = 0; i < sources.length; i++) {
    const sourceImagePath = `${config.defaultPreviewImages}/${sources[i]}`;
    const hash = md5(`${sourceImagePath}-${JSON.stringify(filter.settings)}`);
    await fn(sourceImagePath, i, sources[i], hash);
  }
}
```

---

### src/utils.js (fs + utilities)

Thin async wrappers around Node fs/promises, plus md5, zip, HTML→PDF, and Ghostscript helpers.

```js
import { readFile as fsReadFile, readdir, writeFile as fsWriteFile, mkdir, rm, copyFile, stat } from 'fs/promises';
import crypto from 'crypto';
import AdmZip from 'adm-zip';
import util from 'node:util';
import { exec } from 'child_process';
const execPromise = util.promisify(exec);

// fs wrappers with descriptive errors
export async function readFile(path) {
  try {
    return await fsReadFile(path, 'utf8');
  } catch (err) {
    throw new Error(`Failed to read file at ${path}: ${err.message}`);
  }
}

export async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    throw err;
  }
}

export async function mkdirp(path) {
  await mkdir(path, { recursive: true });
}

export async function rmrf(path) {
  try {
    await rm(path, { recursive: true });
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  } // ignore missing
}

export function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

export async function zip(files, outputPath) {
  const z = new AdmZip();
  for (const filePath of files) {
    z.addLocalFile(filePath, '', filePath.split('/').pop());
  }
  z.writeZip(outputPath);
}

// HTML → PDF via Gotenberg (Chromium headless)
// Requires SERVER_URL and GOTENBERG_URL env vars
export async function htmlToPdf(htmlPath, outputPath) {
  const { SERVER_URL, GOTENBERG_URL } = process.env;
  const absHtmlPath = `${SERVER_URL}/${htmlPath.replace(/^\.\//, '')}`;

  const formData = new FormData();
  formData.append('url', absHtmlPath);
  formData.append('marginTop', '0');
  formData.append('marginBottom', '0');
  formData.append('marginLeft', '0');
  formData.append('marginRight', '0');
  formData.append('printBackground', 'true');

  const response = await fetch(`${GOTENBERG_URL}/forms/chromium/convert/url`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error(`Gotenberg error: ${response.statusText}`);
  await writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
}

// Ghostscript PDF compression
export async function gsCompressPDF(inputPath, outputPath) {
  await execPromise(`./scripts/compress-pdf "${inputPath}" "${outputPath}"`);
}

export const isTest = () => process.env.TEST === '1';
export const tempDir = () => config.tmpDir;
export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
```

---

### src/filter-tools.js (serialization)

Translates a settings object into the output file format. Simple template literals.

```js
export const jsonToCS8Filter = filter => `
fps:${filter.fps}
lum:${filter.lum}
contrast:${filter.contrast}
rgain:${filter.rgain}
ggain:${filter.ggain}
bgain:${filter.bgain}
hue:${filter.hue}
sat:${filter.sat}

`;

export const jsonToCSProFilter = filter => `
lum:${filter.lum}
contrast:${filter.contrast}
rgain:${filter.rgain}
ggain:${filter.ggain}
bgain:${filter.bgain}
hue:${filter.hue}
sat:${filter.sat}

`;
```

---

### src/timers.js

```js
export function timer(label) {
  const start = process.hrtime();
  return () => {
    const end = process.hrtime(start);
    let minutes = 0;
    let seconds = end[0];
    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
    }
    const milliseconds = Math.round(end[1] / 1e6);
    const secondsStr = seconds >= 1 ? `${seconds}s ` : '';
    return `${label}: ${minutes ? `${minutes}m ` : ''}${secondsStr}${milliseconds}ms`;
  };
}

// Usage:
// const time = timer('+ buildFilters');
// ... do work ...
// debug(time());  // logs: "+ buildFilters: 1s 234ms"
```

---

## Architecture Patterns to Replicate

### 1. Makefile as DX layer over Docker Compose

All developer-facing commands are in the Makefile. Docker Compose is an implementation detail. The `docker-compose-run` macro handles build → run → log-on-failure → teardown in one reusable block.

### 2. Type-dispatch via filename suffix

Input files are named `foo.typeA.json` / `foo.typeB.json`. The pipeline splits the file list by suffix and passes type-specific functions into the shared build steps:

```js
const typeAFiles = sourceFiles.filter(f => f.endsWith('.typeA.json'));
await buildStep(typeAFiles, typeAProcessFn);

const typeBFiles = sourceFiles.filter(f => f.endsWith('.typeB.json'));
await buildStep(typeBFiles, typeBProcessFn);
```

### 3. md5-based intermediate caching

Every expensive intermediate result is stored in `tmp/` keyed by `md5(inputs)`. Check before doing work:

```js
const hash = md5(JSON.stringify(settings) + sourceImagePath);
const tempPath = `${tempDir()}/${pack.directory}/${name}-${hash}.png`;
if (await exists(tempPath)) return; // cache hit
// ... generate tempPath ...
```

### 4. Shared iterator functions

`forEachPack`, `forEachFilter`, `forEachItem` abstract the loop + validation + path construction. Pipeline steps only contain the logic specific to that step.

### 5. Three-container PDF pipeline

For HTML → PDF via Chromium:

- Container A: static file server (serves the HTML by URL)
- Container B: Gotenberg (Chromium headless, fetches URL from container A, returns PDF)
- Container C: Node app (posts to Gotenberg API, saves PDF)

Healthcheck dependencies in compose ensure startup order.

### 6. Thin fs wrapper layer

All filesystem operations go through `utils.js` wrappers that convert errors to descriptive messages and normalize patterns (`mkdirp`, `rmrf` that ignores ENOENT, `exists` that catches ENOENT).

### 7. Environment-based test mode

`TEST=1` env var enables a reduced build (test fixtures only). `PACK=./path/to/pack.json` enables single-pack builds. Both passed via `export` in Makefile targets, forwarded through compose.

### 8. File ownership after Docker writes

When Docker writes to a volume-mounted directory, files are owned by root. A `scripts/own-packs` bash script runs `sudo chown -R $USER:$USER ./packs` to fix this. Called via `make own` (not via compose — runs on the host directly).
