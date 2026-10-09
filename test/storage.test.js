import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStorage, createSessionStorage } from '../src/js/storage.js';

function working(store = {}) {
  return {
    localStorage: {
      getItem: key => (key in store ? store[key] : null),
      setItem: (key, value) => {
        store[key] = String(value);
      },
    },
  };
}

const throwingMethods = {
  localStorage: {
    getItem() {
      throw new Error('SecurityError');
    },
    setItem() {
      throw new Error('QuotaExceededError');
    },
  },
};

// Safari with storage blocked throws on the property access itself.
const throwingAccessor = {
  get localStorage() {
    throw new Error('SecurityError');
  },
};

test('get returns the stored value, or the fallback when the key is absent', () => {
  const s = createStorage(working({ theme: 'light' }));
  assert.equal(s.get('theme', 'dark'), 'light');
  assert.equal(s.get('motion', 'system'), 'system');
  assert.equal(s.get('motion'), null);
});

test('set stores the value as a string and returns true', () => {
  const store = {};
  const s = createStorage(working(store));
  assert.equal(s.set('nav-sections', 'off'), true);
  assert.equal(store['nav-sections'], 'off');
});

for (const [name, win] of [
  ['methods that throw', throwingMethods],
  ['an accessor that throws', throwingAccessor],
  ['no localStorage at all', {}],
]) {
  test(`get returns the fallback and set returns false with ${name}`, () => {
    const s = createStorage(win);
    assert.equal(s.get('theme', 'dark'), 'dark');
    assert.equal(s.get('theme'), null);
    assert.equal(s.set('theme', 'light'), false);
  });
}

test('session storage reads and writes sessionStorage, not localStorage', () => {
  const store = {};
  const s = createSessionStorage({
    localStorage: working({}).localStorage,
    sessionStorage: working(store).localStorage,
  });
  assert.equal(s.set('terminal-history', '[]'), true);
  assert.equal(store['terminal-history'], '[]');
  assert.equal(s.get('terminal-history'), '[]');
  assert.equal(s.get('nope', 'x'), 'x');
});

test('session storage never throws', () => {
  for (const win of [
    { sessionStorage: throwingMethods.localStorage },
    {
      get sessionStorage() {
        throw new Error('x');
      },
    },
    {},
  ]) {
    const s = createSessionStorage(win);
    assert.equal(s.get('a', 'fb'), 'fb');
    assert.equal(s.set('a', 'b'), false);
  }
});
