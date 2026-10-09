import { resolve, basename } from 'path';
import config from '../config.js';
import { readJson, readFile, ls, exists } from '../utils.js';
import { parsePost } from './frontmatter.js';
import { validateProject, validatePhoto } from './validate.js';

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

async function loadPosts(blogDir) {
  if (!(await exists(blogDir))) return [];
  const files = (await ls(blogDir)).filter(f => f.endsWith('.md')).sort();
  const posts = [];
  for (const file of files) {
    const slug = basename(file, '.md');
    const { meta, title, body } = parsePost(await readFile(resolve(blogDir, file)));
    const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
    posts.push({ slug, title: title || slug, summary: meta.summary || '', body, date: dateMatch ? dateMatch[1] : '' });
  }
  return posts.reverse(); // newest first
}

// Reads and validates everything under <root>/data. A bad project or photo file throws, naming the file.
export async function loadData(root) {
  const dir = resolve(root, config.dataDir);
  const [site, now, uses, links] = await Promise.all(
    ['site', 'now', 'uses', 'links'].map(name => readJson(resolve(dir, `${name}.json`))),
  );
  const all = await loadAll(resolve(dir, 'projects'), validateProject);
  const projects = {
    work: all.filter(p => p.lane === 'work').sort(byOrder),
    make: all.filter(p => p.lane === 'make').sort(byOrder),
  };
  const photos = (await loadAll(resolve(dir, 'photos'), validatePhoto)).sort(byOrder);
  const posts = await loadPosts(resolve(dir, 'blog'));
  return { site, now, uses, links, projects, photos, posts };
}
