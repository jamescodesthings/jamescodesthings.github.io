import Debug from 'debug';
import { resolve, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { copyFile, writeFile, readFile } from 'fs/promises';
import config from './config.js';

const debug = Debug('codesthings:pdf');
debug.enabled = true;

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

debug('Building PDF');

const { GOTENBERG_URL } = process.env;
debug(`Gotenberg Url: ${GOTENBERG_URL}`);

const publicDir = resolve(root, config.outputDir);
const publicAssetsDir = resolve(publicDir, 'assets');
const pagesAssetsDir = resolve(root, 'pages', 'assets');

const MIME_TYPES = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
};

function getMimeType(filePath) {
  return MIME_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
}

async function toDataUri(absPath) {
  const buf = await readFile(absPath);
  return `data:${getMimeType(absPath)};base64,${buf.toString('base64')}`;
}

async function inlineCssUrls(css, cssAbsPath) {
  const cssDir = dirname(cssAbsPath);
  const urlRegex = /url\((['"]?)([^)'"]+)\1\)/g;
  const matches = [...css.matchAll(urlRegex)];
  let result = css;
  for (const match of matches) {
    const urlStr = match[2];
    if (urlStr.startsWith('http') || urlStr.startsWith('data:') || urlStr.startsWith('//')) continue;
    const absPath = resolve(cssDir, urlStr);
    try {
      const dataUri = await toDataUri(absPath);
      result = result.replace(match[0], `url('${dataUri}')`);
    } catch {
      debug(`Warning: could not inline asset ${absPath}`);
    }
  }
  return result;
}

async function inlineAssets(html) {
  let result = html;

  // Inline local stylesheets
  const linkRegex = /<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*\/?>/g;
  for (const match of [...html.matchAll(linkRegex)]) {
    const href = match[1];
    if (href.startsWith('http') || href.startsWith('//')) continue;
    const absPath = resolve(publicDir, href);
    try {
      let css = await readFile(absPath, 'utf-8');
      css = await inlineCssUrls(css, absPath);
      result = result.replace(match[0], `<style>${css}</style>`);
    } catch {
      debug(`Warning: could not inline stylesheet ${href}`);
    }
  }

  // Inline local scripts
  const scriptRegex = /<script[^>]+src="([^"]+)"[^>]*><\/script>/g;
  for (const match of [...html.matchAll(scriptRegex)]) {
    const src = match[1];
    if (src.startsWith('http') || src.startsWith('//')) continue;
    const absPath = resolve(publicDir, src);
    try {
      const js = await readFile(absPath, 'utf-8');
      result = result.replace(match[0], `<script>${js}</script>`);
    } catch {
      debug(`Warning: could not inline script ${src}`);
    }
  }

  return result;
}

export async function htmlToPdf(outputPath, dark = false) {
  debug(`Generating ${dark ? 'dark' : 'light'} PDF → ${outputPath}`);

  const healthRes = await fetch(`${GOTENBERG_URL}/health`);
  if (!healthRes.ok) throw new Error(`Gotenberg unavailable at ${GOTENBERG_URL}`);
  debug('Gotenberg healthy');

  let html = await readFile(resolve(publicDir, 'index.html'), 'utf-8');
  html = await inlineAssets(html);

  if (dark) {
    if (/<html[^>]*class="/.test(html)) {
      html = html.replace(/(<html[^>]*class=")/, '$1dark ');
    } else {
      html = html.replace(/<html\b/, '<html class="dark"');
    }
  }

  const formData = new FormData();
  formData.append('marginTop', '0');
  formData.append('marginBottom', '0');
  formData.append('marginLeft', '0');
  formData.append('marginRight', '0');
  formData.append('printBackground', 'true');
  formData.append('files', new Blob([html], { type: 'text/html' }), 'index.html');

  debug('Uploading self-contained HTML to Gotenberg');

  const response = await fetch(`${GOTENBERG_URL}/forms/chromium/convert/html`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const body = await response.text();
    debug(`Gotenberg error: ${response.status} ${response.statusText}: ${body}`);
    throw new Error(`PDF conversion failed: ${response.statusText}`);
  }

  const pdfBuffer = await response.arrayBuffer();
  await writeFile(outputPath, Buffer.from(pdfBuffer));
  debug(`PDF written to ${outputPath}`);
}

await htmlToPdf(resolve(publicAssetsDir, 'cv.pdf'), false);
await copyFile(resolve(publicAssetsDir, 'cv.pdf'), resolve(pagesAssetsDir, 'cv.pdf'));

await htmlToPdf(resolve(publicAssetsDir, 'cv-dark.pdf'), true);
await copyFile(resolve(publicAssetsDir, 'cv-dark.pdf'), resolve(pagesAssetsDir, 'cv-dark.pdf'));

debug('PDFs saved:');
debug(` - ${resolve(publicAssetsDir, 'cv.pdf')}`);
debug(` - ${resolve(pagesAssetsDir, 'cv.pdf')}`);
debug(` - ${resolve(publicAssetsDir, 'cv-dark.pdf')}`);
debug(` - ${resolve(pagesAssetsDir, 'cv-dark.pdf')}`);
