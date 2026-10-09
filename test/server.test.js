import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveRequestPath, MIME_TYPES } from '../src/server.js';

const out = '/srv/public';

test('request paths strip queries, decode escapes and stay inside the output dir', () => {
  assert.equal(resolveRequestPath('/a.css?v=1', out).filePath, '/srv/public/a.css');
  assert.equal(resolveRequestPath('/', out).filePath, '/srv/public/index.html');
  assert.equal(resolveRequestPath('/a%20b.txt', out).filePath, '/srv/public/a b.txt');
  assert.equal(resolveRequestPath('/%E0%A4%A', out).status, 400);
  assert.equal(resolveRequestPath('/../etc/passwd', out).status, 403);
  assert.equal(resolveRequestPath('/%2e%2e/public-evil/x', out).status, 403);
  assert.equal(resolveRequestPath('/../public-evil/x', out).status, 403);
});

test('mime types cover the built output', () => {
  for (const ext of ['.avif', '.xml', '.mp4', '.txt', '.webp', '.woff2']) assert.ok(MIME_TYPES[ext], ext);
});
