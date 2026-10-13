import { motionAllowed } from './motion.js';

const SOUGHT = 'is-sought';
const HOLD_MS = 4000;

// Brings a card into view and marks it, then the link inside it the visitor is after. The marks
// drive a one-off sunrise in the CSS (day.css) and clear after a few seconds. Focus moves to the
// link, so a keyboard user lands on it too.
export function seek(card, link, win = window) {
  card.scrollIntoView({ behavior: motionAllowed(win) ? 'smooth' : 'auto', block: 'center' });
  card.classList.add(SOUGHT);
  if (link) {
    link.classList.add(SOUGHT);
    link.focus({ preventScroll: true });
  }
  win.setTimeout(() => {
    card.classList.remove(SOUGHT);
    if (link) link.classList.remove(SOUGHT);
  }, HOLD_MS);
}

// A link from another page to /#project-<slug> arrives here: seek that card and its first link.
export function seekFromHash(win = window) {
  const hash = win.location.hash;
  if (!hash.startsWith('#project-')) return false;
  const card = win.document.getElementById(hash.slice(1));
  if (!card) return false;
  seek(card, card.querySelector('.project-link'), win);
  return true;
}
