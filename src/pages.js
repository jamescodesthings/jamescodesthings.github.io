import Debug from 'debug';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';
import { cpDir, mkdirp, writeFile, readFile } from './utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const debug = Debug('codesthings:pages');
debug.enabled = true;

async function buildPages() {
  debug('Building pages output...');

  const outputDir = resolve(__dirname, config.outputDir);
  const pagesDir = resolve(root, 'pages');

  // Copy the built output to a pages directory
  await mkdirp(pagesDir);
  await cpDir(outputDir, pagesDir);

  // Add CNAME for custom domain
  await writeFile(`${pagesDir}/CNAME`, 'codesthings.com');

  // Add .nojekyll to skip Jekyll processing
  await writeFile(`${pagesDir}/.nojekyll`, '');

  debug('Pages build complete! Output in: %s', pagesDir);
}

await buildPages();
