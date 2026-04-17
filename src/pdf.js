import Debug from 'debug';
import { resolve, dirname, join, relative, extname } from 'path';
import { fileURLToPath } from 'url';
import { copyFile, writeFile, readFile, readdir } from 'fs/promises';
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
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
};

function getMimeType(filePath) {
  return MIME_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
}

async function getAllFiles(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(full, base)));
    } else {
      files.push(relative(base, full));
    }
  }
  return files;
}

export async function htmlToPdf(outputPath, dark = false) {
  debug(`Generating ${dark ? 'dark' : 'light'} PDF → ${outputPath}`);

  const healthRes = await fetch(`${GOTENBERG_URL}/health`);
  if (!healthRes.ok) throw new Error(`Gotenberg unavailable at ${GOTENBERG_URL}`);
  debug('Gotenberg healthy');

  let html = await readFile(resolve(publicDir, 'index.html'), 'utf-8');

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

  const allFiles = await getAllFiles(publicDir);
  for (const relPath of allFiles) {
    if (relPath === 'index.html') continue;
    const content = await readFile(join(publicDir, relPath));
    formData.append('files', new Blob([content], { type: getMimeType(relPath) }), relPath);
  }

  debug(`Uploading ${allFiles.length} files to Gotenberg`);

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
