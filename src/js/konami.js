// The two ways into the hidden game: the Konami code on a keyboard, and seven taps on the footer logo on touch.
// The matcher and counter are pure so they can be tested; the DOM wiring sits underneath.
import { motionAllowed } from './motion.js';

export const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const TAP_TARGET = 7;
const TAP_RESET_MS = 1500;
// A lone click on the logo still goes home, after this pause that leaves room for a second tap.
const SINGLE_CLICK_MS = 500;

const norm = key => (key.length === 1 ? key.toLowerCase() : key);

export function createSequenceMatcher(sequence) {
  let index = 0;
  return {
    // True on the key that completes the sequence. A wrong key restarts, and counts as a first key if it is one.
    push(key) {
      const k = norm(key);
      if (k === norm(sequence[index])) index++;
      else index = k === norm(sequence[0]) ? 1 : 0;
      if (index === sequence.length) {
        index = 0;
        return true;
      }
      return false;
    },
  };
}

export function createTapCounter({ target = TAP_TARGET, resetMs = TAP_RESET_MS, now = Date.now } = {}) {
  let count = 0;
  let last = -Infinity;
  return {
    // Returns the running count; the tap that reaches the target returns it and the next one starts over.
    tap() {
      const t = now();
      if (t - last > resetMs || count >= target) count = 0;
      last = t;
      return ++count;
    },
  };
}

// The Android build-number nod: counting starts after the third tap.
export function tapsAwayMessage(count, target = TAP_TARGET) {
  const left = target - count;
  if (count < 3 || left < 1) return null;
  return `${left} ${left === 1 ? 'tap' : 'taps'} away from being a developer`;
}

// Loads the game on demand. game.js and the Silkscreen font are not requested until this runs.
export function openGame({ toast } = {}) {
  return import('/js/game.js')
    .then(m => m.openGame())
    .catch(() => {
      if (toast) toast('Could not load the game. Check your connection and try again.');
    });
}

const TYPING = 'input, textarea, select, [contenteditable=""], [contenteditable="true"]';

export function initKonami({ onTrigger, win = window }) {
  const matcher = createSequenceMatcher(KONAMI);
  win.document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
    const target = event.target;
    if (target && target.closest && target.closest(TYPING)) return;
    if (win.document.querySelector('dialog[open]')) return;
    if (matcher.push(event.key)) onTrigger();
  });
}

// The footer logo is a home link. A tap counter cannot also let every tap navigate, so the link keeps working
// for a single plain click (after a short pause) and is intercepted once taps pile up. Modified clicks pass through.
export function initLogoTaps({ toast, onTrigger, win = window }) {
  const doc = win.document;
  const logo = doc.getElementById('footer-logo');
  if (!logo) return null;
  const counter = createTapCounter();
  let timer = 0;

  logo.addEventListener('click', event => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    win.clearTimeout(timer);
    const count = counter.tap();
    if (count === TAP_TARGET) {
      onTrigger();
      return;
    }
    const message = tapsAwayMessage(count);
    if (message && toast) toast(message);
    if (count === 1) {
      timer = win.setTimeout(() => {
        if (win.location.pathname === '/' || win.location.pathname === '/index.html') {
          win.scrollTo({ top: 0, behavior: motionAllowed(win) ? 'smooth' : 'auto' });
        } else {
          win.location.assign(logo.href);
        }
      }, SINGLE_CLICK_MS);
    }
  });
  return { logo };
}
