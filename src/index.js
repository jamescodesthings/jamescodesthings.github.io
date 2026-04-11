import Debug from 'debug';
import ejs from 'ejs';
import showdown from 'showdown';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';
import { readFile, readJson, writeFile, mkdirp, rmrf, cpDir, exists, ls } from './utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const srcRoot = __dirname;

const debug = Debug('codesthings:build');
debug.enabled = true;

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

async function loadData() {
  const dataDir = resolve(srcRoot, config.dataDir);
  const [profile, experience, skills, education, projects, sidebar, coverLetter] = await Promise.all([
    readJson(`${dataDir}/profile.json`),
    readJson(`${dataDir}/experience.json`),
    readJson(`${dataDir}/skills.json`),
    readJson(`${dataDir}/education.json`),
    readJson(`${dataDir}/projects.json`),
    readJson(`${dataDir}/sidebar.json`),
    readJson(`${dataDir}/cover-letter.json`),
  ]);

  return { profile, experience, skills, education, projects, sidebar, coverLetter };
}

async function renderTemplate(templatePath, data) {
  const template = await readFile(templatePath);
  return ejs.render(template, data, {
    filename: templatePath,
    views: [resolve(srcRoot, config.templateDir)],
  });
}

async function copyAssets(outputDir) {
  // Copy CSS
  await cpDir(resolve(srcRoot, config.cssDir), `${outputDir}/css`);

  // Copy JS
  await cpDir(resolve(srcRoot, 'js'), `${outputDir}/js`);

  // Copy root assets directory (icons, images, gifs, logos)
  const assetsSrc = resolve(srcRoot, config.assetsDir);
  if (await exists(assetsSrc)) {
    await cpDir(assetsSrc, `${outputDir}/assets`);
  }
}

async function getBlogPosts() {
  const blogDir = resolve(srcRoot, config.dataDir, 'blog');
  if (!(await exists(blogDir))) return [];

  const files = (await ls(blogDir)).filter(f => f.endsWith('.md'));
  const posts = [];
  for (const file of files) {
    const slug = basename(file, '.md');
    const markdown = await readFile(resolve(blogDir, file));
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug;
    posts.push({ slug, title });
  }
  return posts;
}

async function build() {
  debug('Starting build...');

  const outputDir = resolve(srcRoot, config.outputDir);

  // Load all data
  debug('Loading data...');
  const data = await loadData();

  // Collect blog post metadata
  const blogPosts = await getBlogPosts();

  // Render the main template
  debug('Rendering templates...');
  const templatePath = resolve(srcRoot, config.templateDir, 'index.ejs');
  const html = await renderTemplate(templatePath, {
    ...data,
    formatDate,
    blogPosts,
  });

  // Clean and create output directory
  debug('Writing output...');
  await rmrf(outputDir);
  await mkdirp(outputDir);

  // Write index.html
  await writeFile(`${outputDir}/index.html`, html);

  // Copy static assets
  debug('Copying assets...');
  await copyAssets(outputDir);

  // Build blog posts
  debug('Building blog posts...');
  await buildBlog(outputDir);

  debug('Build complete!');
}

async function buildBlog(outputDir) {
  const blogDir = resolve(srcRoot, config.dataDir, 'blog');
  if (!(await exists(blogDir))) return;

  const files = (await ls(blogDir)).filter(f => f.endsWith('.md'));
  if (files.length === 0) return;

  const converter = new showdown.Converter({ tables: true, ghCodeBlocks: true });
  const blogTemplatePath = resolve(srcRoot, config.templateDir, 'blog.ejs');
  const blogTemplate = await readFile(blogTemplatePath);

  for (const file of files) {
    const slug = basename(file, '.md');
    const markdown = await readFile(resolve(blogDir, file));
    const content = converter.makeHtml(markdown);

    // Extract title from first h1
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug;

    const html = ejs.render(
      blogTemplate,
      { title, content },
      {
        filename: blogTemplatePath,
        views: [resolve(srcRoot, config.templateDir)],
      },
    );

    await mkdirp(`${outputDir}/blog`);
    await writeFile(`${outputDir}/blog/${slug}.html`, html);
    debug(`  Blog: ${slug}`);
  }
}

await build();
