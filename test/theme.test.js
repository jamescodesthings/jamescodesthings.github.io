import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { initTheme } from '../src/js/theme.js';

const initSource = readFileSync(new URL('../src/js/theme-init.js', import.meta.url), 'utf8');

function fakeEnv({ store = {}, throwing = false, systemLight = false } = {}) {
  const attrs = {};
  const clicks = [];
  const labels = [];
  const localStorage = {
    getItem(key) {
      if (throwing) throw new Error('SecurityError');
      return key in store ? store[key] : null;
    },
    setItem(key, value) {
      if (throwing) throw new Error('QuotaExceededError');
      store[key] = String(value);
    },
  };
  const button = {
    addEventListener: (type, fn) => clicks.push(fn),
    setAttribute: (name, value) => labels.push([name, value]),
  };
  // Two media-query theme-color tags, as head.ejs ships them.
  const metas = [];
  const makeMeta = content => {
    const meta = { name: 'theme-color', content, remove: () => metas.splice(metas.indexOf(meta), 1) };
    return meta;
  };
  metas.push(makeMeta('#faf8f4'), makeMeta('#090b12'));
  const doc = {
    documentElement: { setAttribute: (name, value) => (attrs[name] = value) },
    querySelectorAll: sel =>
      sel === '[data-theme-toggle]' ? [button] : sel === 'meta[name="theme-color"]' ? [...metas] : [],
    createElement: () => ({ remove() {} }),
    head: {
      appendChild: meta => {
        meta.remove = () => metas.splice(metas.indexOf(meta), 1);
        metas.push(meta);
      },
    },
  };
  const win = {
    document: doc,
    localStorage,
    matchMedia: () => ({ matches: systemLight, addEventListener() {} }),
  };
  return { win, attrs, clicks, labels, store, metas };
}

function runInit(env) {
  runInNewContext(initSource, { document: env.win.document, localStorage: env.win.localStorage, window: env.win });
}

test('theme-init defaults to dark with empty storage', () => {
  const env = fakeEnv();
  runInit(env);
  assert.equal(env.attrs['data-theme'], 'dark');
  assert.equal('data-motion' in env.attrs, false);
});

test('theme-init applies stored light and motion', () => {
  const env = fakeEnv({ store: { theme: 'light', motion: 'reduce' } });
  runInit(env);
  assert.equal(env.attrs['data-theme'], 'light');
  assert.equal(env.attrs['data-motion'], 'reduce');
});

test('theme-init resolves system through prefers-color-scheme', () => {
  const env = fakeEnv({ store: { theme: 'system' }, systemLight: true });
  runInit(env);
  assert.equal(env.attrs['data-theme'], 'light');
});

test('theme-init ignores junk values', () => {
  const env = fakeEnv({ store: { theme: 'purple', motion: 'sideways' } });
  runInit(env);
  assert.equal(env.attrs['data-theme'], 'dark');
  assert.equal('data-motion' in env.attrs, false);
});

test('theme-init survives storage throwing', () => {
  const env = fakeEnv({ throwing: true });
  assert.doesNotThrow(() => runInit(env));
  assert.equal(env.attrs['data-theme'], 'dark');
});

test('initTheme persists the choice and exposes get/set', () => {
  const env = fakeEnv();
  const api = initTheme(env.win);
  assert.equal(env.win.__theme, api);
  assert.equal(api.get(), 'dark');
  api.set('light');
  assert.equal(api.get(), 'light');
  assert.equal(env.store.theme, 'light');
  assert.equal(env.attrs['data-theme'], 'light');
  api.set('bogus');
  assert.equal(api.get(), 'light');
});

test('toggle button flips the theme and updates its label', () => {
  const env = fakeEnv();
  initTheme(env.win);
  env.clicks[0]();
  assert.equal(env.attrs['data-theme'], 'light');
  assert.deepEqual(env.labels.at(-1), ['aria-label', 'Switch to dark theme']);
  env.clicks[0]();
  assert.equal(env.attrs['data-theme'], 'dark');
});

test('initTheme and the toggle keep working when storage throws', () => {
  const env = fakeEnv({ throwing: true });
  let api;
  assert.doesNotThrow(() => (api = initTheme(env.win)));
  assert.equal(env.attrs['data-theme'], 'dark');
  assert.doesNotThrow(() => env.clicks[0]());
  assert.equal(env.attrs['data-theme'], 'light');
  assert.doesNotThrow(() => api.set('system'));
  assert.equal(api.get(), 'system');
});

test('theme-init leaves one theme-color tag for the theme it sets', () => {
  const env = fakeEnv({ store: { theme: 'light' } });
  runInit(env);
  assert.deepEqual(
    env.metas.map(m => m.content),
    ['#faf8f4'],
  );
});

test('initTheme swaps theme-color to the active theme on load and on toggle', () => {
  const env = fakeEnv();
  initTheme(env.win);
  assert.deepEqual(
    env.metas.map(m => m.content),
    ['#090b12'],
  );
  env.clicks[0]();
  assert.deepEqual(
    env.metas.map(m => m.content),
    ['#faf8f4'],
  );
});

test('the dusk motion flag is only set once the visitor changes the theme', () => {
  const env = fakeEnv();
  const api = initTheme(env.win);
  assert.equal('data-theme-motion' in env.attrs, false);
  api.set('light');
  assert.equal('data-theme-motion' in env.attrs, true);
});
