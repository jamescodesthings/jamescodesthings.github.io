import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isBackdropClick } from '../src/js/dialog.js';

const dialog = { getBoundingClientRect: () => ({ left: 10, right: 110, top: 10, bottom: 110 }) };

test('only a click on the dialog element outside its box is a backdrop click', () => {
  assert.equal(isBackdropClick({ target: dialog, clientX: 5, clientY: 50 }, dialog), true);
  assert.equal(isBackdropClick({ target: dialog, clientX: 50, clientY: 50 }, dialog), false);
  assert.equal(isBackdropClick({ target: {}, clientX: 5, clientY: 50 }, dialog), false);
});
