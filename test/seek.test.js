import { test } from 'node:test';
import assert from 'node:assert/strict';
import { seek, seekFromHash } from '../src/js/seek.js';

function node() {
  const classes = new Set();
  return {
    classes,
    classList: { add: c => classes.add(c), remove: c => classes.delete(c) },
    scrolled: null,
    focused: null,
    scrollIntoView(opts) {
      this.scrolled = opts;
    },
    focus(opts) {
      this.focused = opts;
    },
  };
}

function fakeWin({ reduce = false, hash = '', cards = {} } = {}) {
  const timers = [];
  return {
    timers,
    location: { hash },
    setTimeout: (fn, ms) => timers.push({ fn, ms }),
    matchMedia: () => ({ matches: reduce }),
    document: {
      documentElement: { getAttribute: () => null },
      getElementById: id => cards[id] ?? null,
    },
  };
}

test('seek scrolls the card into view, marks card and link, focuses the link, then clears', () => {
  const card = node();
  const link = node();
  const win = fakeWin();
  seek(card, link, win);
  assert.deepEqual(card.scrolled, { behavior: 'smooth', block: 'center' });
  assert.ok(card.classes.has('is-sought'));
  assert.ok(link.classes.has('is-sought'));
  assert.deepEqual(link.focused, { preventScroll: true });
  assert.equal(win.timers.length, 1);
  win.timers[0].fn();
  assert.ok(!card.classes.has('is-sought'));
  assert.ok(!link.classes.has('is-sought'));
});

test('seek jumps without smooth scrolling when motion is reduced', () => {
  const card = node();
  seek(card, node(), fakeWin({ reduce: true }));
  assert.equal(card.scrolled.behavior, 'auto');
});

test('seekFromHash seeks a project card named in the URL and its first link', () => {
  const card = node();
  const link = node();
  card.querySelector = sel => (sel === '.project-link' ? link : null);
  const win = fakeWin({ hash: '#project-campsnap-filters', cards: { 'project-campsnap-filters': card } });
  assert.equal(seekFromHash(win), true);
  assert.ok(card.classes.has('is-sought'));
  assert.ok(link.classes.has('is-sought'));
});

test('seekFromHash ignores other hashes and missing cards', () => {
  assert.equal(seekFromHash(fakeWin({ hash: '#work' })), false);
  assert.equal(seekFromHash(fakeWin({ hash: '#project-missing' })), false);
});
