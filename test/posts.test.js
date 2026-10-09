import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { loadData } from '../src/lib/data.js';

let posts;
let drafts;

before(async () => {
  const root = await mkdtemp(resolve(tmpdir(), 'posts-test-'));
  const data = resolve(root, 'data');
  await mkdir(resolve(data, 'blog'), { recursive: true });
  for (const name of ['site', 'now', 'uses', 'links'])
    await writeFile(resolve(data, `${name}.json`), name === 'uses' ? '{"groups":[]}' : '{}');
  await writeFile(
    resolve(data, 'blog/2026-01-01-first.md'),
    '---\nsummary: First one\ncover: /assets/blog-images/c.png\ntags: pi, hardware\nupdated: 2026-02-01\n---\n\n# First\n\n## Part\n\ntext\n',
  );
  await writeFile(resolve(data, 'blog/2026-02-01-bare.md'), '# Bare\n\nJust a paragraph, no front matter.\n');
  await writeFile(resolve(data, 'blog/2026-03-01-third.md'), '---\ntitle: ignored\n---\n\n# Third\n\n### Deep\n');
  await writeFile(
    resolve(data, 'blog/2026-04-01-wip.md'),
    '---\nsummary: Not ready\ndraft: true\n---\n\n# Work in progress\n\ntext\n',
  );
  await writeFile(resolve(data, 'blog/2026-04-02-not-a-draft.md'), '---\ndraft: false\n---\n\n# Live\n\ntext\n');
  const loaded = await loadData(root);
  posts = loaded.posts;
  drafts = loaded.drafts;
});

test('posts are newest first with prev (older) and next (newer) links', () => {
  assert.deepEqual(
    posts.map(p => p.slug),
    ['2026-04-02-not-a-draft', '2026-03-01-third', '2026-02-01-bare', '2026-01-01-first'],
  );
  assert.equal(posts[0].next, null);
  assert.deepEqual(posts[0].prev, { slug: '2026-03-01-third', title: 'Third' });
  assert.deepEqual(posts[2].next, { slug: '2026-03-01-third', title: 'Third' });
  assert.deepEqual(posts[2].prev, { slug: '2026-01-01-first', title: 'First' });
  assert.equal(posts[3].prev, null);
});

test('a post carries the full model', () => {
  const p = posts[3];
  assert.equal(p.title, 'First');
  assert.equal(p.summary, 'First one');
  assert.equal(p.date, '2026-01-01');
  assert.equal(p.cover, '/assets/blog-images/c.png');
  assert.deepEqual(p.tags, ['pi', 'hardware']);
  assert.equal(p.updated, '2026-02-01');
  assert.deepEqual(p.headings, [{ level: 2, id: 'part', text: 'Part' }]);
  assert.equal(p.readingTime, 1);
  assert.match(p.html, /<h2 id="part">/);
  assert.doesNotMatch(p.html, /<h1/);
});

test('a post without front matter or summary still builds, with an empty summary', () => {
  const p = posts[2];
  assert.equal(p.title, 'Bare');
  assert.equal(p.summary, '');
  assert.equal(p.cover, null);
  assert.deepEqual(p.tags, []);
  assert.match(p.html, /Just a paragraph/);
});

test('front matter without a summary leaves it empty', () => {
  assert.equal(posts[1].summary, '');
  assert.deepEqual(posts[1].headings, [{ level: 3, id: 'deep', text: 'Deep' }]);
});

test("a draft stays out of posts and out of every other post's prev and next", () => {
  assert.ok(!posts.some(p => p.slug === '2026-04-01-wip'));
  assert.ok(posts.every(p => p.draft === false));
  for (const p of posts) {
    assert.notEqual(p.prev && p.prev.slug, '2026-04-01-wip');
    assert.notEqual(p.next && p.next.slug, '2026-04-01-wip');
  }
});

test('drafts load separately so the page can still be rendered for preview', () => {
  assert.deepEqual(
    drafts.map(p => p.slug),
    ['2026-04-01-wip'],
  );
  assert.equal(drafts[0].draft, true);
  assert.equal(drafts[0].title, 'Work in progress');
  assert.match(drafts[0].html, /text/);
});
