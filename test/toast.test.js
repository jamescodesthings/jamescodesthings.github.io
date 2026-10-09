import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toast } from '../src/js/toast.js';

function el() {
  const attrs = new Set();
  const node = {
    className: '',
    textContent: '',
    children: [],
    isConnected: true,
    offsetWidth: 0,
    setAttribute: name => attrs.add(name),
    removeAttribute: name => attrs.delete(name),
    hasAttribute: name => attrs.has(name),
    get firstElementChild() {
      return node.children[0] || null;
    },
    replaceChildren(...kids) {
      node.children = kids;
    },
    appendChild() {},
    querySelector: sel => node.children.find(c => sel === '[data-visible]' && c.hasAttribute('data-visible')) || null,
  };
  return node;
}

// A document stub, in a world where requestAnimationFrame never fires.
test('toast becomes visible without requestAnimationFrame, then hides', async () => {
  const saved = globalThis.requestAnimationFrame;
  globalThis.requestAnimationFrame = () => 0; // never calls back
  try {
    let region = null;
    const body = el();
    body.appendChild = node => (region = node);
    const doc = { body, createElement: () => el() };

    toast('Hello', { duration: 200, doc });
    await new Promise(r => setTimeout(r, 100));
    const item = region.firstElementChild;
    assert.equal(item.textContent, 'Hello');
    assert.equal(item.hasAttribute('data-visible'), true, 'visible with no animation frame');

    await new Promise(r => setTimeout(r, 250));
    assert.equal(item.hasAttribute('data-visible'), false, 'the hide timer still runs');
  } finally {
    globalThis.requestAnimationFrame = saved;
  }
});
