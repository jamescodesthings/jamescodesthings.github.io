import Debug from 'debug';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import config from './config.js';
import { writeFile, mkdirp, rmrf, cpDir, exists, renderTemplate, formatDate, markdownToHtml } from './utils.js';
import { loadData as loadSiteData } from './lib/data.js';
import { bundleCss } from './lib/css.js';
import { getBuildStamp } from './lib/buildstamp.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outputDir = resolve(root, config.outputDir);

const debug = Debug('codesthings:index');
debug.enabled = true;

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
  const { links, posts: blogPosts, site, now, projects, photos } = data;
  if (!(await exists(resolve(root, config.templateDir, '404.ejs')))) throw new Error('404 template not found');
  if (blogPosts.length === 0) throw new Error('No blog posts found');

  const stamp = getBuildStamp({ gitDir: resolve(root, '.git') });
  const common = { links, stamp };
  const index = {
    title: 'James Macmillan - codesthings.com',
    description: 'Software engineer portfolio - James Macmillan builds things for the web.',
    path: '/',
  };

  await renderPage(
    'index.ejs',
    { ...common, ...index, site, now, projects, photos, blogPosts, formatDate },
    'index.html',
  );
  await renderPage(
    'projects.ejs',
    {
      ...common,
      projects,
      title: 'Projects - codesthings.com',
      description: 'Software and maker projects by James Macmillan, newest first.',
      path: '/projects/',
    },
    'projects/index.html',
  );
  await renderPage(
    '404.ejs',
    { ...common, title: '404 - codesthings.com', path: '/404.html', noindex: true },
    '404.html',
  );
  await renderPage(
    'privacy-notice.ejs',
    { ...common, title: 'Privacy Notice - codesthings.com', path: '/privacy-notice' },
    'privacy-notice.html',
  );
  await renderPage(
    'about-cookies.ejs',
    { ...common, title: 'About Cookies - codesthings.com', path: '/about-cookies' },
    'about-cookies.html',
  );
  for (const post of blogPosts) {
    debug(` - Blog: ${post.title} (${post.slug})`);
    await renderPage(
      'blog.ejs',
      {
        ...common,
        title: `${post.title} - codesthings.com`,
        description: post.summary,
        path: `/blog/${post.slug}.html`,
        type: 'article',
        summary: post.summary,
        content: markdownToHtml(post.body),
      },
      `blog/${post.slug}.html`,
    );
  }
}

async function build() {
  const buildStart = Date.now();
  debug(`Build started at ${new Date(buildStart).toLocaleTimeString()}`);

  const data = await loadSiteData(root);
  await buildAssets();
  await buildPages(data);

  const buildEnd = Date.now();
  debug(`Build Complete (${((buildEnd - buildStart) / 1000).toFixed(2)}s)\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await build();
}
