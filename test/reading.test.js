import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readingTime } from '../src/lib/reading.js';

const words = n => Array.from({ length: n }, () => 'word').join(' ');

test('440 words is 2 minutes', () => {
  assert.equal(readingTime(words(440)), 2);
});

test('an empty string is 1 minute', () => {
  assert.equal(readingTime(''), 1);
  assert.equal(readingTime('   \n '), 1);
});

test('partial minutes round up', () => {
  assert.equal(readingTime(words(221)), 2);
  assert.equal(readingTime(words(220)), 1);
});
