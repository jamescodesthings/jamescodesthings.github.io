# Full Dev Cycle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **After each task completes:** mark the task's steps `[x]` in this plan AND mark the corresponding item(s) in `docs/todo.md` as `[x]`. Commit both updates with the task's final commit.
>
> **Push rule:** Every `git commit` must be immediately followed by `git push origin claude-cleanup`. Never leave unpushed commits.
>
> **Browser testing:** The `browse` skill is available globally as a persistent headless Chromium browser. Use it for ALL visual verification steps instead of manually opening a browser. Pattern: `npm start && npm run server &`, then use `$B goto http://localhost:8080`, `$B screenshot /tmp/check.png`, Read the screenshot to inspect it. Use `$B responsive /tmp/resp` for mobile/tablet/desktop screenshots. Check both dark and light themes for visual changes. Always `kill %1` or stop the server after verification.

**Goal:** Transform codesthings.com from the current `generator/`-rooted layout into a clean `src/`-rooted, Docker-only, fully branded portfolio site with new content sections, print-ready PDF, cross-platform cohesion, and polish.

**Architecture:** Static site generator — JSON data rendered through EJS templates into plain HTML/CSS/JS. No frameworks, no bundlers. Docker Compose for build/serve/dev. GitHub Pages deployment via `pages` branch pushed to `jamescodesthings/jamescodesthings.github.io` with custom domain `codesthings.com`.

**Tech Stack:** Node.js 22 (ESM), EJS, Showdown (Markdown), Prettier, Docker Compose, Gotenberg (PDF), GitHub Actions, static-web-server (Alpine).

---

## File Structure

### Files to move (Group 1)

| From                          | To                                                     |
| ----------------------------- | ------------------------------------------------------ |
| `generator/src/index.js`      | `src/index.js`                                         |
| `generator/src/server.js`     | `src/server.js`                                        |
| `generator/src/watch.js`      | `src/watch.js`                                         |
| `generator/src/pages.js`      | `src/pages.js`                                         |
| `generator/src/config.js`     | `src/config.js`                                        |
| `generator/src/utils.js`      | `src/utils.js`                                         |
| `generator/static/templates/` | `src/templates/`                                       |
| `generator/static/css/`       | `src/css/`                                             |
| `generator/static/js/`        | `src/js/`                                              |
| `assets/`                     | `src/assets/` (merge with existing `src/assets/logo/`) |

### Files to create

| File                                 | Purpose                          |
| ------------------------------------ | -------------------------------- |
| `data/socials.json`                  | Structured social platform data  |
| `src/templates/sections/socials.ejs` | Socials section template         |
| `docs/logo.md`                       | Logo documentation               |
| `docs/logo-usage.md`                 | Logo usage guide                 |
| `docs/design-updates.md`             | Design review findings           |
| `docs/future-design-updates.md`      | Parking-lot design items         |
| `docs/social-updates.md`             | Cross-platform cohesion findings |

### Files to modify

| File                                | Change                                                             |
| ----------------------------------- | ------------------------------------------------------------------ |
| `src/config.js`                     | Update all relative paths for new `src/` root                      |
| `src/index.js`                      | Update `root` resolution, add socials data loading                 |
| `src/watch.js`                      | Update path resolution and build command                           |
| `src/pages.js`                      | Update `root` and `pagesDir` paths                                 |
| `src/server.js`                     | Update `root` and `outputDir` paths                                |
| `src/templates/index.ejs`           | Add socials section, CV download, update favicon refs, add OG meta |
| `src/templates/sections/hero.ejs`   | Add CV download CTA                                                |
| `src/templates/sections/footer.ejs` | Add logo, CV link                                                  |
| `src/css/styles.css`                | Socials section styles, CV CTA styles, print CSS improvements      |
| `package.json`                      | Merge generator deps, update scripts                               |
| `docker-compose.yml`                | Update volume mounts, working dirs, add dev service                |
| `.github/workflows/deploy.yml`      | Update paths for `src/` structure                                  |
| `Makefile`                          | Docker-only targets, remove host targets                           |
| `CLAUDE.md`                         | Reflect new structure and targets                                  |
| `README.md`                         | Full rewrite for new structure                                     |

### Files to delete

| File                            | Reason                     |
| ------------------------------- | -------------------------- |
| `generator/package.json`        | Merged into root           |
| `generator/` (entire directory) | Everything moved to `src/` |

---

## Group 1: Directory Restructure

### Task 1.0: Format codebase with Prettier

Run Prettier across the entire codebase before any structural changes so restructure diffs are purely structural.

**Files:**

- Modify: all `.js`, `.ejs`, `.css`, `.json` files (via Prettier)

- [ ] **Step 1: Run Prettier fix**

```bash
cd /Users/jamesmacmillan/projects/personal/codesthings && npm run format:fix
```

Expected: Prettier formats all files. Some files may change.

- [ ] **Step 2: Check what changed**

```bash
git diff --stat
```

- [ ] **Step 3: Build to verify nothing broke**

```bash
cd /Users/jamesmacmillan/projects/personal/codesthings && cd generator && npm install && npm start
```

Expected: Build completes with `Build complete!` output. `public/index.html` exists.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "style: run prettier across entire codebase

Format all files before directory restructure so restructure
diffs are purely structural.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 1.1: Move source files from generator/ to src/

Move all generator source files and static assets into the new `src/` structure.

**Files:**

- Move: `generator/src/*.js` -> `src/`
- Move: `generator/static/templates/` -> `src/templates/`
- Move: `generator/static/css/` -> `src/css/`
- Move: `generator/static/js/` -> `src/js/`
- Move: `assets/` contents -> `src/assets/` (merge with existing logo files)

- [ ] **Step 1: Move JS source files**

```bash
cd /Users/jamesmacmillan/projects/personal/codesthings
cp generator/src/index.js src/index.js
cp generator/src/server.js src/server.js
cp generator/src/watch.js src/watch.js
cp generator/src/pages.js src/pages.js
cp generator/src/config.js src/config.js
cp generator/src/utils.js src/utils.js
```

- [ ] **Step 2: Move static directories**

```bash
cd /Users/jamesmacmillan/projects/personal/codesthings
cp -r generator/static/templates src/templates
cp -r generator/static/css src/css
cp -r generator/static/js src/js
```

