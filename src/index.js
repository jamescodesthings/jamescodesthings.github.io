import Debug from 'debug';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import config from './config.js';
import {
  writeFile,
  mkdirp,
  rmrf,
  cpDir,
  cp,
  exists,
  readJson,
  renderTemplate,
  formatDate,
  formatLongDate,
} from './utils.js';
import { loadData as loadSiteData } from './lib/data.js';
import { bundleCss } from './lib/css.js';
import { atomFeed, sitemap, robots, pagePathFor, postSummary } from './lib/feeds.js';
import { ogSlugFor, ogCardPath, cachedOgCard } from './lib/og.js';
import { getBuildStamp } from './lib/buildstamp.js';
import { processImage, pictureHtml, resolveAssetPath, resolvePhotoPath, POST_SIZES } from './lib/images.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outputDir = resolve(root, config.outputDir);
const assetsRoot = resolve(root, config.assetsDir);
// Processed images land here (URL /assets/img/...); the cache is keyed by source content.
const imageOutDir = resolve(outputDir, 'assets/img');
const imageCacheDir = resolve(root, '.cache/images');
const ogCacheDir = resolve(root, '.cache/og');

const debug = Debug('codesthings:index');
debug.enabled = true;

// The single page-render entry point: `template` is relative to the template dir, `outPath` to the output dir.
// Every page written, so the sitemap is derived from the build rather than listed by hand.
const renderedPaths = new Set();

// One entry per page that gets a share card, recorded as pages render and drawn by buildOg.
const ogCards = new Map();
let siteUrl = 'https://codesthings.com';
const TITLE_SUFFIX = / - codesthings\.com$/;

export async function renderPage(template, data, outPath) {
  debug(`Rendering ${outPath}`);
  renderedPaths.add(outPath);
  const cardPath = ogCardPath(outPath);
  if (cardPath) {
    // head.ejs reads ogImage; the slug comes from the same helper buildOg writes with.
    data = { ...data, ogImage: `${siteUrl}${cardPath}` };
    ogCards.set(outPath, {
      title: String(data.title ?? '').replace(TITLE_SUFFIX, ''),
      summary: data.description || data.site?.tagline || '',
      path: data.path ?? '/',
    });
  }
  const html = await renderTemplate(resolve(root, config.templateDir, template), data);
  await writeFile(resolve(outputDir, outPath), html);
}

// Files directly under src/assets/ that the site references (head.ejs, campsnap banner and FAB).
const SHIPPED_ASSET_FILES = [
  'favicon.svg',
  'favicon.ico',
  'apple-touch-icon.png',
  'og-logo.png',
  'zipline-poster.jpg',
  'zipline.mp4',
];

export async function buildAssets() {
  await rmrf(outputDir);
  await mkdirp(outputDir);
  await writeFile(`${outputDir}/css/styles.css`, await bundleCss(resolve(root, config.cssDir)));
  await cpDir(resolve(root, config.jsDir), `${outputDir}/js`);
  // The terminal command parser is shared: tests import src/lib/terminal.js, the browser imports this copy.
  await cp(resolve(root, 'src/lib/terminal.js'), `${outputDir}/js/terminal-lib.js`);
  // Only the assets that a template, script or stylesheet references are shipped (an allowlist, so a
  // stray file dropped in src/assets/ never reaches public/). Post, project and photo images are not
  // copied either: only the ones something references are processed (see renderPost and withImage)
  // into public/assets/img/. fonts/og/ holds the build-time .woff files for share cards; never served.
  for (const name of SHIPPED_ASSET_FILES) await cp(resolve(assetsRoot, name), `${outputDir}/assets/${name}`);
  await cpDir(
    resolve(assetsRoot, 'fonts'),
    `${outputDir}/assets/fonts`,
    entry => !(entry.name === 'og' && entry.isDirectory()),
  );
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
  const { links, posts: blogPosts, site, now, uses } = data;
  siteUrl = site.url;
  // Only a missing file means "not measured yet"; a malformed one fails the build naming the file.
  const colophonPath = resolve(root, config.dataDir, 'colophon.json');
  let colophon = { measured: null };
  if (await exists(colophonPath)) {
    try {
      colophon = await readJson(colophonPath);
    } catch (err) {
      throw new Error(`data/colophon.json: ${err.message}`);
    }
  }
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
  const common = { links, stamp, pictureHtml, site };
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
  const lastReviewed = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  await renderPage(
    'privacy-notice.ejs',
    {
      ...common,
      site,
      lastReviewed,
      title: 'Privacy Notice - codesthings.com',
      description: 'What this site does and does not do with your data. No analytics, no tracking.',
      path: '/privacy-notice',
    },
    'privacy-notice.html',
  );
  await renderPage(
    'about-cookies.ejs',
    {
      ...common,
      lastReviewed,
      title: 'About Cookies - codesthings.com',
      description: 'The few items this site stores on your device, and why.',
      path: '/about-cookies',
    },
    'about-cookies.html',
  );
  await renderPage(
    'now.ejs',
    {
      ...common,
      now,
      formatLongDate,
      title: 'Now - codesthings.com',
      description: 'What James Macmillan is working on at the moment.',
      path: '/now',
    },
    'now.html',
  );
  await renderPage(
    'uses.ejs',
    {
      ...common,
      uses,
      title: 'Uses - codesthings.com',
      description: 'Gear and software James Macmillan uses to build and make things.',
      path: '/uses',
    },
    'uses.html',
  );
  await renderPage(
    'colophon.ejs',
    {
      ...common,
      colophon,
      formatLongDate,
      title: 'Colophon - codesthings.com',
      description: 'How codesthings.com is made: stack, fonts, hosting and measurements.',
      path: '/colophon',
    },
    'colophon.html',
  );
  // Post body images already went through the pipeline in loadData (renderPost), so every consumer
  // (pages, feed) sees final html. Covers are processed here.
  const imageOpts = { assetsRoot, outDir: imageOutDir, cacheDir: imageCacheDir };
  for (const post of blogPosts) {
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
        description: postSummary(post),
        path: `/blog/${post.slug}.html`,
        type: 'article',
      },
      `blog/${post.slug}.html`,
    );
  }
}

export async function buildFeeds(data) {
  const paths = [...renderedPaths].map(pagePathFor).filter(Boolean).sort();
  await writeFile(resolve(outputDir, 'feed.xml'), atomFeed(data.posts, data.site));
  await writeFile(resolve(outputDir, 'sitemap.xml'), sitemap(paths, data.site));
  await writeFile(resolve(outputDir, 'robots.txt'), robots(data.site));
}

// Draws one 1200x630 card per rendered page (not 404) into public/og/<slug>.png, through the .cache/og cache.
export async function buildOg() {
  for (const [outPath, card] of ogCards) {
    const png = await cachedOgCard(card, ogCacheDir);
    await mkdirp(resolve(outputDir, 'og'));
    await writeFile(resolve(outputDir, `og/${ogSlugFor(outPath)}.png`), png);
  }
  debug(`Share cards: ${ogCards.size}`);
}

async function build() {
  const buildStart = Date.now();
  debug(`Build started at ${new Date(buildStart).toLocaleTimeString()}`);

  // Assets first: buildAssets clears public/, and loading posts writes their images into it.
  await buildAssets();
  const data = await loadSiteData(root, { images: { assetsRoot, outDir: imageOutDir, cacheDir: imageCacheDir } });
  await buildPages(data);
  await buildFeeds(data);
  await buildOg();

  const buildEnd = Date.now();
  debug(`Build Complete (${((buildEnd - buildStart) / 1000).toFixed(2)}s)\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await build();
}
