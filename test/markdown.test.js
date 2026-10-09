import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { createRenderer } from '../src/lib/markdown.js';
import { processHtmlImages } from '../src/lib/images.js';

let r;
before(async () => {
  r = await createRenderer();
});

test('headings get stable slug ids and a duplicate gets -1', () => {
  const { html } = r.render('## Set up\n\ntext\n\n## Set up\n\n## Hello, World!\n');
  assert.match(html, /<h2 id="set-up">/);
  assert.match(html, /<h2 id="set-up-1">/);
  assert.match(html, /<h2 id="hello-world">/);
});

test('headings holds only h2 and h3, with level, id and text', () => {
  const { headings } = r.render('# Top\n\n## A\n\n### B\n\n#### C\n\n## D\n');
  assert.deepEqual(headings, [
    { level: 2, id: 'a', text: 'A' },
    { level: 3, id: 'b', text: 'B' },
    { level: 2, id: 'd', text: 'D' },
  ]);
});

test('headings carry an anchor link with an accessible name', () => {
  const { html } = r.render('## Power on\n');
  assert.match(html, /<a class="heading-anchor" href="#power-on"/);
  assert.match(html, /Link to section: Power on/);
});

test('a fenced js block gets Shiki markup coloured by theme variables only', async () => {
  const { html } = r.render('```js\nconst a = "x"; // hi\n```\n');
  assert.match(html, /class="shiki/);
  assert.match(html, /color:var\(--shiki-token-keyword\)/);
  assert.match(html, /color:var\(--shiki-token-string-expression\)/);
  assert.doesNotMatch(html, /#[0-9a-f]{6}/i, 'no literal colours in the markup');
  // Both modes: every variable the markup uses is defined from --code-* tokens for dark and light.
  const tokens = await readFile(new URL('../src/css/tokens.css', import.meta.url), 'utf8');
  const code = await readFile(new URL('../src/css/components/code.css', import.meta.url), 'utf8');
  for (const name of ['keyword', 'string', 'constant', 'function', 'comment']) {
    assert.match(code, new RegExp(`--shiki-token-${name}:\\s*var\\(--code-`));
    const count = (tokens.match(new RegExp(`--code-${name}:`, 'g')) || []).length;
    assert.equal(count, 2, `--code-${name} must be defined for dark and light`);
  }
});

test('an unknown or missing language still renders as a plain block', () => {
  const a = r.render('```\nplain\n```\n').html;
  const b = r.render('```klingon\nplain\n```\n').html;
  assert.match(a, /<pre[^>]*data-copy/);
  assert.match(b, /<pre[^>]*data-copy/);
});

test('a pre gets data-copy and is keyboard focusable', () => {
  const { html } = r.render('```sh\nls\n```\n');
  assert.match(html, /<pre[^>]*\sdata-copy/);
  assert.match(html, /<pre[^>]*tabindex="0"/);
  assert.match(html, /class="code-block"/);
});

test('> [!TIP] renders a tip callout with the tip icon', () => {
  const { html } = r.render('> [!TIP]\n> Save often.\n');
  assert.match(html, /<aside class="callout callout--tip"/);
  assert.match(html, /<svg[^>]*class="icon[^"]*"[\s\S]*<\/svg>/);
  assert.match(html, /Save often\./);
  assert.doesNotMatch(html, /\[!TIP\]/);
});

test('NOTE and WARNING callouts use their own variant', () => {
  assert.match(r.render('> [!NOTE]\n> x\n').html, /callout--note/);
  assert.match(r.render('> [!WARNING]\n> x\n').html, /callout--warning/);
  assert.match(r.render('> plain quote\n').html, /<blockquote>/);
});

test('the leading title heading is stripped so the template h1 is the only one', () => {
  const { html } = r.render('# Title\n\nintro\n\n## Section\n');
  assert.doesNotMatch(html, /<h1/);
  assert.match(html, /intro/);
});

test('a title heading after a cover image is stripped too', () => {
  const { html } = r.render('![c](x.png)\n\n# Title\n\n## Section\n');
  assert.doesNotMatch(html, /<h1/);
});

test('a # comment inside a code fence is not taken for the title', () => {
  const { html } = r.render('```sh\n# comment\n```\n');
  assert.match(html, /# comment/);
});

test('images lists every img src, raw', () => {
  const { images } = r.render('![a](../assets/x.png)\n\n<img src="/assets/y.png" alt="y">\n');
  assert.deepEqual(images, ['../assets/x.png', '/assets/y.png']);
});

test('a YouTube iframe becomes a facade with no third-party request', () => {
  const md =
    '<iframe class="yt" src="https://www.youtube-nocookie.com/embed/A72Jcj_3LAM?si=abc" title="Demo video" allowfullscreen></iframe>\n';
  const { html } = r.render(md);
  assert.doesNotMatch(html, /<iframe/);
  assert.doesNotMatch(html, /ytimg/);
  assert.match(html, /data-yt-id="A72Jcj_3LAM"/);
  assert.match(html, /href="https:\/\/www\.youtube\.com\/watch\?v=A72Jcj_3LAM"/);
  assert.match(html, /Demo video/);
});

test('YouTube is the only embed that is rewritten', () => {
  const { html } = r.render('<iframe src="https://example.com/x" title="x"></iframe>\n');
  assert.match(html, /<iframe/);
});

// Relative images resolve against the post through the image post-pass, and a missing one names the post.
async function fixture() {
  const tmp = await mkdtemp(resolve(tmpdir(), 'markdown-test-'));
  const assetsRoot = resolve(tmp, 'assets');
  await mkdir(resolve(assetsRoot, 'blog-images'), { recursive: true });
  await sharp({ create: { width: 800, height: 400, channels: 3, background: '#c85' } })
    .png()
    .toFile(resolve(assetsRoot, 'blog-images/x.png'));
  return { assetsRoot, outDir: resolve(tmp, 'out'), cacheDir: resolve(tmp, 'cache') };
}

test('relative image ../assets/x.png resolves against the post', async () => {
  const dirs = await fixture();
  const { html } = await r.renderPost('![x](../assets/blog-images/x.png)\n', { slug: 'p', ...dirs });
  assert.match(html, /<picture>/);
  assert.match(html, /width="800" height="400"/);
  // The same reference, post-passed directly, lands on the same file.
  const direct = await processHtmlImages('<img src="../assets/blog-images/x.png" alt="">', { slug: 'p', ...dirs });
  assert.match(direct, /<picture>/);
});

test('a missing image throws with the post slug and the path', async () => {
  const dirs = await fixture();
  await assert.rejects(
    r.renderPost('![x](../assets/blog-images/nope.png)\n', { slug: '2026-01-01-demo', ...dirs }),
    err => err.message.includes('2026-01-01-demo') && err.message.includes('nope.png'),
  );
});

test('the copy button keeps a static label and the live region sits beside it', () => {
  const { html } = r.render('```sh\nls\n```\n');
  const button = html.match(/<button[\s\S]*?<\/button>/)[0];
  assert.match(button, /aria-label="Copy code"/);
  assert.doesNotMatch(button, /role="status"/);
  assert.match(html, /<\/button><span class="code-block__status visually-hidden" role="status"><\/span>/);
});
