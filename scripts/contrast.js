// Checks WCAG contrast for every text-ish colour pair in src/css/tokens.css, in both themes.
// Exits 1 and names each failing pair and theme. Run with `npm run contrast`.
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const tokensPath = resolve(import.meta.dirname, '../src/css/tokens.css');

// [foreground, background, minimum ratio, why]
const PAIRS = [
  ['text', 'bg', 4.5, 'body text'],
  ['text', 'surface', 4.5, 'body text'],
  ['text', 'surface-raised', 4.5, 'body text'],
  ['muted', 'bg', 4.5, 'secondary text'],
  ['muted', 'surface', 4.5, 'secondary text'],
  ['muted', 'surface-raised', 4.5, 'secondary text'],
  ['accent', 'bg', 3, 'accent graphics and large text'],
  ['accent', 'surface', 3, 'accent graphics and large text'],
  ['accent', 'bg', 4.5, 'accent link text'],
  ['accent', 'surface', 4.5, 'accent link text'],
  ['accent-strong', 'bg', 4.5, 'link hover text'],
  ['accent-strong', 'surface', 4.5, 'link hover text'],
  ['on-accent', 'accent', 4.5, 'text on accent buttons'],
  ['focus', 'bg', 3, 'focus ring'],
  ['focus', 'surface', 3, 'focus ring'],
  ['status', 'bg', 3, 'availability dot'],
  ['status', 'surface', 3, 'availability dot'],
  ...['text', 'comment', 'keyword', 'punctuation', 'string', 'constant', 'function'].map(t => [
    `code-${t}`,
    'surface',
    4.5,
    'syntax colour on the code block surface',
  ]),
];

export function parseBlock(css, selectorPattern) {
  const m = css.match(new RegExp(`${selectorPattern}\\s*\\{([^}]*)\\}`));
  if (!m) throw new Error(`tokens.css: no block matching ${selectorPattern}`);
  const vars = {};
  for (const d of m[1].matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) vars[d[1]] = d[2].replace(/\/\*.*?\*\//g, '').trim();
  return vars;
}

function resolveVar(vars, name, seen = []) {
  let v = vars[name];
  if (v === undefined) throw new Error(`token --${name} is not defined`);
  const ref = v.match(/^var\(--([\w-]+)\)$/);
  if (ref) {
    if (seen.includes(name)) throw new Error(`circular token --${name}`);
    return resolveVar(vars, ref[1], [...seen, name]);
  }
  return v;
}

const lin = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

export function luminance(hex) {
  const m = hex.match(/^#([0-9a-f]{6})$/i);
  if (!m) throw new Error(`unsupported colour "${hex}" (use six-digit hex)`);
  const n = parseInt(m[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(x => lin(x / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export async function check(css) {
  const dark = parseBlock(css, ":root,\\s*:root\\[data-theme='dark'\\]");
  const light = { ...parseBlock(css, ":root\\[data-theme='light'\\]") };
  const themes = { dark, light };
  const results = [];
  for (const [theme, vars] of Object.entries(themes)) {
    for (const [fg, bg, min, why] of PAIRS) {
      const get = n => resolveVar(vars, n.startsWith('code-') ? n : `color-${n}`);
      const r = ratio(get(fg), get(bg));
      results.push({ theme, fg, bg, min, why, ratio: r, ok: r >= min });
    }
  }
  return results;
}

if (process.argv[1] === import.meta.filename) {
  const results = await check(await readFile(tokensPath, 'utf8'));
  for (const r of results) {
    console.log(
      `${r.ok ? 'ok  ' : 'FAIL'} ${r.theme.padEnd(5)} ${r.fg} on ${r.bg}: ${r.ratio.toFixed(2)}:1 (needs ${r.min}:1, ${r.why})`,
    );
  }
  const failed = results.filter(r => !r.ok);
  if (failed.length) {
    console.error(`\n${failed.length} failing pair(s):`);
    for (const r of failed)
      console.error(`  ${r.theme}: ${r.fg} on ${r.bg} is ${r.ratio.toFixed(2)}:1, needs ${r.min}:1`);
    process.exit(1);
  }
  console.log(`\nAll ${results.length} pairs pass.`);
}
