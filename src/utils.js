import Debug from 'debug';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile as fsReadFile, readdir, writeFile as fsWriteFile, mkdir, rm, copyFile, stat } from 'fs/promises';
import ejs from 'ejs';
import config from './config.js';

const debug = Debug('codesthings:utils');
debug.enabled = true;
const trace = Debug('codesthings:utils:trace');
trace.enabled = false;

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

export async function readFile(path) {
  try {
    return await fsReadFile(path, 'utf8');
  } catch (err) {
    throw new Error(`Failed to read file at ${path}: ${err.message}`);
  }
}

export async function readJson(path) {
  const contents = await readFile(path);
  return JSON.parse(contents);
}

export async function writeFile(path, contents) {
  await mkdirp(dirname(path));
  await fsWriteFile(path, contents, 'utf8');
}

export async function ls(path) {
  return readdir(path);
}

export async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    throw err;
  }
}

export async function mkdirp(path) {
  await mkdir(path, { recursive: true });
}

export async function rmrf(path) {
  try {
    await rm(path, { recursive: true });
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
}

export async function cp(src, dest) {
  await mkdirp(dirname(dest));
  await copyFile(src, dest);
}

// `filter(dirent)` returns false to skip an entry.
export async function cpDir(srcDir, destDir, filter = () => true) {
  if (!(await exists(srcDir))) throw new Error(`Source directory not found at ${srcDir}`);

  const entries = await readdir(srcDir, { withFileTypes: true });
  await mkdirp(destDir);
  for (const entry of entries) {
    if (!filter(entry)) continue;
    const srcPath = `${srcDir}/${entry.name}`;
    const destPath = `${destDir}/${entry.name}`;
    if (entry.isDirectory()) {
      trace(`cp ${destPath}`);
      await cpDir(srcPath, destPath, filter);
    } else {
      trace(`cp ${destPath}`);
      await copyFile(srcPath, destPath);
    }
  }
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

// "30 March 2026" from a YYYY-MM-DD date, in UTC so the day never shifts with the build machine's zone.
export function formatLongDate(dateStr) {
  const date = new Date(`${dateStr}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export async function renderTemplate(templatePath, data) {
  debug(` - Rendering ${templatePath}`);
  const template = await readFile(templatePath);
  return ejs.render(template, data, {
    filename: templatePath,
    views: [resolve(root, config.templateDir)],
  });
}
