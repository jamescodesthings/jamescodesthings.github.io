import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parsePost } from '../src/lib/frontmatter.js';

test('front matter values may contain colons', () => {
  const { meta } = parsePost('---\nsummary: a: b\n---\n# T\n\ntext\n');
  assert.equal(meta.summary, 'a: b');
});

test('no front matter gives empty meta and unchanged body', () => {
  const input = '# Hello\n\nbody\n';
  const { meta, body } = parsePost(input);
  assert.deepEqual(meta, {});
  assert.equal(body, input);
});

test('title is the first # heading in the body', () => {
  const { title, body } = parsePost('---\nsummary: s\n---\nintro\n\n# First\n\n# Second\n');
  assert.equal(title, 'First');
  assert.match(body, /^intro/);
  assert.match(body, /# First/);
});

test('title is null without a heading', () => {
  assert.equal(parsePost('just text').title, null);
});

test('CRLF front matter parses', () => {
  const { meta, title, body } = parsePost('---\r\nsummary: one\r\ntags: x\r\n---\r\n# Title\r\n\r\ntext\r\n');
  assert.deepEqual(meta, { summary: 'one', tags: 'x' });
  assert.equal(title, 'Title');
  assert.ok(body.startsWith('# Title'));
});

test('title skips # lines inside fenced code blocks', () => {
  const { title } = parsePost('intro\n\n```bash\n# not a title\n```\n\n~~~\n# nor this\n~~~\n\n# Real\n');
  assert.equal(title, 'Real');
  assert.equal(parsePost('```\n# only code\n```\n').title, null);
});
