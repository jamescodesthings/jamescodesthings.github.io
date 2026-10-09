import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const REPO_URL = 'https://github.com/jamescodesthings/jamescodesthings.github.io';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function read(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    return null;
  }
}

function readGitSha(gitDir) {
  const head = read(join(gitDir, 'HEAD'))?.trim();
  if (!head) return null;
  if (!head.startsWith('ref:')) return head;
  const ref = head.slice(4).trim();
  const loose = read(join(gitDir, ref))?.trim();
  if (loose) return loose;
  const packed = read(join(gitDir, 'packed-refs'));
  if (!packed) return null;
  for (const line of packed.split(/\r?\n/)) {
    const [sha, name] = line.trim().split(/\s+/);
    if (name === ref && sha) return sha;
  }
  return null;
}

export function getBuildStamp({ env = process.env, gitDir = '.git', now = new Date() } = {}) {
  const sha = env.GITHUB_SHA || readGitSha(gitDir) || 'dev';
  const date = `${now.getUTCDate()} ${MONTHS[now.getUTCMonth()]} ${now.getUTCFullYear()}`;
  const real = sha !== 'dev';
  return { sha, short: real ? sha.slice(0, 7) : 'dev', date, url: real ? `${REPO_URL}/commit/${sha}` : null };
}
