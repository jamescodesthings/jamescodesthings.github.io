import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { getBuildStamp } from '../src/lib/buildstamp.js';

const now = new Date('2026-10-09T12:00:00Z');
const SHA = 'abc1234def5678abc1234def5678abc1234def56';

function tmpGit() {
  return mkdtempSync(join(tmpdir(), 'gitdir-'));
}

test('GITHUB_SHA gives short sha and commit url', () => {
  const s = getBuildStamp({ env: { GITHUB_SHA: 'abc1234def' }, gitDir: '/nonexistent', now });
  assert.equal(s.sha, 'abc1234def');
  assert.equal(s.short, 'abc1234');
  assert.equal(s.url, 'https://github.com/jamescodesthings/jamescodesthings.github.io/commit/abc1234def');
});

test('reads HEAD ref from a loose ref file', () => {
  const dir = tmpGit();
  mkdirSync(join(dir, 'refs/heads'), { recursive: true });
  writeFileSync(join(dir, 'HEAD'), 'ref: refs/heads/main\n');
  writeFileSync(join(dir, 'refs/heads/main'), `${SHA}\n`);
  const s = getBuildStamp({ env: {}, gitDir: dir, now });
  assert.equal(s.sha, SHA);
  assert.equal(s.short, 'abc1234');
  assert.ok(s.url.endsWith(`/commit/${SHA}`));
});

test('falls back to packed-refs', () => {
  const dir = tmpGit();
  writeFileSync(join(dir, 'HEAD'), 'ref: refs/heads/main\n');
  writeFileSync(join(dir, 'packed-refs'), `# pack-refs\n${SHA} refs/heads/main\n`);
  const s = getBuildStamp({ env: {}, gitDir: dir, now });
  assert.equal(s.sha, SHA);
});

test('detached HEAD holds the sha directly', () => {
  const dir = tmpGit();
  writeFileSync(join(dir, 'HEAD'), `${SHA}\n`);
  assert.equal(getBuildStamp({ env: {}, gitDir: dir, now }).sha, SHA);
});

test('no git dir gives dev and null url', () => {
  const s = getBuildStamp({ env: {}, gitDir: join(tmpGit(), 'missing'), now });
  assert.equal(s.sha, 'dev');
  assert.equal(s.short, 'dev');
  assert.equal(s.url, null);
});

test('date is formatted from injected now', () => {
  assert.equal(getBuildStamp({ env: {}, gitDir: '/nonexistent', now }).date, '9 Oct 2026');
});
