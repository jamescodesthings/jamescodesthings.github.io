import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initVideos } from '../src/js/video.js';

function fakeScope() {
  const vh = {};
  const bh = {};
  const video = {
    paused: true,
    dataset: {},
    hasAttribute: () => false,
    addEventListener: (t, fn) => (vh[t] = fn),
    play() {
      this.paused = false;
      vh.play?.();
      return Promise.resolve();
    },
    pause() {
      this.paused = true;
      vh.pause?.();
    },
  };
  const attrs = {};
  const btn = { dataset: {}, setAttribute: (k, v) => (attrs[k] = v), addEventListener: (t, fn) => (bh[t] = fn), attrs };
  const scope = { querySelector: sel => (sel === 'video' ? video : sel === '[data-video-toggle]' ? btn : null) };
  const win = { document: { querySelectorAll: () => [scope] } };
  return { win, video, btn, bh };
}

test('the video toggle is a labelled overlay: tap pauses and plays, state drives the icon', () => {
  const f = fakeScope();
  initVideos(f.win);
  assert.equal(f.btn.attrs['aria-label'], 'Play video');
  assert.equal(f.btn.dataset.state, 'paused');
  f.bh.click();
  assert.equal(f.video.paused, false);
  assert.equal(f.btn.attrs['aria-label'], 'Pause video');
  assert.equal(f.btn.dataset.state, 'playing');
  f.bh.click();
  assert.equal(f.video.paused, true);
  assert.equal(f.video.dataset.userPaused, 'true');
  assert.equal(f.btn.dataset.state, 'paused');
});
