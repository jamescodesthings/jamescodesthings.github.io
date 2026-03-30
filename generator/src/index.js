import Debug from 'debug';
import ejs from 'ejs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';
import { readFile, readJson, writeFile, mkdirp, rmrf, cpDir, cp, exists } from './utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const debug = Debug('codesthings:build');
debug.enabled = true;

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

async function loadData() {
  const dataDir = resolve(root, config.dataDir);
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
    views: [resolve(root, config.templateDir)],
  });
}

async function copyAssets(outputDir) {
  // Copy CSS
  await cpDir(resolve(root, config.cssDir), `${outputDir}/css`);

  // Copy JS
  await cpDir(resolve(root, 'static/js'), `${outputDir}/js`);

  // Copy favicons
  const faviconSrc = resolve(root, config.faviconDir);
  if (await exists(faviconSrc)) {
    await cpDir(faviconSrc, `${outputDir}/assets/favicon`);
  }

  // Copy icons
  const iconSrc = resolve(root, config.iconDir);
  if (await exists(iconSrc)) {
    await cpDir(iconSrc, `${outputDir}/assets/icons`);
  }

  // Copy textures
  const textureSrc = resolve(root, config.textureDir);
  if (await exists(textureSrc)) {
    await cpDir(textureSrc, `${outputDir}/assets/textures`);
  }

  // Copy manifest and 404 if they exist
  const manifestSrc = resolve(root, '../public/manifest.json');
  if (await exists(manifestSrc)) {
    await cp(manifestSrc, `${outputDir}/manifest.json`);
  }
  const notFoundSrc = resolve(root, '../public/404.html');
  if (await exists(notFoundSrc)) {
    await cp(notFoundSrc, `${outputDir}/404.html`);
  }
}

async function build() {
  debug('Starting build...');

  const outputDir = resolve(root, config.outputDir);

  // Load all data
  debug('Loading data...');
  const data = await loadData();

  // Render the main template
  debug('Rendering templates...');
  const templatePath = resolve(root, config.templateDir, 'index.ejs');
  const html = await renderTemplate(templatePath, {
    ...data,
    formatDate,
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

  debug('Build complete!');
}

await build();
