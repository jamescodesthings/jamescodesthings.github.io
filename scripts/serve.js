// Static server for measuring public/. Like GitHub Pages: extensionless .html resolution, a 404.html
// fallback with a 404 status, gzip for text types, and HTTP/2 over a throwaway self-signed certificate,
// so transfer sizes and request scheduling match what visitors get (GitHub Pages serves h2). Clients must
// accept the certificate (Chrome: --ignore-certificate-errors). Needs the openssl CLI.
// Usage: node scripts/serve.js [port] (port 0 or omitted picks a free one). Bound to 127.0.0.1 only.
import { execFileSync } from 'node:child_process';
import { createSecureServer } from 'node:http2';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { gzipSync } from 'node:zlib';

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webmanifest': 'application/manifest+json',
};
const compressible = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt', '.svg', '.webmanifest']);

async function resolveFile(root, pathname) {
  let file = resolve(root, `.${decodeURIComponent(pathname)}`);
  if (file !== root && !file.startsWith(root + sep)) return null;
  const tryStat = async f => stat(f).catch(() => null);
  let s = await tryStat(file);
  if (!s && !extname(file)) {
    file = `${file}.html`;
    s = await tryStat(file);
  }
  if (s?.isDirectory()) {
    file = resolve(file, 'index.html');
    s = await tryStat(file);
  }
  return s ? file : null;
}

function selfSigned() {
  const dir = mkdtempSync(join(tmpdir(), 'serve-cert-'));
  try {
    const key = join(dir, 'key.pem');
    const cert = join(dir, 'cert.pem');
    execFileSync(
      'openssl',
      [
        'req',
        '-x509',
        '-newkey',
        'rsa:2048',
        '-nodes',
        '-days',
        '2',
        '-subj',
        '/CN=127.0.0.1',
        '-keyout',
        key,
        '-out',
        cert,
      ],
      { stdio: 'ignore' },
    );
    return { key: readFileSync(key), cert: readFileSync(cert) };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

export function startServer(root, port = 0) {
  const dir = resolve(root);
  const handler = async (req, res) => {
    let file = await resolveFile(dir, new URL(req.url, 'http://x').pathname).catch(() => null);
    let status = 200;
    if (!file) {
      file = resolve(dir, '404.html');
      status = 404;
    }
    try {
      let body = await readFile(file);
      const ext = extname(file);
      const headers = { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': 'max-age=600' };
      if (compressible.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
        body = gzipSync(body);
        headers['Content-Encoding'] = 'gzip';
        headers.Vary = 'Accept-Encoding';
      }
      res.writeHead(status, headers);
      res.end(body);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  };
  const server = createSecureServer({ ...selfSigned(), allowHTTP1: true }, handler);
  return new Promise((ok, fail) => {
    server.once('error', fail);
    server.listen(port, '127.0.0.1', () => ok({ server, port: server.address().port }));
  });
}

if (process.argv[1] === import.meta.filename) {
  const { port } = await startServer(resolve(import.meta.dirname, '../public'), Number(process.argv[2] || 0));
  console.log(`Serving public/ at https://127.0.0.1:${port}`);
}