- [ ] **Step 3: Merge assets/ into src/assets/**

The `src/assets/logo/` directory already exists with logo files. Move the rest of `assets/` into `src/assets/`, preserving the logo subdirectory.

```bash
cd /Users/jamesmacmillan/projects/personal/codesthings
cp -r assets/icons src/assets/icons
cp assets/profile.png src/assets/profile.png
cp assets/zipline.gif src/assets/zipline.gif
cp assets/readme.md src/assets/readme.md
cp assets/logo-dark.png src/assets/logo-dark.png
cp assets/logo.png src/assets/logo.png
```

- [ ] **Step 4: Verify the new structure**

```bash
find src/ -type f | sort
```

Expected: All files present under `src/` — JS files at root, `templates/`, `css/`, `js/`, `assets/` subdirectories.

- [ ] **Step 5: Remove old directories**

```bash
cd /Users/jamesmacmillan/projects/personal/codesthings
rm -rf generator/
rm -rf assets/
```

- [ ] **Step 6: Commit the move**

```bash
git add -A && git commit -m "refactor: move generator/ and assets/ into src/

Restructure to src/-rooted layout:
- generator/src/*.js -> src/
- generator/static/ -> src/templates/, src/css/, src/js/
- assets/ -> src/assets/ (merged with existing logo files)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 1.2: Update src/config.js paths

All paths are now relative to `src/` instead of `generator/src/`.

**Files:**

- Modify: `src/config.js`

- [ ] **Step 1: Update config.js**

The old config resolved paths relative to `generator/` (the parent of `generator/src/`). Now source files are at `src/`, so `root` (parent of `src/`) is the repo root.

```js
const config = {
  dataDir: '../data',
  templateDir: './templates',
  cssDir: './css',
  assetsDir: './assets',
  outputDir: '../public',
};

export default config;
```

Key changes:

- `templateDir`: `'./static/templates'` -> `'./templates'` (templates are now at `src/templates/`)
- `cssDir`: `'./static/css'` -> `'./css'` (css is now at `src/css/`)
- `assetsDir`: `'../assets'` -> `'./assets'` (assets are now at `src/assets/`)
- `dataDir` and `outputDir` stay the same — `../data` and `../public` still resolve correctly from `src/`

- [ ] **Step 2: Commit**

```bash
git add src/config.js && git commit -m "refactor: update config.js paths for src/ structure

Templates, CSS, and assets are now under src/ instead of
generator/static/ and root assets/.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 1.3: Update src/index.js root resolution

The `root` variable in index.js resolves to the parent of `__dirname`. Previously `__dirname` was `generator/src/` so `root` was `generator/`. Now `__dirname` is `src/` so `root` is the repo root. This means the `copyAssets` function's hardcoded `'static/js'` path needs updating.

**Files:**

- Modify: `src/index.js`

- [ ] **Step 1: Fix the hardcoded JS copy path in copyAssets**

In `src/index.js`, the `copyAssets` function at line 49 has:

```js
await cpDir(resolve(root, 'static/js'), `${outputDir}/js`);
```

Change to:

```js
await cpDir(resolve(root, 'src/js'), `${outputDir}/js`);
```

This is because `root` is now the repo root (not `generator/`), and JS files are at `src/js/`.

- [ ] **Step 2: Also fix CSS and assets paths in copyAssets**

The `config.cssDir` and `config.assetsDir` paths are resolved relative to `root` via `resolve(root, config.cssDir)`. Since `root` is now the repo root and config paths are `'./css'` and `'./assets'`, these would resolve to `/repo/css/` and `/repo/assets/` — wrong.

The issue: `root = resolve(__dirname, '..')` where `__dirname = src/`. So `root = /repo/`. But config paths like `'./templates'` need to resolve relative to `src/`, not `root`.

**Fix:** Change `root` usage. The cleanest approach: keep `root` as repo root for `dataDir` and `outputDir`, and add a `srcRoot` for source paths.

Update `src/index.js`:

At the top, after `const root = resolve(__dirname, '..');`, add:

```js
const srcRoot = __dirname;
```

Then update path resolutions:

- `resolve(root, config.templateDir)` -> `resolve(srcRoot, config.templateDir)` (3 occurrences)
- `resolve(root, config.cssDir)` -> `resolve(srcRoot, config.cssDir)` (1 occurrence in copyAssets)
- `resolve(root, config.assetsDir)` -> `resolve(srcRoot, config.assetsDir)` (1 occurrence in copyAssets)
- `resolve(root, 'static/js')` -> `resolve(srcRoot, 'js')` (1 occurrence in copyAssets)
- Keep `resolve(root, config.dataDir)` as-is — `../data` from repo root is correct
- Keep `resolve(root, config.outputDir)` as-is — `../public` from repo root is correct

- [ ] **Step 3: Update src/server.js**

`root` in server.js is `resolve(__dirname, '..')` = repo root. `config.outputDir` is `'../public'` — that resolves to one level above repo root. Wrong.

Fix: `outputDir` should resolve relative to `__dirname` (which is `src/`):

```js
const outputDir = resolve(__dirname, config.outputDir);
```

This makes `resolve('src/', '../public')` = `/repo/public/` — correct.

- [ ] **Step 4: Update src/watch.js**

Same issue. `root = resolve(__dirname, '..')` = repo root. The watch paths and build command need updating.

Update watch paths:

```js
const watchPaths = [
  resolve(__dirname, config.templateDir),
  resolve(__dirname, config.cssDir),
  resolve(__dirname, 'js'),
  resolve(root, config.dataDir),
];
```

Update build command (line 28):

```js
exec('node --no-deprecation ./src/index.js', { cwd: root }, ...);
```

This is already correct — from repo root, `./src/index.js` points to the right file.

- [ ] **Step 5: Update src/pages.js**

`root` = repo root. `config.outputDir` is `'../public'` which from repo root goes one level up. Fix:

```js
const outputDir = resolve(__dirname, config.outputDir);
const pagesDir = resolve(root, 'pages');
```

`resolve('src/', '../public')` = `/repo/public/` — correct.
`resolve(repo_root, 'pages')` = `/repo/pages/` — correct (was `resolve(root, '../pages')` which went one level up when root was `generator/`).

- [ ] **Step 6: Verify build works**

```bash
cd /Users/jamesmacmillan/projects/personal/codesthings && npm install && node --no-deprecation src/index.js
```

Expected: `Build complete!` and `public/index.html` exists with correct content.

- [ ] **Step 7: Verify dev server works**

```bash
cd /Users/jamesmacmillan/projects/personal/codesthings && node --no-deprecation src/server.js &
curl -s http://localhost:8080 | head -5
kill %1
```

Expected: Returns HTML starting with `<!DOCTYPE html>`.

- [ ] **Step 8: Commit**

```bash
git add src/index.js src/server.js src/watch.js src/pages.js && git commit -m "refactor: update path resolution in all src/ JS files

Add srcRoot for source-relative paths (templates, css, assets, js).
Keep root as repo root for data/ and public/ paths.
Fix all path resolutions for the new directory structure.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 1.4: Merge package.json and update scripts

Merge `generator/package.json` dependencies into root `package.json` and update scripts.

**Files:**

- Modify: `package.json`
- Delete: `generator/package.json` (already deleted in Task 1.1)

- [ ] **Step 1: Update root package.json**

```json
{
  "name": "codesthings",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node --no-deprecation ./src/index.js",
    "watch": "node --no-deprecation ./src/watch.js",
    "server": "node --no-deprecation ./src/server.js",
    "pages": "node --no-deprecation ./src/pages.js",
    "format": "prettier .",
    "format:check": "npm run format -- --check",
    "format:fix": "npm run format -- --write"
  },
  "dependencies": {
    "debug": "^4.4.3",
    "ejs": "^3.1.10",
    "showdown": "^2.1.0"
  },
  "devDependencies": {
    "prettier": "2.8.2"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/jamesmacmillan/projects/personal/codesthings && npm install
```

Expected: Installs debug, ejs, showdown, prettier. No errors.

- [ ] **Step 3: Verify build with new scripts**

```bash
npm start
```

Expected: `Build complete!`

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json && git commit -m "refactor: merge generator deps into root package.json

Move debug, ejs, showdown from generator/package.json to root.
Add start, watch, server, pages scripts pointing at src/.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 1.5: Update Docker Compose

Update volume mounts and working directories for the new `src/` structure.

**Files:**

- Modify: `docker-compose.yml`

- [x] **Step 1: Update docker-compose.yml**

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
      - ./public:/var/public
    healthcheck:
      test: 'nc -z localhost 80 || exit 1'
      interval: 10s
      timeout: 5s
      retries: 5

  gotenberg:
    image: gotenberg/gotenberg:8
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
    image: node:22-alpine
    working_dir: /app
    environment:
      SERVER_URL: http://serve:80
      GOTENBERG_URL: http://gotenberg:3000
    depends_on:
      serve:
        condition: service_healthy
      gotenberg:
        condition: service_healthy
    volumes:
      - ./:/app
    command: sh -c "npm install && npm start"

  pages:
    image: node:22-alpine
    working_dir: /app
    volumes:
      - ./:/app
    command: sh -c "npm install && npm run pages"
```

Key changes:

- `serve` volume: `./generator/public:/var/public` -> `./public:/var/public`
- `build` working_dir: `/app/generator` -> `/app`
- `pages` working_dir: `/app/generator` -> `/app`
- Commands use root `npm` scripts now

- [x] **Step 2: Commit**

```bash
git add docker-compose.yml && git commit -m "refactor: update docker-compose for src/ structure

Point volumes and working dirs at repo root instead of generator/.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 1.6: Update GitHub Actions deploy workflow

**Files:**

- Modify: `.github/workflows/deploy.yml`

- [x] **Step 1: Update deploy.yml**

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    services:
      serve:
        image: joseluisq/static-web-server:2-alpine
        env:
          SERVER_ROOT: /var/public
          SERVER_HEALTH: 'true'
        ports:
          - 8080:80
      gotenberg:
        image: gotenberg/gotenberg:8
        env:
          API_TIMEOUT: 300s
        ports:
          - 3000:3000

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm install

      - name: Build site
        run: npm start

      - name: Build pages output
        run: npm run pages

      - name: Generate PDF
        env:
          SERVER_URL: http://localhost:8080
          GOTENBERG_URL: http://localhost:3000
        run: |
          curl -f --retry 10 --retry-delay 2 \
            --form url="http://serve:80/index.html" \
            --form marginTop=0 --form marginBottom=0 \
            --form marginLeft=0 --form marginRight=0 \
            --form printBackground=true \
            -o pages/cv.pdf \
            http://localhost:3000/forms/chromium/convert/url || echo "PDF generation skipped (gotenberg not available)"

      - name: Deploy to pages branch
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./pages
          publish_branch: pages
          cname: codesthings.com
```

Changes:

- Removed `working-directory: generator` from all steps
- `npm install` now installs at repo root (which has all deps)
- PDF output path: `../pages/cv.pdf` -> `pages/cv.pdf`

- [x] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml && git commit -m "ci: update deploy workflow for src/ structure

Remove generator/ working directories, install from repo root.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 1.7: Update Makefile

**Files:**

- Modify: `Makefile`

- [x] **Step 1: Update Makefile**

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

# Build the website into public/ (via Docker)
build:
	$(call docker-compose-run,build)
.PHONY: build

# Build the website locally (no Docker)
build-local:
	npm install && npm start
.PHONY: build-local

# Start the dev server locally
serve:
	npm install && npm run server
.PHONY: serve

# Watch for changes and rebuild locally
watch:
	npm install && npm run watch
.PHONY: watch

# Build GitHub Pages output (via Docker)
pages:
	$(call docker-compose-run,pages)
.PHONY: pages

# Build GitHub Pages output locally
pages-local:
	npm install && npm run pages
.PHONY: pages-local

# Clean build output
clean:
	rm -rf public
	rm -rf pages
.PHONY: clean
```

Key change: Removed all `cd generator &&` prefixes. Scripts now run from repo root.

- [x] **Step 2: Verify build-local works**

```bash
make build-local
```

Expected: `Build complete!` and `public/index.html` exists.

- [x] **Step 3: Commit**

```bash
git add Makefile && git commit -m "refactor: update Makefile for src/ structure

Remove cd generator prefixes — all scripts now at repo root.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 1.8: Update template asset references

EJS templates reference `assets/` paths. Since the build copies `src/assets/` to `public/assets/`, the HTML references (which are relative to the served root) should still work. But verify and fix any that don't.

**Files:**

- Verify: `src/templates/**/*.ejs`

- [x] **Step 1: Search for asset references in templates**

```bash
grep -rn "assets/" src/templates/
```

Check each reference resolves correctly when served from `public/`.

- [x] **Step 2: Build and check HTML output**

```bash
make build-local && grep -o 'assets/[^"]*' public/index.html | sort -u
```

Verify each referenced asset exists in `public/assets/`.

- [x] **Step 3: Check all referenced assets exist**

```bash
for f in $(grep -ohP 'assets/[^"]+' public/index.html | sort -u); do
  [ -f "public/$f" ] && echo "OK: $f" || echo "MISSING: $f"
