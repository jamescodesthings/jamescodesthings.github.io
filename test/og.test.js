import { test } from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { renderOgCard, ogSlugFor, ogCardPath } from '../src/lib/og.js';

test('renderOgCard returns a 1200x630 PNG', async () => {
  const png = await renderOgCard({ title: 'ZeroCalc', summary: 'A small calculator.', path: '/blog/zerocalc.html' });
  assert.deepEqual([...png.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const meta = await sharp(png).metadata();
  assert.equal(meta.width, 1200);
  assert.equal(meta.height, 630);
});

test('a 200-character title and a long summary do not throw', async () => {
  const png = await renderOgCard({ title: 'x'.repeat(200), summary: 'word '.repeat(120), path: '/blog/long.html' });
  assert.equal((await sharp(png).metadata()).height, 630);
});

test('an empty summary still renders', async () => {
  const png = await renderOgCard({ title: 'Now', summary: '', path: '/now' });
  assert.equal((await sharp(png).metadata()).width, 1200);
});

test('ogSlugFor maps output paths to card slugs', () => {
  assert.equal(ogSlugFor('index.html'), 'home');
  assert.equal(ogSlugFor('projects/index.html'), 'projects');
  assert.equal(ogSlugFor('blog/2026-05-01-zerocalc.html'), 'blog-2026-05-01-zerocalc');
  assert.equal(ogSlugFor('privacy-notice.html'), 'privacy-notice');
  assert.equal(ogSlugFor('404.html'), null);
  assert.equal(ogCardPath('now.html'), '/og/now.png');
});
