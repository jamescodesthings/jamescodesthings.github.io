import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateProject, validatePhoto } from '../src/lib/validate.js';
import { loadData } from '../src/lib/data.js';

const project = (over = {}) => ({
  title: 'T',
  lane: 'work',
  summary: 'A short summary.',
  stack: ['Node'],
  links: [{ label: 'Site', url: 'https://example.com/', icon: 'web' }],
  featured: true,
  order: 1,
  ...over,
});

test('a valid project passes and is returned', () => {
  const p = project();
  assert.equal(validateProject(p, 'a.json'), p);
});

test('optional keys may be null or absent', () => {
  validateProject(project({ date: null, image: null, stat: 'x' }), 'a.json');
  validateProject(project({ date: '2026-07' }), 'a.json');
});

for (const key of ['title', 'lane', 'summary', 'stack', 'links', 'featured', 'order']) {
  test(`missing ${key} throws naming file and key`, () => {
    const p = project();
    delete p[key];
    assert.throws(
      () => validateProject(p, 'foo.json'),
      e => e.message.includes('foo.json') && e.message.includes(key),
    );
  });
}

test('lane photo throws', () => {
  assert.throws(() => validateProject(project({ lane: 'photo' }), 'foo.json'), /foo\.json.*lane/);
});

test('javascript: url throws', () => {
  const links = [{ label: 'x', url: 'javascript:x', icon: 'web' }];
  assert.throws(() => validateProject(project({ links }), 'foo.json'), /foo\.json.*url/);
});

test('root-absolute site paths pass; other schemes throw', () => {
  validateProject(project({ links: [{ label: 'x', url: '/blog/a.html', icon: 'blog' }] }), 'foo.json');
  assert.throws(
    () => validateProject(project({ links: [{ label: 'x', url: '//evil.com', icon: 'web' }] }), 'foo.json'),
    /url/,
  );
  const links = [{ label: 'x', url: 'ftp://a.b', icon: 'web' }];
  assert.throws(() => validateProject(project({ links }), 'foo.json'), /url/);
});

test('summary of 110 passes, 111 throws', () => {
  validateProject(project({ summary: 'a'.repeat(110) }), 'foo.json');
  assert.throws(() => validateProject(project({ summary: 'a'.repeat(111) }), 'foo.json'), /foo\.json.*summary/);
});

test('stack must have 1 to 5 items', () => {
  assert.throws(() => validateProject(project({ stack: [] }), 'foo.json'), /stack/);
  assert.throws(() => validateProject(project({ stack: ['1', '2', '3', '4', '5', '6'] }), 'foo.json'), /stack/);
});

test('bad date throws', () => {
  assert.throws(() => validateProject(project({ date: '2026' }), 'foo.json'), /date/);
});

test('photo needs src, alt and order', () => {
  const ph = { src: 'a.jpg', alt: 'A tent', order: 1 };
  assert.equal(validatePhoto(ph, 'p.json'), ph);
  assert.throws(() => validatePhoto({ ...ph, alt: '' }, 'p.json'), /p\.json.*alt/);
  assert.throws(() => validatePhoto({ ...ph, src: undefined }, 'p.json'), /src/);
  assert.throws(() => validatePhoto({ ...ph, order: undefined }, 'p.json'), /order/);
});

async function fixture(extra = {}) {
  const root = await mkdtemp(join(tmpdir(), 'ct-'));
  const d = join(root, 'data');
  await mkdir(join(d, 'projects'), { recursive: true });
  await mkdir(join(d, 'photos'), { recursive: true });
  await mkdir(join(d, 'blog'), { recursive: true });
  for (const f of ['site', 'now', 'uses', 'links']) await writeFile(join(d, `${f}.json`), f === 'links' ? '[]' : '{}');
  await writeFile(join(d, 'projects', 'b.json'), JSON.stringify(project({ title: 'B', order: 2 })));
  await writeFile(join(d, 'projects', 'a.json'), JSON.stringify(project({ title: 'A', order: 1 })));
  await writeFile(join(d, 'projects', 'm.json'), JSON.stringify(project({ title: 'M', lane: 'make', order: 1 })));
  await writeFile(join(d, 'photos', 'z.json'), JSON.stringify({ src: 'z.jpg', alt: 'z', order: 2 }));
  await writeFile(join(d, 'photos', 'y.json'), JSON.stringify({ src: 'y.jpg', alt: 'y', order: 1 }));
  await writeFile(join(d, 'blog', '2026-01-01-old.md'), '---\nsummary: S\n---\n# Old\n\nx\n');
  await writeFile(join(d, 'blog', '2026-02-01-new.md'), '# New\n\nx\n');
  for (const [p, c] of Object.entries(extra)) await writeFile(join(d, p), c);
  return root;
}

test('loadData sorts projects by order within lane, photos by order, posts newest first', async () => {
  const data = await loadData(await fixture());
  assert.deepEqual(
    data.projects.work.map(p => p.title),
    ['A', 'B'],
  );
  assert.deepEqual(
    data.projects.make.map(p => p.title),
    ['M'],
  );
  assert.deepEqual(
    data.photos.map(p => p.alt),
    ['y', 'z'],
  );
  assert.deepEqual(
    data.posts.map(p => p.slug),
    ['2026-02-01-new', '2026-01-01-old'],
  );
  assert.equal(data.posts[0].summary, '');
  assert.equal(data.posts[1].summary, 'S');
  assert.equal(data.posts[1].date, '2026-01-01');
});

test('loadData names the bad project file', async () => {
  const root = await fixture({ 'projects/bad.json': JSON.stringify(project({ lane: 'photo' })) });
  await assert.rejects(loadData(root), /bad\.json.*lane/);
});
