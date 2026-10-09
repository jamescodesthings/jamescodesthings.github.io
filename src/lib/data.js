import { resolve, basename } from 'path';
import config from '../config.js';
import { readJson, readFile, ls, exists } from '../utils.js';
import { parsePost } from './frontmatter.js';
import { validateProject, validatePhoto, validateUses } from './validate.js';
import { createRenderer } from './markdown.js';
import { readingTime } from './reading.js';

async function jsonFiles(dir) {
  if (!(await exists(dir))) return [];
  return (await ls(dir)).filter(f => f.endsWith('.json')).sort();
}

async function loadAll(dir, validate) {
  const items = [];
  for (const file of await jsonFiles(dir)) {
    items.push(validate(await readJson(resolve(dir, file)), `${basename(dir)}/${file}`));
  }
  return items;
}

const byOrder = (a, b) => a.order - b.order;

const tagList = value =>
  (value || '')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

const link = post => (post ? { slug: post.slug, title: post.title } : null);

// Returns {posts, drafts}, each newest first; `draft: true` in front matter puts a post in drafts.
// A post needs no front matter: summary is '' and cover null when absent.
// `html` is the rendered body without its title heading; image references are raw unless `images` is given. prev is the older post, next the newer one.
async function loadPosts(blogDir, images) {
  if (!(await exists(blogDir))) return { posts: [], drafts: [] };
  const renderer = await createRenderer();
  const files = (await ls(blogDir)).filter(f => f.endsWith('.md')).sort();
  const posts = [];
  for (const file of files) {
    const slug = basename(file, '.md');
    const { meta, title, body } = parsePost(await readFile(resolve(blogDir, file)));
    const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
    // With `images` ({assetsRoot, outDir, cacheDir}) the html also goes through the image pipeline.
    const { html, headings } = images ? await renderer.renderPost(body, { slug, ...images }) : renderer.render(body);
    posts.push({
      slug,
      title: title || slug,
      summary: meta.summary || '',
      draft: meta.draft === 'true',
      date: dateMatch ? dateMatch[1] : '',
      updated: meta.updated || '',
      cover: meta.cover || null,
      coverAlt: meta.coverAlt || '',
      tags: tagList(meta.tags),
      html,
      headings,
      readingTime: readingTime(body),
    });
  }
  posts.reverse();
  // Drafts render a page (for preview) but are not part of the published sequence.
  const drafts = posts.filter(post => post.draft);
  const published = posts.filter(post => !post.draft);
  published.forEach((post, i) => {
    post.next = link(published[i - 1]);
    post.prev = link(published[i + 1]);
  });
  drafts.forEach(post => {
    post.next = null;
    post.prev = null;
  });
  return { posts: published, drafts };
}

// Reads and validates everything under <root>/data. A bad project or photo file throws, naming the file.
export async function loadData(root, { images } = {}) {
  const dir = resolve(root, config.dataDir);
  const [site, now, rawUses, links] = await Promise.all(
    ['site', 'now', 'uses', 'links'].map(name => readJson(resolve(dir, `${name}.json`))),
  );
  const uses = validateUses(rawUses, 'uses.json');
  const all = await loadAll(resolve(dir, 'projects'), validateProject);
  const projects = {
    work: all.filter(p => p.lane === 'work').sort(byOrder),
    make: all.filter(p => p.lane === 'make').sort(byOrder),
  };
  const photos = (await loadAll(resolve(dir, 'photos'), validatePhoto)).sort(byOrder);
  const { posts, drafts } = await loadPosts(resolve(dir, 'blog'), images);
  return { site, now, uses, links, projects, photos, posts, drafts };
}
