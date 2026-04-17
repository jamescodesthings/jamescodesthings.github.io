import Debug from 'debug';
import { watch } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import config from './config.js';

const debug = Debug('codesthings:watch');
debug.enabled = true;

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const values = Object.values(config);
const watchPaths = values.filter(dir => !dir.includes('public')).map(dir => resolve(root, dir));

let building = false;
let queued = false;

function runBuild() {
  if (building) {
    queued = true;
    return;
  }
  building = true;
  debug('Building');

  exec('node --no-deprecation ./src/index.js', { cwd: root }, (err, stdout, stderr) => {
    if (err) {
      console.error('Build failed:', stderr || err.message);
    } else {
      debug('Build complete');
      if (stdout) debug(stdout);
    }
    if (stderr) debug(stderr);
    if (stdout) debug(stdout);
    building = false;
    if (queued) {
      queued = false;
      runBuild();
    }
  });
}

// Initial build
runBuild();

// Watch for changes
let debounce = null;
for (const watchPath of watchPaths) {
  try {
    watch(watchPath, { recursive: true }, () => {
      clearTimeout(debounce);
      debounce = setTimeout(runBuild, 300);
    });
    debug(`Watching ${watchPath}`);
  } catch (err) {
    console.warn(`Cannot watch ${watchPath}: ${err.message}`);
  }
}

debug('Ready. Watching for changes');
