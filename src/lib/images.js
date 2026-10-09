// Image pipeline: sharp resizes each referenced raster to AVIF and WebP at a few widths, caches the
// output by content hash, and renders a <picture>. Only images that something references get output.
import { createHash } from 'crypto';
import { resolve, relative, isAbsolute, posix, extname, basename } from 'path';
import { readFile, writeFile, mkdir, copyFile, stat } from 'fs/promises';
import sharp from 'sharp';
import { decodeEntities } from './text.js';

export const DEFAULT_WIDTHS = [480, 960, 1600];
export const DEFAULT_URL_PREFIX = '/assets/img';
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

// A photo `src` in data/photos/*.json is relative to src/assets/photos/ ("x.jpg"). A leading "/assets/",
// "assets/" or "../assets/" still means src/assets/ as written.
export function resolvePhotoPath(src, assetsRoot) {
  if (/^(\.\.?\/)?\/?assets\//.test(src)) return resolveAssetPath(src, assetsRoot);
  if (posix.normalize(src).split('/').includes('..')) throw new Error(`Photo path escapes photos/: ${src}`);
  return resolveAssetPath(posix.join('photos', src), assetsRoot);
}

// Local, non-image-tag link targets that point into the assets tree must exist and ship.
const isAssetLink = ref => !isExternal(ref) && /(^|\/)assets\//.test(ref.split(/[?#]/)[0]);

// Rewrites every local <img> in `html`. Raster images become a <picture>; other local files (svg, gif)
// are copied as-is. A wrapping <a> whose href is the same image points at the largest WebP; a different
// local file under assets/ is validated and shipped too. The first image gets priority, the rest are
// lazy. Every failure is prefixed with the slug, so a missing or undecodable file names the post.
export async function processHtmlImages(
  html,
  { slug, assetsRoot, outDir, cacheDir, sizes = POST_SIZES, widths, urlPrefix = DEFAULT_URL_PREFIX },
) {
  const images = new Map(); // ref -> processImage result
  const copies = new Map(); // ref -> url of a copied non-raster file
  const fail = (ref, err) => {
    throw new Error(err.message.startsWith(`${slug}:`) ? err.message : `${slug}: ${ref}: ${err.message}`);
  };
  const locate = async ref => {
    let abs;
    try {
      abs = resolveAssetPath(ref, assetsRoot);
    } catch (err) {
      fail(ref, err);
    }
    if (!(await fileExists(abs))) throw new Error(`${slug}: image not found: ${ref} (looked for ${abs})`);
    return abs;
  };
  const ship = async ref => {
    if (images.has(ref) || copies.has(ref)) return;
    const abs = await locate(ref);
    try {
      if (isRaster(ref)) {
        images.set(ref, await processImage(abs, { widths, outDir, cacheDir, urlPrefix }));
      } else {
        const bytes = await readFile(abs);
        const name = `${createHash('sha1').update(bytes).digest('hex').slice(0, 12)}-${basename(abs)}`;
        await mkdir(outDir, { recursive: true });
        await writeFile(resolve(outDir, name), bytes);
        copies.set(ref, `${urlPrefix}/${name}`);
      }
    } catch (err) {
      fail(ref, err);
    }
  };
  const urlFor = ref => (images.has(ref) ? images.get(ref).fallback : copies.get(ref));

  const TAGS = /(<a\b[^>]*>\s*)?(<img\b[^>]*>)/gi;
  // Resolve everything first (async), then substitute synchronously.
  for (const [, anchor, tag] of html.matchAll(TAGS)) {
    const src = attr(tag, 'src');
    if (src && !isExternal(src)) await ship(src);
    const href = anchor && attr(anchor, 'href');
    if (href && href !== src && isAssetLink(href)) await ship(href);
  }

  let first = true;
  return html.replace(TAGS, (whole, anchor = '', tag) => {
    const src = attr(tag, 'src');
    if (!src || isExternal(src)) return whole;
    let open = anchor;
    const href = anchor && attr(anchor, 'href');
    if (href && (href === src || isAssetLink(href)))
      open = anchor.replace(/(href\s*=\s*")[^"]*(")/i, `$1${urlFor(href)}$2`);
    if (!images.has(src)) return open + tag.replace(/(src\s*=\s*")[^"]*(")/i, `$1${copies.get(src)}$2`);
    const priority = first;
    first = false;
    return open + pictureHtml({ image: images.get(src), alt: decodeEntities(attr(tag, 'alt') ?? ''), sizes, priority });
  });
}
