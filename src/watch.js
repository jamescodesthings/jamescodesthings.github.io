import { watch } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import config from './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const watchPaths = [
  resolve(root, config.templateDir),
  resolve(root, config.cssDir),
  resolve(root, 'static/js'),
  resolve(root, config.dataDir),
];

let building = false;
let queued = false;

function runBuild() {
  if (building) {
    queued = true;
    return;
  }
  building = true;
  console.log('[watch] Building...');

  exec('node --no-deprecation ./src/index.js', { cwd: root }, (err, stdout, stderr) => {
    if (err) {
      console.error('[watch] Build failed:', stderr || err.message);
    } else {
      console.log('[watch] Build complete');
      if (stdout) console.log(stdout);
    }
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
    console.log(`[watch] Watching ${watchPath}`);
  } catch (err) {
    console.warn(`[watch] Cannot watch ${watchPath}: ${err.message}`);
  }
}

console.log('[watch] Ready. Watching for changes...');
