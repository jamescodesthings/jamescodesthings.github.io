import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { renderTemplate, formatLongDate } from '../src/utils.js';

const template = resolve(import.meta.dirname, '../src/templates/colophon.ejs');
const render = colophon =>
  renderTemplate(template, { colophon, formatLongDate, path: '/colophon', stamp: null, links: [] });

test('colophon shows "Not measured yet" while measured is null', async () => {
  const html = await render({ measured: null });
  assert.match(html, /Not measured yet/);
  assert.doesNotMatch(html, /<table/);
  assert.match(html, /There's a game in here somewhere\./);
});

test('colophon with a date but no pages shows "Not measured yet"', async () => {
  const html = await render({ measured: '2026-10-09', pages: [] });
  assert.match(html, /Not measured yet/);
  assert.doesNotMatch(html, /<table/);
});

test('colophon formats measured numbers', async () => {
  const html = await render({
    measured: '2026-10-09',
    pages: [
      {
        path: '/',
        scores: { performance: 97, accessibility: 100, bestPractices: 100, seo: 100 },
        lcp: 1234,
        cls: 0,
        tbt: 40,
        bytes: 153600,
        requests: 12,
      },
    ],
  });
  assert.match(html, /9 October 2026/);
  assert.match(html, /<td>1\.2 s<\/td>/);
  assert.match(html, /<td>0\.000<\/td>/);
  assert.match(html, /<td>40 ms<\/td>/);
  assert.match(html, /<td>150\.0 KB<\/td>/);
  assert.match(html, /<td>97<\/td>/);
  assert.match(html, /<td>12<\/td>/);
});
