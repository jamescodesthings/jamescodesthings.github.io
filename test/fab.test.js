import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initFab } from '../src/js/fab.js';
import { motionAllowed } from '../src/js/motion.js';

function el(name) {
  const attrs = {};
  const handlers = {};
  return {
    name,
    hidden: name === 'popover',
    attrs,
    handlers,
    focused: 0,
    setAttribute: (k, v) => (attrs[k] = v),
    getAttribute: k => (k in attrs ? attrs[k] : null),
    addEventListener: (type, fn) => (handlers[type] = fn),
    focus() {
      this.focused += 1;
      env.active = this;
    },
    querySelector: () => null,
  };
}

let env;

function fakeEnv({ width = 1024, store = {}, throwing = false } = {}) {
  const btn = el('btn');
  const popover = el('popover');
  const closeBtn = el('close');
  const docHandlers = {};
  const byId = { campsnapFab: el('fab'), campsnapFabBtn: btn, campsnapPopover: popover, campsnapClose: closeBtn };
  const win = {
    innerWidth: width,
    localStorage: {
      getItem(k) {
        if (throwing) throw new Error('SecurityError');
        return k in store ? store[k] : null;
      },
      setItem(k, v) {
        if (throwing) throw new Error('QuotaExceededError');
        store[k] = String(v);
      },
    },
    document: {
      getElementById: id => byId[id],
      addEventListener: (type, fn) => (docHandlers[type] = fn),
    },
  };
  env = { active: null, btn, popover, closeBtn, docHandlers, store };
  return { win, ...env };
}

test('auto-opens once, sets aria state, moves focus in, and records it', () => {
  const e = fakeEnv();
  initFab(e.win);
  assert.equal(e.popover.hidden, false);
  assert.equal(e.btn.attrs['aria-expanded'], 'true');
  assert.equal(e.closeBtn.focused, 1);
  assert.equal(e.store.campsnapFabDismissed, 'true');
});

test('does not auto-open a second time', () => {
  const e = fakeEnv({ store: { campsnapFabDismissed: 'true' } });
  initFab(e.win);
  assert.equal(e.popover.hidden, true);
});

test('does not auto-open under 480px', () => {
  const e = fakeEnv({ width: 479 });
  initFab(e.win);
  assert.equal(e.popover.hidden, true);
});

test('survives storage that throws, and still opens once for the page', () => {
  const e = fakeEnv({ throwing: true });
  const fab = initFab(e.win);
  assert.equal(e.popover.hidden, false);
  fab.close();
  assert.equal(e.popover.hidden, true);
});

test('Escape and the close button dismiss, focus returns to the button', () => {
  const e = fakeEnv();
  initFab(e.win);
  e.docHandlers.keydown({ key: 'Escape' });
  assert.equal(e.popover.hidden, true);
  assert.equal(e.btn.focused, 1);
  e.btn.handlers.click();
  assert.equal(e.popover.hidden, false);
  e.closeBtn.handlers.click();
  assert.equal(e.popover.hidden, true);
  assert.equal(e.btn.attrs['aria-expanded'], 'false');
});

test('document clicks and other keys do not dismiss', () => {
  const e = fakeEnv();
  initFab(e.win);
  assert.equal(e.docHandlers.click, undefined);
  e.docHandlers.keydown({ key: 'Tab' });
  assert.equal(e.popover.hidden, false);
});

function motionWin({ mode = null, reduce = false } = {}) {
  return {
    document: { documentElement: { getAttribute: () => mode } },
    matchMedia: () => ({ matches: reduce }),
  };
}

test('motionAllowed honours the OS setting and data-motion', () => {
  assert.equal(motionAllowed(motionWin()), true);
  assert.equal(motionAllowed(motionWin({ reduce: true })), false);
  assert.equal(motionAllowed(motionWin({ mode: 'reduce' })), false);
  assert.equal(motionAllowed(motionWin({ mode: 'full', reduce: true })), true);
});
