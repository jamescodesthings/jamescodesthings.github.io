import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatLocalTime, initLocalTime } from '../src/js/local-time.js';

test('formats the time in the given zone, 24-hour', () => {
  // British Summer Time: UTC+1.
  assert.equal(formatLocalTime(new Date('2026-10-13T18:32:00Z'), 'Europe/London'), '19:32');
  // Greenwich Mean Time: UTC+0, and single-digit hours keep their leading zero.
  assert.equal(formatLocalTime(new Date('2026-12-01T08:05:00Z'), 'Europe/London'), '08:05');
  assert.equal(formatLocalTime(new Date('2026-12-01T23:59:59Z'), 'Europe/London'), '23:59');
});

function fakeEl(tz = 'Europe/London') {
  return {
    hidden: true,
    textContent: '',
    dataset: { tz },
    attrs: {},
    setAttribute(k, v) {
      this.attrs[k] = v;
    },
  };
}

function fakeWin(el, now) {
  const timers = [];
  const intervals = [];
  return {
    timers,
    intervals,
    Date: class extends Date {
      constructor(...a) {
        super(...(a.length ? a : [now()]));
      }
      static now() {
        return now();
      }
    },
    setTimeout: (fn, ms) => timers.push({ fn, ms }),
    setInterval: (fn, ms) => intervals.push({ fn, ms }),
    document: { querySelector: sel => (sel === '[data-local-time]' ? el : null) },
  };
}

test('fills and shows the time, then ticks on the minute', () => {
  const el = fakeEl();
  let t = Date.parse('2026-10-13T18:32:20Z');
  const win = fakeWin(el, () => t);
  initLocalTime(win);
  assert.equal(el.hidden, false);
  assert.equal(el.textContent, ' · 19:32 local');
  assert.equal(el.attrs.datetime, '2026-10-13T18:32:20.000Z');
  // The first update lands on the next minute boundary, 40 seconds away, then every minute.
  assert.equal(win.timers.length, 1);
  assert.equal(win.timers[0].ms, 40000);
  t = Date.parse('2026-10-13T18:33:00Z');
  win.timers[0].fn();
  assert.equal(el.textContent, ' · 19:33 local');
  assert.equal(win.intervals[0].ms, 60000);
});

test('does nothing when the page has no local time slot', () => {
  const win = fakeWin(null, () => 0);
  initLocalTime(win);
  assert.equal(win.timers.length, 0);
});

test('stays hidden when the zone is unknown, instead of showing a wrong time', () => {
  const el = fakeEl('Not/AZone');
  const win = fakeWin(el, () => Date.parse('2026-10-13T18:32:20Z'));
  initLocalTime(win);
  assert.equal(el.hidden, true);
  assert.equal(win.timers.length, 0);
});
