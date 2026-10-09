// Whether non-essential motion (autoplay, animation) is allowed right now.
// data-motion="reduce" or the OS reduced-motion setting turn it off; data-motion="full" opts back in.
export function motionAllowed(win = window) {
  const mode = win.document.documentElement.getAttribute('data-motion');
  if (mode === 'reduce') return false;
  if (mode === 'full') return true;
  try {
    return !win.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
    return true;
  }
}