done
```

Expected: All OK, no MISSING.

- [x] **Step 4: Commit if any fixes were needed**

```bash
git add -A && git diff --cached --stat && git commit -m "fix: update asset references in templates for src/ structure

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

(Skip if no changes needed.)

---

### Task 1.9: Update .prettierignore

**Files:**

- Modify: `.prettierignore`

- [x] **Step 1: Verify .prettierignore is correct**

Current `.prettierignore` should already be fine — it ignores `public/`, `pages/`, `node_modules/`, `raw/`, `package-lock.json`. No `generator/`-specific paths.

- [x] **Step 2: Run format check**

```bash
npm run format:check
```

Expected: No formatting issues (we ran format:fix in Task 1.0).

---

### Task 1.10: Final verification and push

- [x] **Step 1: Full build**

```bash
make build-local
```

- [x] **Step 2: Start server and verify**

```bash
node --no-deprecation src/server.js &
curl -s http://localhost:8080 | head -20
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/css/styles.css
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/js/theme.js
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/assets/profile.png
kill %1
```

Expected: All return 200.

- [x] **Step 3: Format check**

```bash
npm run format:check
```

- [x] **Step 4: Push Group 1**

```bash
git push origin claude-cleanup
```

---

## Group 2: Makefile Cleanup

### Task 2.1: Create Docker dev service and update Makefile

Convert to Docker-only workflow with `make dev` for local development.

**Files:**

- Modify: `docker-compose.yml`
- Modify: `Makefile`

- [x] **Step 1: Add dev service to docker-compose.yml**

Add a new `dev` service after the existing services:

```yaml
dev:
  image: node:22-alpine
  working_dir: /app
  ports:
    - 8080:8080
  volumes:
    - ./:/app
  command: sh -c "npm install && node --no-deprecation src/watch.js & node --no-deprecation src/server.js & wait"
```

This runs both the watcher and dev server inside a single container.

- [x] **Step 2: Update Makefile to Docker-only targets**

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

# Build the website into public/ (via Docker, includes PDF generation)
build:
	$(call docker-compose-run,build)
.PHONY: build

# Serve built site via static web server on port 8080 (Docker)
serve:
	docker compose up serve
.PHONY: serve

# Local development: watch + serve via Docker on port 8080
dev:
	docker compose up dev
