import { playVideo, pauseVideo } from './video.js';

const KEY = 'campsnapFabDismissed';
const MIN_AUTO_OPEN_WIDTH = 480;

function wasShown(win) {
  try {
    return win.localStorage.getItem(KEY) === 'true';
  } catch (e) {
    return false;
  }
}

function markShown(win) {
  try {
    win.localStorage.setItem(KEY, 'true');
  } catch (e) {}
}

// The CampSnap button. It auto-opens once per visitor (never under 480px wide), closes only through its
// close button, Escape or its own button, moves focus in on open and back on close.
export function initFab(win = window) {
  const doc = win.document;
  const fab = doc.getElementById('campsnapFab');
  const btn = doc.getElementById('campsnapFabBtn');
  const popover = doc.getElementById('campsnapPopover');
  const closeBtn = doc.getElementById('campsnapClose');
  if (!fab || !btn || !popover || !closeBtn) return null;
  const video = popover.querySelector('video');

  const isOpen = () => !popover.hidden;

  function open() {
    if (isOpen()) return;
    popover.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    closeBtn.focus({ preventScroll: true });
    if (video) playVideo(video, win);
  }

  function close() {
    if (!isOpen()) return;
    popover.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    if (video) pauseVideo(video);
    btn.focus({ preventScroll: true });
    markShown(win);
  }

  btn.addEventListener('click', () => (isOpen() ? close() : open()));
  closeBtn.addEventListener('click', close);
  doc.addEventListener('keydown', event => {
    if (event.key === 'Escape') close();
  });

  // Auto-open once. The flag is written on open, so a reload does not repeat it. If storage throws the
  // flag cannot persist, so it falls back to once per page load.
  if (win.innerWidth >= MIN_AUTO_OPEN_WIDTH && !wasShown(win)) {
    open();
    markShown(win);
  }
  return { open, close, isOpen };
}
