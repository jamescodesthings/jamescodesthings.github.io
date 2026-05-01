import Debug from 'debug';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';
import {
  readFile,
  readJson,
  writeFile,
  mkdirp,
  rmrf,
  cpDir,
  exists,
  ls,
  renderTemplate,
  formatDate,
  renderBlogPost,
} from './utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const debug = Debug('codesthings:index');
debug.enabled = true;

async function build() {
  const buildStart = Date.now();
  debug(`Build started at ${new Date(buildStart).toLocaleTimeString()}`);

  const outputDir = resolve(root, config.outputDir);
  const data = await loadData();
  const blogPosts = await getBlogPosts();

  await cleanAndCreateOutputDir(outputDir);
  await copyAssets(outputDir);
  await renderIndex(data, blogPosts, outputDir);
  await render404(outputDir);
  await renderBlogPosts(outputDir);

  const buildEnd = Date.now();
  debug(
    `Build Complete at ${new Date(buildEnd).toLocaleTimeString()} (${((buildEnd - buildStart) / 1000).toFixed(2)}s)\n`,
  );
}

async function cleanAndCreateOutputDir(outputDir) {
  debug(`Outputting to ${outputDir}`);
  await rmrf(outputDir);
  await mkdirp(outputDir);
}

async function renderIndex(data, blogPosts, outputDir) {
  debug('Rendering index.html');
  const indexTemplatePath = resolve(root, config.templateDir, 'index.ejs');
  const html = await renderTemplate(indexTemplatePath, {
    ...data,
    formatDate,
    blogPosts,
  });

  await writeFile(`${outputDir}/index.html`, html);
}

async function loadData() {
  debug('Loading data');
  const dataDir = resolve(root, config.dataDir);
  const [profile, experience, skills, education, projects, sidebar, coverLetter, socials] = await Promise.all([
    readJson(`${dataDir}/profile.json`),
    readJson(`${dataDir}/experience.json`),
    readJson(`${dataDir}/skills.json`),
    readJson(`${dataDir}/education.json`),
    readJson(`${dataDir}/projects.json`),
    readJson(`${dataDir}/sidebar.json`),
    readJson(`${dataDir}/cover-letter.json`),
    readJson(`${dataDir}/socials.json`),
  ]);

  return { profile, experience, skills, education, projects, sidebar, coverLetter, socials };
}

async function copyAssets(outputDir) {
  debug(`Copying assets to: ${outputDir}`);
  await cpDir(resolve(root, config.cssDir), `${outputDir}/css`);
  await cpDir(resolve(root, config.jsDir), `${outputDir}/js`);
  await cpDir(resolve(root, config.assetsDir), `${outputDir}/assets`);
}

async function getBlogPosts() {
  debug('Getting blog data');
  const blogDir = resolve(root, config.dataDir, 'blog');
  if (!(await exists(blogDir))) {
    debug('No blogs found');
    return [];
  }

  const files = (await ls(blogDir)).filter(f => f.endsWith('.md'));
  const posts = [];
  for (const file of files) {
    const slug = basename(file, '.md');
    const markdown = await readFile(resolve(blogDir, file));
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug;
    const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
    const date = dateMatch ? dateMatch[1] : '';
    posts.unshift({ slug, title, date });
  }
  return posts;
}

async function render404(outputDir) {
  const notFoundTemplatePath = resolve(root, config.templateDir, '404.ejs');
  if (await exists(notFoundTemplatePath)) {
    debug(`Rendering ${outputDir}/404.html`);
    const notFoundHtml = await renderTemplate(notFoundTemplatePath, {});
    await writeFile(`${outputDir}/404.html`, notFoundHtml);
  } else {
    throw new Error('404 template not found');
  }
}

async function renderBlogPosts(outputDir) {
  debug('Building blog posts');
  const blogDir = resolve(root, config.blogDir);
  if (!(await exists(blogDir))) {
    throw new Error('Blog directory not found');
  }

  const files = (await ls(blogDir)).filter(f => f.endsWith('.md'));
  if (files.length === 0) {
    throw new Error('No blog posts found');
  }

  await mkdirp(`${outputDir}/blog`);

  for (const file of files) {
    await renderBlogPost(file);
  }
}

await build();
