import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { iconInner } from '../src/utils.js';

test('iconInner returns the drawing without the outer svg or inter-tag whitespace', () => {
  assert.equal(iconInner('arrow'), '<path d="M5 12h14" /><path d="m12 5 7 7-7 7" />');
});

test('iconInner throws on an unknown or unsafe name', () => {
  assert.throws(() => iconInner('no-such-icon'), /Unknown icon/);
  assert.throws(() => iconInner('../utils'), /Invalid icon name/);
});

test('every vendored icon loads', () => {
  const names = readdirSync(new URL('../shared/icons/', import.meta.url)).filter(f => f.endsWith('.svg'));
  assert.ok(names.length > 0);
  for (const f of names) assert.ok(iconInner(f.replace(/\.svg$/, '')).length > 0, f);
});
