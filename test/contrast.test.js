import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { check, parseBlock } from '../scripts/contrast.js';

const tokens = await readFile(new URL('../src/css/tokens.css', import.meta.url), 'utf8');
const print = await readFile(new URL('../src/css/print.css', import.meta.url), 'utf8');

test('the real tokens pass in both themes', async () => {
  const results = await check(tokens);
  assert.deepEqual(
    results.filter(r => !r.ok).map(r => `${r.theme}: ${r.fg} on ${r.bg}`),
    [],
  );
  assert.ok(results.some(r => r.theme === 'dark') && results.some(r => r.theme === 'light'));
});

test('a failing pair is reported with its theme and names', async () => {
  const bad = tokens.replace(/(:root\[data-theme='light'\] \{[^}]*?--color-muted: )#[0-9a-f]{6}/, '$1#c8c8c0');
  assert.notEqual(bad, tokens);
  const failed = (await check(bad)).filter(r => !r.ok);
  assert.ok(failed.length > 0);
  assert.ok(failed.every(r => r.theme === 'light'));
  assert.ok(failed.some(r => r.fg === 'muted' && r.bg === 'surface'));
  assert.ok(failed.some(r => r.fg === 'muted' && r.bg === 'bg'));
});

test('a semicolon inside a comment does not truncate a value', () => {
  const css =
    ":root,\n:root[data-theme='dark'] {\n  --color-bg: #000000; /* a; b */\n  --color-text: #ffffff /* x; y */;\n}";
  const vars = parseBlock(css, ":root,\\s*:root\\[data-theme='dark'\\]");
  assert.equal(vars['color-bg'], '#000000');
  assert.equal(vars['color-text'], '#ffffff');
});

test('print.css carries exactly the light theme values', () => {
  const light = parseBlock(tokens, ":root\\[data-theme='light'\\]");
  const printed = parseBlock(
    print.replace(/^[\s\S]*?@media print \{/, ''),
    ":root,\\s*:root\\[data-theme='dark'\\],\\s*:root\\[data-theme='light'\\]",
  );
  for (const [name, value] of Object.entries(printed)) {
    if (name === 'color-scheme') continue;
    assert.equal(value, light[name], `--${name}`);
  }
  for (const name of Object.keys(light)) {
    if (!name.startsWith('code-') || light[name].startsWith('var(')) continue;
    assert.equal(printed[name], light[name], `--${name}`);
  }
  assert.ok(Object.keys(printed).length > 10);
});