.PHONY: dev

# Build GitHub Pages output (via Docker)
pages:
	$(call docker-compose-run,pages)
.PHONY: pages

# Clean build output and stop containers
clean:
	docker compose down --remove-orphans 2>/dev/null || true
	rm -rf public
	rm -rf pages
.PHONY: clean
```

Removed targets: `build-local`, `serve` (host), `watch`, `pages-local`.

- [ ] **Step 3: Commit**

```bash
git add docker-compose.yml Makefile && git commit -m "feat: Docker-only workflow with make dev

Add dev service (watch + serve in one container).
Remove host-based targets: build-local, serve, watch, pages-local.
make clean now also stops Docker containers.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2.2: Update CLAUDE.md for new targets

**Files:**

- Modify: `CLAUDE.md`

- [x] **Step 1: Update Commands section in CLAUDE.md**

Replace the Commands section with:

```markdown
## Commands

All commands run from the repo root via Makefile (Docker required):

\`\`\`bash
make build # Build site via Docker (includes PDF generation via Gotenberg)
make serve # Serve built site at http://localhost:8080 (Docker static server)
make dev # Local development: watch + serve at http://localhost:8080 (Docker)
make pages # Build GitHub Pages output via Docker
make clean # Remove public/, pages/, stop Docker containers
\`\`\`

For quick local builds without Docker:
\`\`\`bash
npm install && npm start # Build site -> public/
npm run server # Dev server at http://localhost:8080
npm run watch # Watch for changes and rebuild
\`\`\`

Formatting (from repo root):
\`\`\`bash
npm run format:check # Check prettier formatting
npm run format:fix # Fix formatting
\`\`\`
```

- [x] **Step 2: Update Architecture section paths**

Replace `generator/src/` references with `src/`:

- `generator/src/index.js` -> `src/index.js`
- `generator/src/` -> `src/`
- `generator/static/templates/` -> `src/templates/`
- `generator/static/css/styles.css` -> `src/css/styles.css`
- `generator/static/js/theme.js` -> `src/js/theme.js`
- `assets/` -> `src/assets/`

Update the Key source locations list:

