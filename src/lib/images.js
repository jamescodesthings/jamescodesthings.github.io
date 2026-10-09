// Image pipeline: sharp resizes each referenced raster to AVIF and WebP at a few widths, caches the
// output by content hash, and renders a <picture>. Only images that something references get output.
import { createHash } from 'crypto';
import { resolve, relative, isAbsolute, posix, extname } from 'path';
import { readFile, writeFile, mkdir, copyFile, stat } from 'fs/promises';
import sharp from 'sharp';

export const DEFAULT_WIDTHS = [480, 960, 1600];
export const DEFAULT_URL_PREFIX = '/assets/img';
// Directories under src/assets/ that the pipeline owns; the wholesale asset copy skips them.
export const PIPELINE_DIRS = ['blog-images', 'photos', 'projects'];
export const POST_SIZES = '(min-width: 760px) 720px, 100vw';

const RASTER = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.tif', '.tiff']);
const FORMATS = [
  { type: 'image/avif', ext: 'avif', encode: img => img.avif({ quality: 50, effort: 4 }) },
  { type: 'image/webp', ext: 'webp', encode: img => img.webp({ quality: 78 }) },
];
const CACHE_VERSION = 1;

const fileExists = async path => {
  try {
    await stat(path);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    throw err;
  }
};

const escapeAttr = s =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// processImage(srcAbs, {widths, outDir, cacheDir, urlPrefix}) -> {width, height, sources, fallback}
// Never upscales: only widths <= the source width are made (a narrower source yields its own width).
// Cached by sha1 of the source bytes plus the widths; output files are only copied when absent.
export async function processImage(
  srcAbs,
  { widths = DEFAULT_WIDTHS, outDir, cacheDir, urlPrefix = DEFAULT_URL_PREFIX } = {},
) {
  let bytes;
  try {
    bytes = await readFile(srcAbs);
  } catch (err) {
    throw new Error(`Image not found or unreadable: ${srcAbs} (${err.code || err.message})`);
  }

  const key = createHash('sha1')
    .update(bytes)
    .update(JSON.stringify([CACHE_VERSION, widths]))
    .digest('hex');
  const stem = key.slice(0, 12);
  const entry = resolve(cacheDir, key);
  const metaPath = resolve(entry, 'meta.json');

  let meta;
  if (await fileExists(metaPath)) {
    meta = JSON.parse(await readFile(metaPath, 'utf8'));
  } else {
    let info;
    try {
      info = await sharp(bytes).metadata();
    } catch (err) {
      throw new Error(`Cannot decode image ${srcAbs}: ${err.message}`);
    }
    const swap = info.orientation >= 5;
    const width = swap ? info.height : info.width;
    const height = swap ? info.width : info.height;
    const made = [...new Set(widths.filter(w => w <= width))].sort((a, b) => a - b);
    if (!made.length) made.push(width);
    await mkdir(entry, { recursive: true });
    for (const w of made) {
      for (const f of FORMATS) {
        await f
          .encode(sharp(bytes).rotate().resize({ width: w, withoutEnlargement: true }))
          .toFile(resolve(entry, `${w}.${f.ext}`));
      }
    }
    meta = { width, height, widths: made };
    await writeFile(metaPath, JSON.stringify(meta));
  }

  await mkdir(outDir, { recursive: true });
  for (const w of meta.widths) {
    for (const f of FORMATS) {
      const dest = resolve(outDir, `${stem}-${w}.${f.ext}`);
      if (!(await fileExists(dest))) await copyFile(resolve(entry, `${w}.${f.ext}`), dest);
    }
  }

  const url = (w, ext) => `${urlPrefix}/${stem}-${w}.${ext}`;
  const largest = meta.widths[meta.widths.length - 1];
  return {
    width: meta.width,
    height: meta.height,
    sources: FORMATS.map(f => ({
      type: f.type,
      srcset: meta.widths.map(w => `${url(w, f.ext)} ${w}w`).join(', '),
    })),
    fallback: url(largest, 'webp'),
  };
}

// The <picture> markup. The <img> keeps the intrinsic width and height so layout never shifts.
export function pictureHtml({ image, alt = '', sizes = '100vw', priority = false }) {
  const sources = image.sources
    .map(s => `<source type="${s.type}" srcset="${s.srcset}" sizes="${escapeAttr(sizes)}">`)
    .join('');
  const loading = priority ? 'fetchpriority="high"' : 'loading="lazy"';
  return (
    `<picture>${sources}<img src="${image.fallback}" alt="${escapeAttr(alt)}" ` +
    `width="${image.width}" height="${image.height}" ${loading} decoding="async"></picture>`
  );
}

const IMG_TAG = /<img\b[^>]*>/gi;
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
  return m ? (m[1] ?? m[2]) : undefined;
};

// The src of every <img> in the html, in document order (duplicates kept).
export function collectImageRefs(html) {
  return (html.match(IMG_TAG) || []).map(tag => attr(tag, 'src')).filter(Boolean);
}

const isExternal = ref => /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(ref);

// Maps a reference (as written in a post at /blog/x.html, or a data file) to an absolute file under
// the assets root: '../assets/a/b.png', '/assets/a/b.png', 'assets/a/b.png' and 'a/b.png' all mean
// <assetsRoot>/a/b.png. Anything that escapes the assets root throws.
export function resolveAssetPath(ref, assetsRoot) {
  const clean = ref.split(/[?#]/)[0];
  const rel = posix
    .normalize(clean)
    .replace(/^\.\.?\//, '')
    .replace(/^\/+/, '')
    .replace(/^assets\//, '');
  const abs = resolve(assetsRoot, rel);
  const back = relative(assetsRoot, abs);
  if (!back || back.startsWith('..') || isAbsolute(back)) throw new Error(`Image path escapes assets: ${ref}`);
  return abs;
}

const isRaster = ref => RASTER.has(extname(ref.split(/[?#]/)[0]).toLowerCase());

// Rewrites every local raster <img> in `html` to a <picture>. `<a>` wrapping an image that links to the
// same file gets its href pointed at the largest WebP. The first image gets priority, the rest are lazy.
// A missing image throws, naming the slug and the reference.
export async function processHtmlImages(
  html,
  { slug, assetsRoot, outDir, cacheDir, sizes = POST_SIZES, widths, urlPrefix },
) {
  const cache = new Map();
  const load = async ref => {
    if (!cache.has(ref)) {
      const abs = resolveAssetPath(ref, assetsRoot);
      if (!(await fileExists(abs))) throw new Error(`${slug}: image not found: ${ref} (looked for ${abs})`);
      cache.set(ref, await processImage(abs, { widths, outDir, cacheDir, urlPrefix }));
    }
    return cache.get(ref);
  };

  // Resolve everything first (async), then substitute synchronously.
  const refs = collectImageRefs(html).filter(r => !isExternal(r) && isRaster(r));
  for (const ref of new Set(refs)) await load(ref);

  let first = true;
  return html.replace(/(<a\b[^>]*>\s*)?(<img\b[^>]*>)/gi, (whole, anchor = '', tag) => {
    const src = attr(tag, 'src');
    if (!src || isExternal(src) || !isRaster(src)) return whole;
    const image = cache.get(src);
    const priority = first;
    first = false;
    let open = anchor;
    const href = anchor && attr(anchor, 'href');
    if (href && href === src) open = anchor.replace(/(href\s*=\s*")[^"]*(")/i, `$1${image.fallback}$2`);
    return open + pictureHtml({ image, alt: attr(tag, 'alt') ?? '', sizes, priority });
  });
}
