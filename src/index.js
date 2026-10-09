import Debug from 'debug';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import config from './config.js';
import { writeFile, mkdirp, rmrf, cpDir, exists, renderTemplate, formatDate, formatLongDate } from './utils.js';
import { loadData as loadSiteData } from './lib/data.js';
import { bundleCss } from './lib/css.js';
import { getBuildStamp } from './lib/buildstamp.js';
import {
  processImage,
  pictureHtml,
  processHtmlImages,
  resolveAssetPath,
  resolvePhotoPath,
  PIPELINE_DIRS,
  POST_SIZES,
} from './lib/images.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outputDir = resolve(root, config.outputDir);
const assetsRoot = resolve(root, config.assetsDir);
// Processed images land here (URL /assets/img/...); the cache is keyed by source content.
const imageOutDir = resolve(outputDir, 'assets/img');
const imageCacheDir = resolve(root, '.cache/images');

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
  // blog-images/, photos/ and projects/ are not copied: only the images that something references are
  // processed (see processHtmlImages and withImage), into public/assets/img/.
  await cpDir(assetsRoot, `${outputDir}/assets`, entry => !PIPELINE_DIRS.includes(entry.name));
}

// Returns a copy of `item` with `imageData` (the processed image) when `item[key]` names an image under
// src/assets/. A missing file fails the build naming `label`.
async function withImage(item, key, label, resolveFn = resolveAssetPath) {
  if (!item[key]) return item;
  const abs = resolveFn(item[key], assetsRoot);
  try {
    return { ...item, imageData: await processImage(abs, { outDir: imageOutDir, cacheDir: imageCacheDir }) };
  } catch (err) {
    throw new Error(`${label}: ${err.message}`);
  }
}

export async function buildPages(data) {
  const { links, posts: blogPosts, site, now } = data;
  const projects = {};
  for (const lane of Object.keys(data.projects)) {
    projects[lane] = [];
    for (const p of data.projects[lane]) projects[lane].push(await withImage(p, 'image', `project ${p.title}`));
  }
  const photos = [];
  for (const p of data.photos) photos.push(await withImage(p, 'src', `photo ${p.src}`, resolvePhotoPath));
  if (!(await exists(resolve(root, config.templateDir, '404.ejs')))) throw new Error('404 template not found');
  if (blogPosts.length === 0) throw new Error('No blog posts found');

  const stamp = getBuildStamp({ gitDir: resolve(root, '.git') });
  const common = { links, stamp, pictureHtml };
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
  // Post images go through the pipeline once, up front, so every consumer (pages, feed) sees final html.
  const imageOpts = { assetsRoot, outDir: imageOutDir, cacheDir: imageCacheDir };
  for (const post of blogPosts) {
    post.html = await processHtmlImages(post.html, { slug: post.slug, ...imageOpts });
    if (post.cover) {
      post.coverImage = await processImage(resolveAssetPath(post.cover, assetsRoot), imageOpts).catch(err => {
        throw new Error(`${post.slug}: cover ${post.cover}: ${err.message}`);
      });
      // The cover is the LCP image, so the body's first image is no longer the priority one.
      post.html = post.html.replace('fetchpriority="high"', 'loading="lazy"');
    }
  }

  await renderPage(
    'blog-index.ejs',
    {
      ...common,
      formatLongDate,
      posts: blogPosts,
      title: 'Blog - codesthings.com',
      description: 'Posts by James Macmillan on software, making and photography, newest first.',
      path: '/blog/',
    },
    'blog/index.html',
  );
  for (const post of blogPosts) {
    debug(` - Blog: ${post.title} (${post.slug})`);
    await renderPage(
      'blog.ejs',
      {
        ...common,
        formatLongDate,
        post,
        coverHtml: post.coverImage
          ? pictureHtml({ image: post.coverImage, alt: post.coverAlt, sizes: POST_SIZES, priority: true })
          : '',
        title: `${post.title} - codesthings.com`,
        description: post.summary,
        path: `/blog/${post.slug}.html`,
        type: 'article',
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
