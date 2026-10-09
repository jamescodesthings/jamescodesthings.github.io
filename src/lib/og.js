import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const here = dirname(fileURLToPath(import.meta.url));
const fontDir = resolve(here, '../assets/fonts/og');

// Bump when the card design changes, so cached PNGs are rebuilt.
export const OG_VERSION = 2;

// Dark-theme values copied from src/css/tokens.css (--color-bg, --color-text, --color-accent, --color-muted).
// A server-rendered PNG has no CSS, so they live here; keep them in step with tokens.css.
const COLOR = { bg: '#0f1216', text: '#e8ebef', accent: '#f5b84a', muted: '#9aa4b0' };

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// The one slug rule, shared by head.ejs (via renderPage) and buildOg:
// index.html -> home, projects/index.html -> projects, blog/<x>.html -> blog-<x>, <x>.html -> <x>. 404 has no card.
export function ogSlugFor(outPath) {
  if (outPath === '404.html') return null;
  if (outPath === 'index.html') return 'home';
  return outPath
    .replace(/\/index\.html$/, '')
    .replace(/\.html$/, '')
    .replace(/\//g, '-');
}

export function ogCardPath(outPath) {
  const slug = ogSlugFor(outPath);
  return slug ? `/og/${slug}.png` : null;
}

let fontsPromise;
function loadFonts() {
  fontsPromise ??= Promise.all([
    readFile(resolve(fontDir, 'bricolage-grotesque-latin-700-normal.woff')),
    readFile(resolve(fontDir, 'figtree-latin-400-normal.woff')),
    readFile(resolve(fontDir, 'geist-mono-latin-400-normal.woff')),
  ]).then(([bricolage, figtree, geist]) => [
    { name: 'Bricolage Grotesque', data: bricolage, weight: 700, style: 'normal' },
    { name: 'Figtree', data: figtree, weight: 400, style: 'normal' },
    { name: 'Geist Mono', data: geist, weight: 400, style: 'normal' },
  ]);
  return fontsPromise;
}

// The "ct" mark from src/templates/sections/logo.ejs (mark variant), with the accent stem and ink fixed.
const monogram = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="104" height="104"><path d="M44 8 V44 A9 9 0 0 0 53 53 H56" fill="none" stroke="${COLOR.accent}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M34.61 46.61 A15 15 0 1 1 24 21 H56" fill="none" stroke="${COLOR.text}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const clip = (text, max) => {
  const t = String(text ?? '')
    .replace(/\s+/g, ' ')
    .trim();
  return t.length > max ? t.slice(0, max - 1).trimEnd() + '…' : t;
};

const el = (type, style, children) => ({ type, props: { style: { display: 'flex', ...style }, children } });

function tree({ title, summary, path }) {
  const t = clip(title, 110);
  const titleSize = t.length > 80 ? 52 : t.length > 50 ? 64 : t.length > 24 ? 76 : 92;
  const shown = path === '/' ? 'codesthings.com' : `codesthings.com${path}`;
  return el(
    'div',
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 72,
      boxSizing: 'border-box',
      background: COLOR.bg,
      color: COLOR.text,
    },
    [
      {
        type: 'img',
        props: {
          src: `data:image/svg+xml;base64,${Buffer.from(monogram).toString('base64')}`,
          width: 104,
          height: 104,
        },
      },
      el('div', { flexDirection: 'column', gap: 28, width: OG_WIDTH - 144 }, [
        el(
          'div',
          {
            fontFamily: 'Bricolage Grotesque',
            fontWeight: 700,
            fontSize: titleSize,
            lineHeight: 1.08,
            letterSpacing: -1,
          },
          t,
        ),
        el('div', { fontFamily: 'Figtree', fontSize: 34, lineHeight: 1.35, color: COLOR.muted }, clip(summary, 150)),
      ]),
      el('div', { fontFamily: 'Geist Mono', fontSize: 28, color: COLOR.accent }, clip(shown, 80)),
    ],
  );
}

export async function renderOgCard({ title, summary, path }) {
  const svg = await satori(tree({ title, summary, path }), {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: await loadFonts(),
  });
  return Buffer.from(new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng());
}

// Renders through a content-addressed cache so unchanged cards are not redrawn on rebuild.
export async function cachedOgCard(card, cacheDir) {
  const key = createHash('sha256')
    .update(JSON.stringify([OG_VERSION, card.title, card.summary, card.path]))
    .digest('hex')
    .slice(0, 24);
  const file = resolve(cacheDir, `${key}.png`);
  try {
    return await readFile(file);
  } catch {
    const png = await renderOgCard(card);
    await mkdir(cacheDir, { recursive: true });
    await writeFile(file, png);
    return png;
  }
}
