import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSequenceMatcher, createTapCounter, KONAMI, tapsAwayMessage } from '../src/js/konami.js';

test('the Konami sequence matches on the final key', () => {
  const m = createSequenceMatcher(KONAMI);
  const keys = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
  ];
  keys.forEach(k => assert.equal(m.push(k), false));
  assert.equal(m.push('a'), true);
});

test('letters match in either case', () => {
  const m = createSequenceMatcher(KONAMI);
  [...KONAMI.slice(0, 8), 'B'].forEach(k => m.push(k));
  assert.equal(m.push('A'), true);
});

test('a wrong key restarts the sequence', () => {
  const m = createSequenceMatcher(KONAMI);
  ['ArrowUp', 'ArrowUp', 'x'].forEach(k => m.push(k));
  let hit = false;
  KONAMI.slice(2).forEach(k => (hit = m.push(k)));
  assert.equal(hit, false); // the first two keys were thrown away
  KONAMI.forEach(k => (hit = m.push(k)));
  assert.equal(hit, true);
});

test('the wrong key can itself be the start of a fresh sequence', () => {
  const m = createSequenceMatcher(KONAMI);
  let hit = false;
  ['ArrowUp', 'ArrowUp', 'ArrowUp', ...KONAMI.slice(1)].forEach(k => (hit = m.push(k)));
  assert.equal(hit, true);
});

test('the matcher does not fire twice without a fresh sequence', () => {
  const m = createSequenceMatcher(KONAMI);
  KONAMI.forEach(k => m.push(k));
  assert.equal(m.push('a'), false);
});

test('tap counter counts quick taps and resets after a pause', () => {
  let now = 0;
  const t = createTapCounter({ resetMs: 1500, now: () => now });
  assert.equal(t.tap(), 1);
  now = 400;
  assert.equal(t.tap(), 2);
  now = 2500; // 2100ms since the last tap
  assert.equal(t.tap(), 1);
});

test('tap counter reports the target on the seventh tap and then starts over', () => {
  let now = 0;
  const t = createTapCounter({ target: 7, now: () => now });
  const counts = [];
  for (let i = 0; i < 8; i++) {
    now += 100;
    counts.push(t.tap());
  }
  assert.deepEqual(counts, [1, 2, 3, 4, 5, 6, 7, 1]);
});

test('the toast counts down from four taps away', () => {
  assert.equal(tapsAwayMessage(3, 7), '4 taps away from being a developer');
  assert.equal(tapsAwayMessage(5, 7), '2 taps away from being a developer');
  assert.equal(tapsAwayMessage(6, 7), '1 tap away from being a developer');
  assert.equal(tapsAwayMessage(2, 7), null);
  assert.equal(tapsAwayMessage(7, 7), null);
});

test('only touch pointers count as logo taps', async () => {
  const { isTouchTap } = await import('../src/js/konami.js');
  assert.equal(isTouchTap('touch', ''), true);
  assert.equal(isTouchTap('mouse', 'touch'), false);
  assert.equal(isTouchTap('', 'touch'), false); // keyboard activation
  assert.equal(isTouchTap(undefined, 'touch'), true); // no pointerType on click: fall back to pointerdown
  assert.equal(isTouchTap(undefined, 'mouse'), false);
});