```markdown
- `data/` — All site content as JSON files (profile, experience, skills, education, projects, sidebar, cover-letter) plus `data/blog/*.md` for blog posts
- `src/` — Build pipeline (`index.js`), dev server (`server.js`), file watcher (`watch.js`), GitHub Pages build (`pages.js`), path config (`config.js`), file I/O helpers (`utils.js`)
- `src/templates/` — EJS templates. `index.ejs` is the main page, `blog.ejs` for blog posts, `sections/` for partials (hero, experience, skills, projects, cover-letter, footer, etc.)
- `src/css/styles.css` — All styling. CSS custom properties for theming (dark/light via `.dark` class toggle)
- `src/js/theme.js` — Dark mode toggle (localStorage) and scroll animations (IntersectionObserver)
- `src/assets/` — Icons, images, logos, favicons. Copied to `public/assets/` during build
```

- [x] **Step 3: Update review gates**

In the Pre-Push Review Gates, change `make build-local` to `npm start` (or `make build`):

```markdown
2. **It builds** — `npm start` (quick local) or `make build` (full Docker)
3. **It runs** — `npm run server` at http://localhost:8080 (or `make serve`)
```

- [x] **Step 4: Commit**

```bash
git add CLAUDE.md && git commit -m "docs: update CLAUDE.md for src/ structure and Docker-only targets

Reflect new directory layout, make targets, and review gates.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

- [x] **Step 5: Push Group 2**

```bash
git push origin claude-cleanup
```

---

## Group 3: Logo + Design Review

This group has two parallel tracks: **Logo Documentation** and **Frontend Design Review**. They can be dispatched as concurrent subagents.

### Task 3.1: [parallel-A] Logo documentation

Document the logo assets, analyse usage, and generate favicons.

**Files:**

- Create: `docs/logo.md`
- Create: `docs/logo-usage.md`

- [x] **Step 1: Read and analyse logo SVG files**

Read the SVG files to extract dimensions, colours, and visual description:

```bash
cat src/assets/logo/logo.svg | head -5    # Check viewBox/dimensions
cat src/assets/logo/icon.svg | head -5    # Check viewBox/dimensions
```

Also check PNG dimensions:

```bash
file src/assets/logo/logo.png src/assets/logo/icon.png
```

- [x] **Step 2: Write docs/logo.md**

Document both variants with:

- File locations (all at `src/assets/logo/`)
- Dimensions (full logo: likely wider aspect, icon: 128x128 square)
- Colour values (extract from SVG fill/stroke attributes)
- Font info (from SVG text elements or the AI source)
- Visual description (full logo = wordmark + dot, icon = "C" + coloured dot)
- Light vs dark variants
- AI source location: `raw/logo.ai`

- [x] **Step 3: Write docs/logo-usage.md**

Document where each variant should be used:

```markdown
# Logo Usage Guide

## Full Logo

- Hero section (desktop)
- Footer
- Print CV header
- Open Graph image (for social sharing)

## Icon (Square Variant, 128x128)

- Favicon (all sizes)
- Apple touch icon
- Mobile header (small viewports where full logo is too wide)
- Social platform avatars
- PWA icon (if applicable)
- Browser tab / bookmarks bar

## Theme Variants

- Light background: `logo.svg` / `icon.svg` (and PNG equivalents)
- Dark background: `logo-dark.svg` / `icon-dark.svg` (and PNG equivalents)

## File Format Preference

- **Web:** Prefer SVG (scalable, smaller)
- **Fallback:** PNG where SVG not supported (apple-touch-icon, older browsers)
- **Favicon:** `.ico` (multi-size) + `.svg` for modern browsers
```

- [x] **Step 4: Generate favicon set from icon variant**

Generate the required favicon files. The source is 128x128 — we need:

- `favicon.ico` (multi-size: 16x16, 32x32, 48x48)
- `favicon.svg` (copy of `icon.svg` or simplified version)
- `apple-touch-icon.png` (180x180, upscaled from 128)
- `icon-192.png` (192x192, for Android/PWA)
- `icon-512.png` (512x512, for Android/PWA)

Use ImageMagick if available, or sharp via a one-off Node script:

```bash
# Check if ImageMagick is available
which convert && echo "ImageMagick available" || echo "Need alternative"
```

If ImageMagick available:

```bash
cd src/assets/icons

# favicon.ico from icon.png (multi-size)
convert ../logo/icon.png -resize 16x16 /tmp/icon-16.png
convert ../logo/icon.png -resize 32x32 /tmp/icon-32.png
convert ../logo/icon.png -resize 48x48 /tmp/icon-48.png
convert /tmp/icon-16.png /tmp/icon-32.png /tmp/icon-48.png favicon.ico

# apple-touch-icon.png (180x180)
convert ../logo/icon.png -resize 180x180 apple-touch-icon.png

# PWA sizes
convert ../logo/icon.png -resize 192x192 icon-192.png
convert ../logo/icon.png -resize 512x512 icon-512.png

# favicon.svg (copy the SVG icon)
cp ../logo/icon.svg favicon.svg
```

If ImageMagick not available, use a one-off Node script with sharp:

```bash
npm install --save-dev sharp
node -e "
import sharp from 'sharp';
const src = 'src/assets/logo/icon.png';
await sharp(src).resize(16).toFile('/tmp/icon-16.png');
await sharp(src).resize(32).toFile('/tmp/icon-32.png');
await sharp(src).resize(48).toFile('/tmp/icon-48.png');
await sharp(src).resize(180).toFile('src/assets/icons/apple-touch-icon.png');
await sharp(src).resize(192).toFile('src/assets/icons/icon-192.png');
await sharp(src).resize(512).toFile('src/assets/icons/icon-512.png');
console.log('Done');
"
```

Then use `png2ico` or ImageMagick for the `.ico`. If neither is available, use an online tool or skip the `.ico` (modern browsers prefer SVG favicon).

- [x] **Step 5: Copy favicon.svg**

```bash
cp src/assets/logo/icon.svg src/assets/icons/favicon.svg
```

- [x] **Step 6: Visually verify favicons at small sizes**

Build and serve the site, then check favicon in browser tab. The "C" and dot must be legible at 16x16.

```bash
npm start && npm run server
# Open http://localhost:8080 in browser, check:
# - Browser tab icon (16px)
# - Bookmarks bar (16px)
```

If the icon doesn't read well at 16px, consider simplifying (e.g., just the coloured dot, or just the "C") for the smallest sizes.

- [x] **Step 7: Commit**

```bash
git add docs/logo.md docs/logo-usage.md src/assets/icons/ && git commit -m "docs: logo documentation and favicon generation

Document logo variants, usage guidelines, generate full favicon
set from 128x128 icon (ico, svg, apple-touch, PWA sizes).

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3.2: [parallel-B] Frontend design review

Use the `frontend-design` skill to review the live site.

**Files:**

- Create: `docs/design-updates.md`
- Create: `docs/future-design-updates.md`

- [x] **Step 1: Build and serve the site**

```bash
npm start && npm run server &
```

- [x] **Step 2: Run design review**

Invoke the `frontend-design` skill with the vibe context:

- Understated, playful, slightly nerdy, professional, polished
- KISS, cutting edge visual web design
- Responsive, mobile-first, print-friendly

Review at http://localhost:8080 and flag:

1. The 13MB `zipline.gif` — performance problem
2. Scroll animations (`data-animate` on every section) — justify or remove
3. Blog section is a bare `<ul>` — needs design attention
4. Theme toggle placement and styling
5. Overall layout, typography, spacing, colour consistency

- [x] **Step 3: Write docs/design-updates.md**

Document findings with specific changes to make:

- Which animations to keep, which to remove
- Blog section design direction
- Theme toggle improvements
- Any other issues found

- [x] **Step 4: Write docs/future-design-updates.md**

Parking-lot items that aren't in scope for this cycle:

- Major layout redesigns
- New interactivity features
- Items that need design mockups first

- [x] **Step 5: Kill dev server**

```bash
kill %1
```

- [x] **Step 6: Commit**

```bash
git add docs/design-updates.md docs/future-design-updates.md && git commit -m "docs: frontend design review findings

Review site design against vibe context, flag performance issues,
document changes for this cycle and parking-lot items.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3.3: Update site with logo and design changes

After both parallel tasks complete, implement the changes.

**Files:**

- Modify: `src/templates/index.ejs`
- Modify: `src/templates/sections/hero.ejs`
- Modify: `src/templates/sections/footer.ejs`
- Modify: `src/css/styles.css`

- [x] **Step 1: Update favicon references in index.ejs**

Replace the current favicon block in `src/templates/index.ejs` `<head>`:

```html
<link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="assets/icons/favicon.ico" sizes="48x48" />
<link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png" />
```

Remove the old references:

```html
<link rel="icon" href="assets/icons/favicon-color.svg" />
<link rel="icon" href="assets/icons/favicon-color-228.png" sizes="228x228" />
<link rel="apple-touch-icon" href="assets/icons/favicon-color-228.png" sizes="228x228" />
```

- [x] **Step 2: Add logo to footer**

Update `src/templates/sections/footer.ejs`:

```html
<footer class="site-footer">
  <div class="footer-inner">
    <img src="assets/logo/logo-dark.svg" alt="codesthings" class="footer-logo" width="160" />
    <span class="footer-copy">&copy; 2026 James Macmillan</span>
  </div>
</footer>
```

Note: Footer is on dark background by default. Use `logo-dark.svg` for dark bg. Add CSS to swap for light theme.

- [x] **Step 3: Implement design review changes**

Based on the design review findings in `docs/design-updates.md`, apply CSS and template changes. Exact changes depend on review findings but likely include:

- Blog section styling (card-based or improved list)
- Animation adjustments
- Theme toggle refinements

- [x] **Step 4: Build and visually verify**

```bash
npm start && npm run server &
# Check in browser at http://localhost:8080
# Verify: favicon, footer logo, design changes
kill %1
```

- [x] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: implement logo placement and design review changes

Update favicons to new icon variant, add logo to footer,
apply design review recommendations.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

- [x] **Step 6: Push Group 3**

```bash
git push origin claude-cleanup
```

---

## Group 4: Content Sections

Two parallel tracks: **Socials Section** and **CV Download Section**.

### Task 4.1: [parallel-A] Socials section

**Files:**

- Create: `data/socials.json`
- Create: `src/templates/sections/socials.ejs`
- Modify: `src/index.js`
- Modify: `src/templates/index.ejs`
- Modify: `src/css/styles.css`

- [x] **Step 1: Create data/socials.json**

```json
[
  {
    "name": "GitHub",
    "url": "https://github.com/jamescodesthings",
    "icon": "devicon-github-original",
    "iconType": "devicon",
    "description": "KISS, enough tool for the job, ship then iterate, fun and useful. Poke around the repos — this site's code is there too."
  },
  {
    "name": "LinkedIn",
    "url": "https://www.linkedin.com/in/jamescodesthings",
    "icon": "devicon-linkedin-plain",
    "iconType": "devicon",
    "description": "Professional profile, project history, and CV. Open to interesting opportunities."
  },
  {
    "name": "Makerworld",
    "url": "https://makerworld.com/en/@jamescodesthing",
    "icon": null,
    "iconType": "text",
    "description": "3D models for nerd hobby projects — tinywhoop drone parts, computer-related prints, and whatever else I'm tinkering with."
  },
  {
    "name": "Instagram",
    "url": "https://www.instagram.com/jamescodesthings/",
    "icon": null,
    "iconType": "text",
    "description": "Nature, portraiture, and street photography. Photography projects like the camp snap filters. Portfolio in progress."
  }
]
```

- [x] **Step 2: Create src/templates/sections/socials.ejs**

```html
<section class="section socials-section" data-animate>
  <div class="section-inner">
    <span class="section-label">CONNECT</span>
    <h2 class="section-title">Where to find me</h2>
    <div class="socials-grid">
      <% socials.forEach(function(social) { %>
      <a href="<%= social.url %>" class="social-card" target="_blank" rel="noopener noreferrer">
        <div class="social-card-header">
          <% if (social.iconType === 'devicon') { %>
          <i class="<%= social.icon %> social-icon"></i>
          <% } %>
          <h3 class="social-card-name"><%= social.name %></h3>
          <svg
            class="social-card-arrow"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
        <p class="social-card-desc"><%= social.description %></p>
      </a>
      <% }); %>
    </div>
  </div>
</section>
```

- [x] **Step 3: Load socials.json in src/index.js**

Add to the `loadData` function in `src/index.js`:

In the imports at line 22-31, add `socials` to the Promise.all:

```js
const [profile, experience, skills, education, projects, sidebar, coverLetter, socials] = await Promise.all([
  readJson(`${dataDir}/profile.json`),
  readJson(`${dataDir}/experience.json`),
  readJson(`${dataDir}/skills.json`),
  readJson(`${dataDir}/education.json`),
  readJson(`${dataDir}/projects.json`),
  readJson(`${dataDir}/sidebar.json`),
  readJson(`${dataDir}/cover-letter.json`),
  readJson(`${dataDir}/socials.json`),
]);

return { profile, experience, skills, education, projects, sidebar, coverLetter, socials };
```

- [x] **Step 4: Add socials section to index.ejs**

In `src/templates/index.ejs`, add after the projects include and before the blog section:

```html
<%- include('sections/socials', { socials }) %>
```

- [x] **Step 5: Add CSS for socials section**

Add to `src/css/styles.css` before the Print Styles section:

```css
/* ============================================
   Socials Section
   ============================================ */

