import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { atomFeed, sitemap, robots, pagePathFor } from '../src/lib/feeds.js';

const site = { url: 'https://codesthings.com', tagline: 'Tagline' };
const posts = [
  {
    slug: 'new',
    title: 'Fish & Chips',
    summary: 'A summary',
    date: '2026-03-01',
    html: '<p>Hi <a href="/blog/old.html">old</a></p><picture><source srcset="/assets/img/a-480.avif 480w, /assets/img/a-960.avif 960w" type="image/avif"><img src="/assets/img/a.jpg"></picture>',
  },
  { slug: 'old', title: 'Old', summary: '', date: '2026-01-01', html: `<p>${'word '.repeat(100)}</p><p>second</p>` },
];

test('feed has Atom root, one entry per post, and is well-formed', async () => {
  const xml = atomFeed(posts, site);
  assert.match(xml, /<feed xmlns="http:\/\/www\.w3\.org\/2005\/Atom">/);
  assert.equal((xml.match(/<entry>/g) || []).length, 2);
  assert.match(xml, /<updated>2026-03-01T00:00:00Z<\/updated>\n {2}<author>/);
  const x = spawnSync('xmllint', ['--version']);
  if (x.error) return;
  const file = resolve(await mkdtemp(resolve(tmpdir(), 'feed-')), 'feed.xml');
  await writeFile(file, xml);
  const r = spawnSync('xmllint', ['--noout', file]);
  assert.equal(r.status, 0, String(r.stderr));
});

test('entry links are absolute and content urls are absolutised', () => {
  const xml = atomFeed(posts, site);
  assert.match(xml, /<link href="https:\/\/codesthings\.com\/blog\/new\.html"\/>/);
  assert.match(xml, /href=&quot;https:\/\/codesthings\.com\/blog\/old\.html&quot;/);
  assert.match(xml, /src=&quot;https:\/\/codesthings\.com\/assets\/img\/a\.jpg&quot;/);
  assert.match(xml, /https:\/\/codesthings\.com\/assets\/img\/a-960\.avif 960w/);
  assert.doesNotMatch(xml, /&quot;\/assets/);
});

test('fragment links resolve against the entry url and the video facade becomes a link', () => {
  const facade =
    '<div class="yt-facade" data-yt-facade data-yt-id="abc" data-yt-title="Demo &amp; more"><a class="yt-facade__link" href="https://www.youtube.com/watch?v=abc" rel="noopener"><span class="yt-facade__play">x</span><span class="yt-facade__title">Demo &amp; more</span></a></div>';
  const xml = atomFeed(
    [{ slug: 's', title: 'T', summary: 'x', date: '2026-01-01', html: `<h2 id="a"><a href="#a">a</a></h2>${facade}` }],
    site,
  );
  assert.match(xml, /href=&quot;https:\/\/codesthings\.com\/blog\/s\.html#a&quot;/);
  assert.doesNotMatch(xml, /yt-facade|data-yt/);
  assert.match(xml, /Watch on YouTube: Demo &amp;amp; more/);
  assert.match(xml, /href=&quot;https:\/\/www\.youtube\.com\/watch\?v=abc&quot;/);
});

test('ampersand in a title is escaped', () => {
  assert.match(atomFeed(posts, site), /<title>Fish &amp; Chips<\/title>/);
});

test('missing summary falls back to first paragraph, max 200 chars', () => {
  const xml = atomFeed(posts, site);
  const m = /<id>https:\/\/codesthings\.com\/blog\/old\.html<\/id>[\s\S]*?<summary>([^<]*)<\/summary>/.exec(xml);
  assert.ok(m[1].length <= 200);
  assert.ok(m[1].startsWith('word word'));
  assert.doesNotMatch(m[1], /second/);
});

test('sitemap lists every path; robots allows all with sitemap url', () => {
  const xml = sitemap(['/', '/blog/', '/blog/new.html', '/privacy-notice'], site);
  for (const p of ['/', '/blog/', '/blog/new.html', '/privacy-notice'])
    assert.ok(xml.includes(`<loc>https://codesthings.com${p}</loc>`), p);
  const r = robots(site);
  assert.match(r, /User-agent: \*\nAllow: \//);
  assert.match(r, /Sitemap: https:\/\/codesthings\.com\/sitemap\.xml/);
});

test('pagePathFor maps written files to public paths and skips 404', () => {
  assert.equal(pagePathFor('index.html'), '/');
  assert.equal(pagePathFor('projects/index.html'), '/projects/');
  assert.equal(pagePathFor('blog/x.html'), '/blog/x.html');
  assert.equal(pagePathFor('privacy-notice.html'), '/privacy-notice');
  assert.equal(pagePathFor('404.html'), null);
});
