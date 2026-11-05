// Vendors files from the resources repo into a consumer, driven by shared/resources.json.
// Usage from a consumer root: node shared/sync-resources.js   (RESOURCES_DIR defaults to ../resources)
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const LFS_POINTER = 'version https://git-lfs.github.com/spec/v1';
const MANIFEST = 'shared/resources.json';

function git(cwd, ...args) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

async function realpath(p) {
  try {
    return await fs.realpath(p);
  } catch {
    return null;
  }
}

async function assertCheckout(resourcesDir) {
  const real = await realpath(resourcesDir);
  let top = null;
  if (real) {
    try {
      top = await realpath(git(real, 'rev-parse', '--show-toplevel'));
    } catch {
      top = null;
    }
  }
  if (!real || top !== real) {
    throw new Error(`${resourcesDir} is not a git checkout`);
  }
  return real;
}

async function startsWithPointer(file) {
  const handle = await fs.open(file, 'r');
  try {
    const buf = Buffer.alloc(LFS_POINTER.length);
    const { bytesRead } = await handle.read(buf, 0, buf.length, 0);
    return buf.toString('utf8', 0, bytesRead) === LFS_POINTER;
  } finally {
    await handle.close();
  }
}

export async function sync({ resourcesDir, consumerDir }) {
  const root = await assertCheckout(resourcesDir);
  if (git(root, 'status', '--porcelain')) {
    throw new Error(`${resourcesDir} has uncommitted changes; commit them before syncing`);
  }
  const manifestPath = path.join(consumerDir, MANIFEST);
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));

  // Validate everything before copying anything.
  for (const { from } of manifest.files) {
    const src = path.join(root, from);
    let stat;
    try {
      stat = await fs.stat(src);
    } catch {
      throw new Error(`source path not found in resources: ${from}`);
    }
    if (stat.isFile() && (await startsWithPointer(src))) {
      throw new Error(`${from} is an LFS pointer; run git lfs pull in resources`);
    }
  }

  const sha = git(root, 'rev-parse', 'HEAD');
  const copied = [];
  for (const { from, to } of manifest.files) {
    const dest = path.join(consumerDir, to);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.cp(path.join(root, from), dest, { recursive: true });
    copied.push(to);
  }
  manifest.resources = sha;
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return { sha, copied };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const resourcesDir = path.resolve(process.env.RESOURCES_DIR ?? '../resources');
  sync({ resourcesDir, consumerDir: process.cwd() })
    .then(({ sha, copied }) => console.log(`synced ${copied.length} files from resources ${sha.slice(0, 7)}`))
    .catch((err) => {
      console.error(`sync-resources: ${err.message}`);
      process.exit(1);
    });
}
