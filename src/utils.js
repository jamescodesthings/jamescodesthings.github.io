import Debug from 'debug';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile as fsReadFile, readdir, writeFile as fsWriteFile, mkdir, rm, copyFile, stat } from 'fs/promises';
import ejs from 'ejs';
import showdown from 'showdown';
import config from './config.js';

const debug = Debug('codesthings:utils');
debug.enabled = true;
const trace = Debug('codesthings:utils:trace');
trace.enabled = false;

const converter = new showdown.Converter({ tables: true, ghCodeBlocks: true });

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

export async function cpDir(srcDir, destDir) {
  if (!(await exists(srcDir))) throw new Error(`Source directory not found at ${srcDir}`);

  const entries = await readdir(srcDir, { withFileTypes: true });
  await mkdirp(destDir);
  for (const entry of entries) {
    const srcPath = `${srcDir}/${entry.name}`;
    const destPath = `${destDir}/${entry.name}`;
    if (entry.isDirectory()) {
      trace(`cp ${destPath}`);
      await cpDir(srcPath, destPath);
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

export async function renderTemplate(templatePath, data) {
  debug(` - Rendering ${templatePath}`);
  const template = await readFile(templatePath);
  return ejs.render(template, data, {
    filename: templatePath,
    views: [resolve(root, config.templateDir)],
  });
}

// A post may open with a `---` block of `key: value` lines; `summary` is the one-liner shown on the blog list.
export function parsePost(markdown) {
  const frontMatch = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  const meta = {};
  if (frontMatch) {
    for (const line of frontMatch[1].split('\n')) {
      const [key, ...rest] = line.split(':');
      if (key.trim()) meta[key.trim()] = rest.join(':').trim();
    }
  }
  const body = frontMatch ? markdown.slice(frontMatch[0].length) : markdown;
  const titleMatch = body.match(/^#\s+(.+)$/m);
  return { title: titleMatch ? titleMatch[1] : null, summary: meta.summary || '', body };
}

export async function renderBlogPost(post) {
  const blogTemplatePath = resolve(root, config.templateDir, 'blog.ejs');
  const blogTemplate = await readFile(blogTemplatePath);
  const html = ejs.render(
    blogTemplate,
    { title: post.title, summary: post.summary, content: converter.makeHtml(post.body) },
    {
      filename: blogTemplatePath,
      views: [resolve(root, config.templateDir)],
    },
  );

  debug(` - Blog: ${post.title} (${post.slug})`);
  await writeFile(`${config.outputDir}/blog/${post.slug}.html`, html);
}
