import { createServer } from 'http';
import { readFile, stat } from 'fs/promises';
import { resolve, extname, dirname, sep } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import config from './config.js';
import Debug from 'debug';

const debug = Debug('codesthings:server');
debug.enabled = true;

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outputDir = resolve(root, config.outputDir);
const PORT = process.env.PORT || 8080;

export const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.xml': 'application/xml',
  '.mp4': 'video/mp4',
  '.txt': 'text/plain',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
};

// Maps a request URL to a file under `outputDir`: query and fragment dropped, % escapes decoded.
// Returns {filePath} or {status} (400 for a bad escape, 403 for a path outside the output directory).
export function resolveRequestPath(url, outputDir) {
  let pathname = url.split(/[?#]/)[0];
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    return { status: 400 };
  }
  if (pathname.includes('\0')) return { status: 400 };
  if (pathname === '/') pathname = '/index.html';
  const filePath = resolve(outputDir, `.${pathname}`);
  if (filePath !== outputDir && !filePath.startsWith(outputDir + sep)) return { status: 403 };
  return { filePath };
}

const server = createServer(async (req, res) => {
  debug(`Received request for ${req.url}`);
  const resolved = resolveRequestPath(req.url, outputDir);
  if (resolved.status) {
    res.writeHead(resolved.status);
    res.end(resolved.status === 400 ? 'Bad Request' : 'Forbidden');
    return;
  }
  let { filePath } = resolved;

  try {
    let fileStat = await stat(filePath).catch(err => {
      if (err.code === 'ENOENT' && !extname(filePath)) return null;
      throw err;
    });
    if (!fileStat) {
      filePath = `${filePath}.html`;
      fileStat = await stat(filePath);
    }
    if (fileStat.isDirectory()) {
      filePath = resolve(filePath, 'index.html');
    }

    const content = await readFile(filePath);
    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      debug(`File not found: ${filePath}`);
      // Like GitHub Pages: unknown paths get the built 404 page with a 404 status.
      const notFound = await readFile(resolve(outputDir, '404.html')).catch(() => null);
      res.writeHead(404, { 'Content-Type': notFound ? 'text/html' : 'text/plain' });
      res.end(notFound || 'Not Found');
    } else {
      debug(`Error serving ${filePath}: ${err.message}`);
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  }
});

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
  });
}
