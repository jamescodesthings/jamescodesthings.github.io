import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, stat, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import sharp from 'sharp';
import {
  processImage,
  pictureHtml,
  collectImageRefs,
  resolveAssetPath,
  resolvePhotoPath,
  processHtmlImages,
} from '../src/lib/images.js';

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
  const entries = await readdir(d.cacheDir);
  assert.equal(entries.length, 1);
  const cached = ['meta.json', '480.avif', '1600.webp'].map(f => resolve(d.cacheDir, entries[0], f));
  const before = await Promise.all(cached.map(async f => (await stat(f)).mtimeMs));
  await rm(file); // outDir wiped, as the build does: must be refilled from the cache
  await new Promise(r => setTimeout(r, 20));
  const second = await processImage(big, d);
  assert.deepEqual(second, first);
  assert.deepEqual(await Promise.all(cached.map(async f => (await stat(f)).mtimeMs)), before);
  assert.equal((await readdir(d.cacheDir)).length, 1);
  await stat(file);
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

test('resolvePhotoPath is relative to assets/photos', () => {
  const root = '/site/src/assets';
  assert.equal(resolvePhotoPath('x.jpg', root), '/site/src/assets/photos/x.jpg');
  assert.equal(resolvePhotoPath('2026/x.jpg', root), '/site/src/assets/photos/2026/x.jpg');
  assert.equal(resolvePhotoPath('/assets/photos/x.jpg', root), '/site/src/assets/photos/x.jpg');
  assert.throws(() => resolvePhotoPath('../../x.jpg', root));
});

async function fixture(name) {
  const assetsRoot = resolve(tmp, name, 'assets');
  await mkdir(resolve(assetsRoot, 'blog-images'), { recursive: true });
  return { assetsRoot, ...(await dirs(name)) };
}

test('local svg and gif are checked, copied and rewritten', async () => {
  const f = await fixture('h');
  await writeFile(resolve(f.assetsRoot, 'blog-images', 'd.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  const html = '<img src="/assets/blog-images/d.svg" alt="d" />';
  const out = await processHtmlImages(html, { slug: 'p', ...f });
  const url = out.match(/src="([^"]+)"/)[1];
  assert.match(url, /^\/assets\/img\/[0-9a-f]{12}-d\.svg$/);
  await stat(resolve(f.outDir, url.split('/').pop()));
  await assert.rejects(
    processHtmlImages('<img src="../assets/blog-images/gone.gif">', { slug: 'p', ...f }),
    /^Error: p: image not found: \.\.\/assets\/blog-images\/gone\.gif/,
  );
});

test('failures are prefixed with the slug: traversal and undecodable images', async () => {
  const f = await fixture('i');
  await writeFile(resolve(f.assetsRoot, 'blog-images', 'bad.png'), 'not a png');
  await assert.rejects(processHtmlImages('<img src="../../../etc/x.png">', { slug: 'p', ...f }), /^Error: p: /);
  await assert.rejects(
    processHtmlImages('<img src="/assets/blog-images/bad.png">', { slug: 'p', ...f }),
    /^Error: p: /,
  );
});

test('a wrapping link to a different asset is validated and shipped', async () => {
  const f = await fixture('j');
  await png(resolve(f.assetsRoot, 'blog-images', 'a.png'), 600, 300);
  await png(resolve(f.assetsRoot, 'blog-images', 'b.png'), 1000, 500);
  await writeFile(resolve(f.assetsRoot, 'blog-images', 'doc.pdf'), 'pdf');
  const tpl = href => `<a href="${href}"><img src="/assets/blog-images/a.png" alt="a"></a>`;
  const png2 = await processHtmlImages(tpl('/assets/blog-images/b.png'), { slug: 'p', ...f });
  assert.match(png2, /<a href="\/assets\/img\/[0-9a-f]{12}-960\.webp"><picture>/);
  const pdf = await processHtmlImages(tpl('/assets/blog-images/doc.pdf'), { slug: 'p', ...f });
  assert.match(pdf, /<a href="\/assets\/img\/[0-9a-f]{12}-doc\.pdf">/);
  await assert.rejects(
    processHtmlImages(tpl('/assets/blog-images/nope.png'), { slug: 'p', ...f }),
    /^Error: p: image not found/,
  );
});

test('alt text with entities is escaped once, not twice', async () => {
  const { createRenderer } = await import('../src/lib/markdown.js');
  const r = await createRenderer();
  const d = { outDir: resolve(tmp, 'out-alt'), cacheDir: resolve(tmp, 'cache-alt') };
  await mkdir(resolve(tmp, 'a'), { recursive: true });
  await png(resolve(tmp, 'a/x.png'), 400, 300);
  const out = await r.renderPost('![Tom & "Jerry"](../assets/a/x.png)', { slug: 'p', assetsRoot: tmp, ...d });
  assert.match(out.html, /alt="Tom &amp; &quot;Jerry&quot;"/);
  assert.doesNotMatch(out.html, /&amp;amp;|&amp;quot;/);
});