.socials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
  margin-top: var(--space-xl);
}

.social-card {
  display: block;
  padding: var(--space-xl);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  color: var(--color-text);
  transition: border-color 0.2s, transform 0.2s;
}

.social-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.social-card-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.social-icon {
  font-size: 1.5rem;
  color: var(--color-accent);
}

.social-card-name {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: 600;
  color: var(--color-heading);
  flex: 1;
}

.social-card-arrow {
  color: var(--color-text-muted);
  transition: color 0.2s, transform 0.2s;
}

.social-card:hover .social-card-arrow {
  color: var(--color-accent);
  transform: translateX(4px);
}

.social-card-desc {
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  line-height: 1.6;
}
```

- [x] **Step 6: Build and verify**

```bash
npm start && npm run server &
# Check http://localhost:8080 — socials section should appear
kill %1
```

- [x] **Step 7: Commit**

```bash
git add data/socials.json src/templates/sections/socials.ejs src/index.js src/templates/index.ejs src/css/styles.css && git commit -m "feat: add socials section with GitHub, LinkedIn, Makerworld, Instagram

Card-based grid layout with descriptions and external links.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4.2: [parallel-B] CV download section

**Files:**

- Modify: `src/templates/sections/hero.ejs`
- Modify: `src/templates/sections/footer.ejs`
- Modify: `src/css/styles.css`

- [x] **Step 1: Add CV download CTA to hero**

Update `src/templates/sections/hero.ejs`:

```html
<section class="hero">
  <div class="hero-inner">
    <div class="hero-content">
      <h1 class="hero-title"><%= name %></h1>
      <p class="hero-role">Software Engineer</p>
      <a href="cv.pdf" class="hero-cta" download>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download CV
      </a>
    </div>
    <button class="theme-toggle" id="darkModeToggle" aria-label="Toggle theme">
      <span class="toggle-icon" id="toggleIcon">
        <svg
          class="icon-sun"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
        <svg
          class="icon-moon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
    <div class="hero-scroll-hint">
      <span class="scroll-line"></span>
    </div>
  </div>
</section>
```

- [x] **Step 2: Add CV link to footer**

Update `src/templates/sections/footer.ejs` to include a CV link:

```html
<footer class="site-footer">
  <div class="footer-inner">
    <img src="assets/logo/logo-dark.svg" alt="codesthings" class="footer-logo" width="160" />
    <div class="footer-links">
      <a href="cv.pdf" class="footer-link" download>Download CV</a>
    </div>
    <span class="footer-copy">&copy; 2026 James Macmillan</span>
  </div>
</footer>
```

- [x] **Step 3: Add CSS for hero CTA and footer links**

Add to `src/css/styles.css`:

```css
/* ============================================
   Hero CTA
   ============================================ */

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
  padding: var(--space-sm) var(--space-xl);
  font-family: var(--font-heading);
  font-size: var(--text-small);
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-bg);
  background: var(--color-accent);
  border-radius: var(--border-radius);
  transition: background-color 0.2s, transform 0.2s;
}

.hero-cta:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
}

/* ============================================
   Footer
   ============================================ */

.footer-logo {
  display: block;
  margin-bottom: var(--space-md);
}

html:not(.dark) .footer-logo {
  content: url('../../assets/logo/logo.svg');
}

.footer-links {
  margin-bottom: var(--space-md);
}

.footer-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--text-small);
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--color-accent);
}
```

Note: The `content:` swap for light theme logo may not work in all browsers. A more robust approach is to use two `<img>` tags with a CSS class toggle, or use the SVG with `currentColor`. Adjust based on what works.

- [x] **Step 4: Build and verify**

```bash
npm start && npm run server &
# Check http://localhost:8080
# - Hero should show "Download CV" button
# - Footer should show logo and CV link
# - CV link won't work locally (no cv.pdf) but should not break the page
kill %1
```

- [x] **Step 5: Commit**

```bash
git add src/templates/sections/hero.ejs src/templates/sections/footer.ejs src/css/styles.css && git commit -m "feat: add CV download CTA in hero and footer

Prominent download button in hero, text link in footer.
Links to /cv.pdf (generated in CI via Gotenberg).

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

- [ ] **Step 6: Push Group 4**

```bash
git push origin claude-cleanup
```

---

## Group 5: PDF Print Cleanup

### Task 5.1: Improve print CSS

**Files:**

- Modify: `src/css/styles.css`

- [ ] **Step 1: Replace the print styles section**

Replace the existing `@media print` block (lines 1073-1113 of the original) with:

```css
@media print {
  /* Force light theme for print */
  :root {
    --color-bg: #ffffff;
    --color-surface: #ffffff;
    --color-surface-raised: #f5f3ee;
    --color-text: #1a1a2e;
    --color-text-secondary: #4a4a5a;
    --color-text-muted: #6b7280;
    --color-heading: #1a1a2e;
    --color-accent: #d97706;
    --color-border: #e5e2da;
    --color-link: #d97706;
    --color-badge-bg: transparent;
    --color-badge-text: #4a4a5a;
    --color-badge-border: #d1cdc4;
  }

  body {
    background: white;
    color: black;
  }

  .hero {
    min-height: auto;
    padding: var(--space-lg);
  }

  /* Hide interactive and non-CV elements */
  .theme-toggle,
  .hero-scroll-hint,
  .hero-cta,
  .site-footer,
  .campsnap-banner,
  .socials-section,
  .blog-list {
    display: none !important;
  }

  /* Hide blog section entirely */
  .section:has(.blog-list) {
    display: none !important;
  }

  /* Ensure animations don't interfere */
  [data-animate] {
    opacity: 1;
    transform: none;
  }

  .section {
    padding: var(--space-lg) 0;
    page-break-inside: avoid;
  }

  .project-card,
  .education-card,
  .bento-badge {
    box-shadow: none;
    border: 1px solid #ddd;
  }

  /* Links show URL in print */
  a[href^='http']::after {
    content: ' (' attr(href) ')';
    font-size: var(--text-xs);
    color: var(--color-text-muted);
  }
}
```

Key improvements:

- Force light theme by resetting all CSS custom properties
- Hide socials section, CV download button, blog section
- Campsnap banner already hidden
- Links show their URL in print
- Clean page breaks

- [ ] **Step 2: Build and verify print preview**

```bash
npm start && npm run server &
# Open http://localhost:8080 in browser
# Press Ctrl+P (or Cmd+P on Mac) to see print preview
# Verify:
# - Light theme applied
# - No socials section, blog section, or campsnap banner
# - No CV download button or theme toggle
# - Clean page breaks between sections
# - Professional, self-contained CV appearance
kill %1
```

- [ ] **Step 3: Commit**

```bash
git add src/css/styles.css && git commit -m "feat: improve print CSS for clean CV output

