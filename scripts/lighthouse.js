// Builds the site, serves public/ locally, runs Lighthouse (mobile, simulated throttling) on the pages
// below (over local HTTP/2, like GitHub Pages) and writes the raw numbers to data/colophon.json. Run with `npm run lighthouse`.
// Pass --no-build to measure the existing public/. Needs Chrome installed.
import { execFileSync, spawn } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { startServer } from './serve.js';

const LIGHTHOUSE = 'lighthouse@12.8.2'; // pinned: the colophon numbers are only comparable between runs of one version
const PAGES = ['/', '/blog/2026-05-01-zerocalc.html'];
const root = resolve(import.meta.dirname, '..');

export function summarise(lhr, path) {
  const audit = id => lhr.audits[id].numericValue;
  const score = id => Math.round(lhr.categories[id].score * 100);
  return {
    path,
    scores: {
      performance: score('performance'),
      accessibility: score('accessibility'),
      bestPractices: score('best-practices'),
      seo: score('seo'),
    },
    lcp: Math.round(audit('largest-contentful-paint')),
    cls: Number(audit('cumulative-layout-shift').toFixed(3)),
    tbt: Math.round(audit('total-blocking-time')),
    bytes: Math.round(audit('total-byte-weight')),
    requests: lhr.audits['network-requests'].details.items.length,
  };
}

if (process.argv[1] === import.meta.filename) {
  if (!process.argv.includes('--no-build')) execFileSync('npm', ['run', 'build'], { cwd: root, stdio: 'inherit' });
  const { server, port } = await startServer(join(root, 'public'));
  const tmp = await mkdtemp(join(tmpdir(), 'lh-'));
  try {
    const pages = [];
    for (const path of PAGES) {
      const out = join(tmp, 'report.json');
      // Async on purpose: the server runs in this process and must keep answering while Lighthouse loads.
      const status = await new Promise(done => {
        spawn(
          'npx',
          [
            '--yes',
            LIGHTHOUSE,
            `https://127.0.0.1:${port}${path}`,
            '--output=json',
            `--output-path=${out}`,
            '--quiet',
            '--chrome-flags=--headless=new --no-sandbox --ignore-certificate-errors',
          ],
          { cwd: root, stdio: ['ignore', 'inherit', 'inherit'] },
        ).on('close', done);
      });
      if (status !== 0) throw new Error(`lighthouse failed for ${path}`);
      const page = summarise(JSON.parse(await readFile(out, 'utf8')), path);
      console.log(JSON.stringify(page));
      pages.push(page);
    }
    const measured = new Date().toISOString().slice(0, 10);
    await writeFile(join(root, 'data/colophon.json'), `${JSON.stringify({ measured, pages }, null, 2)}\n`);
    console.log(`Wrote data/colophon.json (${measured})`);
  } finally {
    server.close();
    await rm(tmp, { recursive: true, force: true });
  }
}
