import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, stat, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { processImage, pictureHtml, collectImageRefs, resolveAssetPath, processHtmlImages } from '../src/lib/images.js';

let tmp;
let big;
let small;

async function png(path, width, height) {
  await sharp({ create: { width, height, channels: 3, background: { r: 200, g: 80, b: 30 } } })
    .png()
    .toFile(path);
}

before(async () => {
  tmp = await mkdtemp(resolve(tmpdir(), 'images-test-'));
  big = resolve(tmp, 'big.png');
  small = resolve(tmp, 'small.png');
  await png(big, 2000, 1000);
  await png(small, 300, 150);
});

const dirs = async name => ({ outDir: resolve(tmp, name, 'out'), cacheDir: resolve(tmp, name, 'cache') });

test('produces avif and webp at 480, 960 and 1600', async () => {
  const image = await processImage(big, await dirs('a'));
  assert.equal(image.width, 2000);
  assert.equal(image.height, 1000);
  assert.deepEqual(
    image.sources.map(s => s.type),
    ['image/avif', 'image/webp'],
  );
  for (const s of image.sources) {
    const widths = s.srcset.split(',').map(p => p.trim().split(' ')[1]);
    assert.deepEqual(widths, ['480w', '960w', '1600w']);
  }
  const files = await readdir(resolve(tmp, 'a', 'out'));
  assert.equal(files.length, 6);
  assert.match(image.fallback, /-1600\.webp$/);
});

test('never upscales a small source', async () => {
  const image = await processImage(small, await dirs('b'));
  for (const s of image.sources) assert.match(s.srcset, /^\S+-300\.\w+ 300w$/);
});

test('a second call hits the cache and leaves files untouched', async () => {
  const d = await dirs('c');
  const first = await processImage(big, d);
  const file = resolve(d.outDir, first.fallback.split('/').pop());
  const before = (await stat(file)).mtimeMs;
  await new Promise(r => setTimeout(r, 20));
  const second = await processImage(big, d);
  assert.deepEqual(second, first);
  assert.equal((await stat(file)).mtimeMs, before);
});

test('a missing source rejects with the path', async () => {
  const missing = resolve(tmp, 'nope.png');
  await assert.rejects(processImage(missing, await dirs('d')), err => err.message.includes(missing));
});

test('pictureHtml carries intrinsic size, lazy loading and escaped alt', async () => {
  const image = await processImage(big, await dirs('e'));
  const html = pictureHtml({ image, alt: 'A "quoted" <alt>', sizes: '100vw' });
  assert.match(html, /width="2000" height="1000" loading="lazy" decoding="async"/);
  assert.match(html, /alt="A &quot;quoted&quot; &lt;alt&gt;"/);
  assert.match(html, /<source type="image\/avif"/);
  assert.doesNotMatch(html, /fetchpriority/);
  const hi = pictureHtml({ image, alt: 'x', sizes: '100vw', priority: true });
  assert.match(hi, /fetchpriority="high"/);
  assert.doesNotMatch(hi, /loading="lazy"/);
});

test('collectImageRefs lists img src values in order', () => {
  const html = '<p><img src="a.png" alt="x" /><img alt="y" src="/b.png"><img src="https://x.test/c.png"></p>';
  assert.deepEqual(collectImageRefs(html), ['a.png', '/b.png', 'https://x.test/c.png']);
});

test('resolveAssetPath maps relative and absolute refs under src/assets', () => {
  const root = '/site/src/assets';
  assert.equal(resolveAssetPath('../assets/blog-images/x.png', root), '/site/src/assets/blog-images/x.png');
  assert.equal(resolveAssetPath('/assets/blog-images/x.png', root), '/site/src/assets/blog-images/x.png');
  assert.equal(resolveAssetPath('photos/p.jpg', root), '/site/src/assets/photos/p.jpg');
  assert.throws(() => resolveAssetPath('../../etc/passwd', root));
});

test('processHtmlImages swaps img for picture, links to the webp, first is priority', async () => {
  const assetsRoot = resolve(tmp, 'f', 'assets');
  await mkdir(resolve(assetsRoot, 'blog-images'), { recursive: true });
  await png(resolve(assetsRoot, 'blog-images', 'x.png'), 1200, 600);
  await png(resolve(assetsRoot, 'blog-images', 'y.png'), 800, 400);
  const html =
    '<a href="../assets/blog-images/x.png"><img src="../assets/blog-images/x.png" alt="X" /></a>' +
    '<a href="https://example.com"><img src="/assets/blog-images/y.png" alt="Y" /></a>';
  const d = await dirs('f');
  const out = await processHtmlImages(html, { slug: 'post', assetsRoot, ...d });
  assert.equal((out.match(/<picture>/g) || []).length, 2);
  assert.doesNotMatch(out, /<img[^>]*\.png/);
  assert.match(out, /<a href="\/assets\/img\/[0-9a-f]+-960\.webp"><picture>/);
  assert.match(out, /<a href="https:\/\/example.com">/);
  assert.equal((out.match(/fetchpriority="high"/g) || []).length, 1);
  assert.equal((out.match(/loading="lazy"/g) || []).length, 1);
});

test('a missing referenced image fails with the post slug and path', async () => {
  const assetsRoot = resolve(tmp, 'g', 'assets');
  await mkdir(assetsRoot, { recursive: true });
  const html = '<img src="../assets/blog-images/ghost.png" alt="g" />';
  await assert.rejects(
    processHtmlImages(html, { slug: '2026-05-01-zerocalc', assetsRoot, ...(await dirs('g')) }),
    err => err.message.includes('2026-05-01-zerocalc') && err.message.includes('../assets/blog-images/ghost.png'),
  );
});
