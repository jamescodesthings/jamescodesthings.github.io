import Debug from 'debug';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import config from './config.js';
import {
  readJson,
  writeFile,
  mkdirp,
  rmrf,
  cpDir,
  exists,
  ls,
  readFile,
  renderTemplate,
  formatDate,
  markdownToHtml,
} from './utils.js';
import { parsePost } from './lib/frontmatter.js';
import { bundleCss } from './lib/css.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outputDir = resolve(root, config.outputDir);

const debug = Debug('codesthings:index');
debug.enabled = true;

export async function loadData() {
  const links = await readJson(resolve(root, config.dataDir, 'links.json'));
  const blogPosts = await getBlogPosts();
  return { links, blogPosts };
}

// The single page-render entry point: `template` is relative to the template dir, `outPath` to the output dir.
export async function renderPage(template, data, outPath) {
  debug(`Rendering ${outPath}`);
  const html = await renderTemplate(resolve(root, config.templateDir, template), data);
  await writeFile(resolve(outputDir, outPath), html);
}

export async function buildAssets() {
  await rmrf(outputDir);
  await mkdirp(outputDir);
  await writeFile(`${outputDir}/css/styles.css`, await bundleCss(resolve(root, config.cssDir)));
  await cpDir(resolve(root, config.jsDir), `${outputDir}/js`);
  await cpDir(resolve(root, config.assetsDir), `${outputDir}/assets`);
}

export async function buildPages(data) {
  const { links, blogPosts } = data;
  if (!(await exists(resolve(root, config.templateDir, '404.ejs')))) throw new Error('404 template not found');
  if (blogPosts.length === 0) throw new Error('No blog posts found');

  await renderPage('index.ejs', { links, blogPosts, formatDate }, 'index.html');
  await renderPage('404.ejs', {}, '404.html');
  await renderPage('privacy-notice.ejs', {}, 'privacy-notice.html');
  await renderPage('about-cookies.ejs', {}, 'about-cookies.html');
  for (const post of blogPosts) {
    debug(` - Blog: ${post.title} (${post.slug})`);
    await renderPage(
      'blog.ejs',
      { title: post.title, summary: post.summary, content: markdownToHtml(post.body) },
      `blog/${post.slug}.html`,
    );
  }
}

async function build() {
  const buildStart = Date.now();
  debug(`Build started at ${new Date(buildStart).toLocaleTimeString()}`);

  const data = await loadData();
  await buildAssets();
  await buildPages(data);

  const buildEnd = Date.now();
  debug(`Build Complete (${((buildEnd - buildStart) / 1000).toFixed(2)}s)\n`);
}

async function getBlogPosts() {
  const blogDir = resolve(root, config.dataDir, 'blog');
  if (!(await exists(blogDir))) return [];

  const files = (await ls(blogDir)).filter(f => f.endsWith('.md'));
  const posts = [];
  for (const file of files) {
    const slug = basename(file, '.md');
    const { meta, title, body } = parsePost(await readFile(resolve(blogDir, file)));
    const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
    const date = dateMatch ? dateMatch[1] : '';
    posts.unshift({ slug, title: title || slug, summary: meta.summary || '', body, date });
  }
  return posts;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await build();
}