Force light theme, hide non-CV sections (socials, blog, campsnap,
CV button), show link URLs, clean page breaks.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

- [ ] **Step 4: Push Group 5**

```bash
git push origin claude-cleanup
```

---

## Group 6: Cross-Platform Cohesion

### Task 6.1: [parallel] Research external profiles

Dispatch subagents to fetch and analyse each profile. These are research-only tasks.

**Subagent A: GitHub profile**

- [x] **Step 1: Fetch GitHub profile**

```bash
# Via gh CLI or web fetch
gh api users/jamescodesthings
gh api users/jamescodesthings/repos --jq '.[].name' | head -20
```

Analyse: bio, pinned repos, README, activity patterns.

**Subagent B: Makerworld profile**

- [x] **Step 1: Fetch Makerworld profile**

Web fetch `https://makerworld.com/en/@jamescodesthing` and analyse bio, published models, descriptions.

**Subagent C: Instagram profile**

- [x] **Step 1: Fetch Instagram profile**

Web fetch `https://www.instagram.com/jamescodesthings/` — may be limited by auth. Analyse what's publicly visible: bio, aesthetic, posting patterns.

**Subagent D: LinkedIn profile**

- [x] **Step 1: Fetch LinkedIn profile**

Web fetch `https://www.linkedin.com/in/jamescodesthings` — likely limited by auth walls. Document what's publicly visible.

**Subagent E: Campsnap sub-site**

- [x] **Step 1: Fetch campsnap sub-site**

Web fetch `https://codesthings.com/campsnap/` and review for branding consistency with main site.

---

### Task 6.2: Write social updates document

After all research subagents complete.

**Files:**

- Create: `docs/social-updates.md`

- [x] **Step 1: Collate findings into docs/social-updates.md**

Structure:

```markdown
# Cross-Platform Cohesion Report

## Per-Platform Analysis

### GitHub

- Current state: [findings]
- Suggested updates: [bio wording, README, pinned repos]
- Cross-linking: [link back to codesthings.com]

### LinkedIn

- Current state: [findings]
- Suggested updates: [bio, headline]
- Cross-linking: [link to codesthings.com]

### Makerworld

- Current state: [findings]
- Suggested updates: [bio, descriptions]
- Cross-linking: [link to codesthings.com]

### Instagram

- Current state: [findings]
- Suggested updates: [bio]
- Cross-linking: [link to codesthings.com]

### Campsnap Sub-Site

- Current state: [findings]
- Branding alignment: [consistent/inconsistent]
- Suggested updates: [if any]

## Cross-Platform Recommendations

- Profile photo consistency
- Bio wording alignment
- Handle consistency
- Cross-linking strategy (all profiles -> codesthings.com)

## Site-Side Updates

- [Any changes to make on codesthings.com based on findings]

## External Updates (Manual)

- [Changes the user needs to make on external platforms]
```

- [x] **Step 2: Commit**

```bash
git add docs/social-updates.md && git commit -m "docs: cross-platform cohesion research and recommendations

Per-platform analysis of GitHub, LinkedIn, Makerworld, Instagram,
and campsnap sub-site. Cross-linking and branding recommendations.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

- [ ] **Step 3: Implement site-side updates**

Apply any changes to the site based on findings (e.g., updating socials.json descriptions, adding cross-links).

- [ ] **Step 4: Commit and push Group 6**

```bash
git add -A && git commit -m "feat: implement cross-platform cohesion site updates

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push origin claude-cleanup
```

---

## Group 7: Documentation Cohesion

Three parallel documentation updates.

### Task 7.1: [parallel-A] Update README.md

**Files:**

- Modify: `README.md`

- [ ] **Step 1: Read current README**

```bash
cat README.md
```

- [ ] **Step 2: Rewrite README.md**

````markdown
# codesthings.com

Personal portfolio and CV site for James Macmillan. Built as a minimal static site generator: JSON data files rendered through EJS templates into plain HTML/CSS/JS.

**Live site:** [codesthings.com](https://codesthings.com)

## Quick Start

```bash
# Docker (recommended)
make dev          # Watch + serve at http://localhost:8080

# Without Docker
npm install
npm start         # Build to public/
npm run server    # Serve at http://localhost:8080
```
````

## Directory Structure

```
src/              Build pipeline and source files
  index.js        Main build script
  server.js       Dev server
  watch.js        File watcher
  pages.js        GitHub Pages build
  config.js       Path configuration
  utils.js        File I/O helpers
  templates/      EJS templates (index.ejs, blog.ejs, sections/)
  css/            Stylesheets
  js/             Client-side JS (theme toggle, animations)
  assets/         Icons, images, logos, favicons
data/             Site content as JSON + blog posts as Markdown
raw/              Source design files (Illustrator, tracked via LFS)
public/           Build output (gitignored)
pages/            GitHub Pages output (gitignored)
docs/             Project documentation
```

## Make Targets

| Target       | Description                                              |
| ------------ | -------------------------------------------------------- |
| `make build` | Build via Docker (includes PDF generation via Gotenberg) |
| `make serve` | Serve built site at http://localhost:8080 (Docker)       |
| `make dev`   | Local development: watch + serve (Docker)                |
| `make pages` | Build GitHub Pages output (Docker)                       |
| `make clean` | Remove build output, stop containers                     |

## Deployment

Push to `main` triggers GitHub Actions: build site, generate PDF via Gotenberg, deploy to `pages` branch, published at [codesthings.com](https://codesthings.com) via GitHub Pages.

## Socials

- [GitHub](https://github.com/jamescodesthings)
- [LinkedIn](https://linkedin.com/in/jamescodesthings)
- [Makerworld](https://makerworld.com/en/@jamescodesthing)
- [Instagram](https://instagram.com/jamescodesthings)

````

- [ ] **Step 3: Commit**

```bash
git add README.md && git commit -m "docs: rewrite README for new structure and workflow

New directory structure, Docker-only make targets, deployment
workflow, socials links.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
````

---

### Task 7.2: [parallel-B] Update CLAUDE.md

Already partially done in Task 2.2 — verify everything is current.

**Files:**

- Modify: `CLAUDE.md`

- [ ] **Step 1: Read current CLAUDE.md and verify accuracy**

Check every path, command, and reference matches the current state:

- Architecture section: all paths should reference `src/`
- Commands section: should show Docker targets + npm fallbacks
- Code Style section: should be current
- Deployment section: should be current

- [ ] **Step 2: Fix any stale references**

- [ ] **Step 3: Commit if changes needed**

