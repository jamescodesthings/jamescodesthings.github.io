import { readFile as fsReadFile, readdir, writeFile as fsWriteFile, mkdir, rm, copyFile, stat } from 'fs/promises';
import { dirname } from 'path';

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
  if (!(await exists(srcDir))) return;
  const entries = await readdir(srcDir, { withFileTypes: true });
  await mkdirp(destDir);
  for (const entry of entries) {
    const srcPath = `${srcDir}/${entry.name}`;
    const destPath = `${destDir}/${entry.name}`;
    if (entry.isDirectory()) {
      await cpDir(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}