```bash
git add CLAUDE.md && git commit -m "docs: final CLAUDE.md accuracy pass

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 7.3: [parallel-C] Update blog post and assets readme

**Files:**

- Modify: `data/blog/2026-03-30-how-this-site-works.md`
- Modify: `src/assets/readme.md`

- [ ] **Step 1: Read and update blog post**

```bash
cat data/blog/2026-03-30-how-this-site-works.md
```

Update any references to:

- `generator/src/` -> `src/`
- `generator/static/` -> `src/`
- `assets/` -> `src/assets/`
- Old make targets -> new make targets
- Any other stale references

- [ ] **Step 2: Update src/assets/readme.md**

Update any path references in the assets readme.

- [ ] **Step 3: Commit**

```bash
git add data/blog/2026-03-30-how-this-site-works.md src/assets/readme.md && git commit -m "docs: update blog post and assets readme for new structure

Reflect src/ directory layout and new build workflow.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 7.4: Final documentation consistency pass

After all parallel doc updates complete.

- [ ] **Step 1: Cross-reference all docs**

Check consistency across:

- `README.md`
- `CLAUDE.md`
- `docs/todo.md`
- `docs/logo.md`
- `docs/logo-usage.md`
- `docs/design-updates.md`
- `data/blog/2026-03-30-how-this-site-works.md`

Verify no contradictory paths, commands, or descriptions.

- [ ] **Step 2: Fix any inconsistencies found**

- [ ] **Step 3: Commit and push Group 7**

```bash
git add -A && git commit -m "docs: final consistency pass across all documentation

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push origin claude-cleanup
```

---

## Group 8: Polish

Small improvements that can be done in any order.

### Task 8.1: Add Open Graph metadata

**Files:**

- Modify: `src/templates/index.ejs`

- [ ] **Step 1: Add OG meta tags to index.ejs head**

Add after the existing `<meta name="description">` tag:

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="James Macmillan — Software Engineer" />
<meta property="og:description" content="Software engineer portfolio — James Macmillan builds things for the web." />
<meta property="og:url" content="https://codesthings.com/" />
<meta property="og:image" content="https://codesthings.com/assets/logo/logo.png" />
<meta property="og:site_name" content="codesthings.com" />
<meta name="twitter:card" content="summary" />
```

- [ ] **Step 2: Add canonical URL**

Add to `<head>`:

```html
<link rel="canonical" href="https://codesthings.com/" />
```

- [ ] **Step 3: Commit**

```bash
git add src/templates/index.ejs && git commit -m "feat: add Open Graph metadata and canonical URL

OG tags for social sharing (title, description, image).
Canonical URL for SEO.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 8.2: Optimise zipline.gif

The 13MB GIF is a significant performance and repo size problem.

**Files:**

- Modify: `src/templates/sections/campsnap-banner.ejs`
- Add: video file(s) to `src/assets/`
- Delete: `src/assets/zipline.gif` (after conversion)

- [ ] **Step 1: Convert GIF to video**

```bash
# Check if ffmpeg is available
which ffmpeg && echo "ffmpeg available" || echo "Need to install ffmpeg"

# Convert to mp4 and webm
ffmpeg -i src/assets/zipline.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" src/assets/zipline.mp4
ffmpeg -i src/assets/zipline.gif -c:v libvpx-vp9 -b:v 0 -crf 30 src/assets/zipline.webm
```

Compare sizes:

```bash
ls -lh src/assets/zipline.gif src/assets/zipline.mp4 src/assets/zipline.webm
```

Expected: mp4 ~1-2MB, webm ~1-2MB (vs 13MB GIF).

- [ ] **Step 2: Update campsnap-banner.ejs**

Replace the `<img>` with a `<video>`:

```html
<div class="campsnap-media">
  <video autoplay loop muted playsinline class="campsnap-gif" loading="lazy">
    <source src="assets/zipline.webm" type="video/webm" />
    <source src="assets/zipline.mp4" type="video/mp4" />
  </video>
</div>
```

- [ ] **Step 3: Remove the GIF**

```bash
rm src/assets/zipline.gif
```

- [ ] **Step 4: Build and verify**

```bash
npm start && npm run server &
# Check http://localhost:8080 — campsnap banner should show video playing
kill %1
```

- [ ] **Step 5: Commit**

```bash
git add src/assets/zipline.mp4 src/assets/zipline.webm src/templates/sections/campsnap-banner.ejs && git rm src/assets/zipline.gif && git commit -m "perf: convert 13MB zipline.gif to mp4/webm video

Reduces asset size from ~13MB to ~1-2MB.
Uses <video> with webm + mp4 sources for broad compatibility.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 8.3: Create custom 404 page

**Files:**

- Create: `src/templates/404.ejs`
- Modify: `src/index.js`

- [ ] **Step 1: Create src/templates/404.ejs**

```html
<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 — codesthings.com</title>
    <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <section class="hero" style="min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div class="hero-inner" style="text-align: center;">
        <h1 class="hero-title" style="font-size: var(--text-display);">404</h1>
        <p class="hero-role" style="margin-bottom: var(--space-xl);">This page doesn't exist.</p>
        <a href="/" class="hero-cta">Back to codesthings.com</a>
      </div>
    </section>
    <script src="js/theme.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Add 404 page to build pipeline**

In `src/index.js`, after writing `index.html` (around line 101), add:

```js
// Build 404 page
const notFoundTemplatePath = resolve(srcRoot, config.templateDir, '404.ejs');
if (await exists(notFoundTemplatePath)) {
  const notFoundHtml = await renderTemplate(notFoundTemplatePath, {});
  await writeFile(`${outputDir}/404.html`, notFoundHtml);
  debug('  404 page built');
}
```

- [ ] **Step 3: Build and verify**

```bash
npm start
ls -la public/404.html
```

Expected: `404.html` exists in `public/`.

- [ ] **Step 4: Commit**

```bash
git add src/templates/404.ejs src/index.js && git commit -m "feat: add custom 404 page matching site design

Branded 404 with link back to homepage. GitHub Pages serves
404.html automatically for missing routes.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

- [ ] **Step 5: Final push for Group 8**

```bash
git push origin claude-cleanup
```

---

## Final Verification

### Task 9.1: End-to-end verification

- [ ] **Step 1: Full local build**

```bash
npm start
```

- [ ] **Step 2: Serve and verify all sections**

```bash
npm run server &
# Open http://localhost:8080 in browser
# Verify:
# - Hero with CV download button
# - Campsnap banner with video (not GIF)
# - Cover letter section
# - Experience section
# - Skills section
# - Projects section
# - Socials section (GitHub, LinkedIn, Makerworld, Instagram)
# - Blog section (if posts exist)
# - Footer with logo and CV link
# - Favicon in browser tab
# - Theme toggle works (light/dark)
# - Print preview shows clean CV
# - 404 page at http://localhost:8080/nonexistent
kill %1
```

- [ ] **Step 3: Format check**

```bash
npm run format:check
```

- [ ] **Step 4: Check for secrets or junk**

```bash
git diff origin/main...HEAD --stat
# Review for any files that shouldn't be committed
```

- [ ] **Step 5: Update todo.md**

Mark all completed groups as `[x]` in `docs/todo.md`.

- [ ] **Step 6: Final commit and push**

```bash
git add docs/todo.md && git commit -m "docs: mark all todo groups as complete

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push origin claude-cleanup
```
