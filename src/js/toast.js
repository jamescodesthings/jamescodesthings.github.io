// One shared polite live region for short messages. Re-exported from main.js; later tasks reuse it.
let region = null;
let timer = 0;

function ensureRegion(doc) {
  if (region && region.isConnected) return region;
  region = doc.createElement('div');
  region.className = 'toast-region';
  region.setAttribute('role', 'status');
  region.setAttribute('aria-live', 'polite');
  doc.body.appendChild(region);
  return region;
}

// Creates the (empty) region early so screen readers have it registered before the first message.
export function initToast(doc = document) {
  ensureRegion(doc);
}

export function toast(message, { duration = 5000, doc = document } = {}) {
  const el = ensureRegion(doc);
  clearTimeout(timer);
  el.textContent = '';
  el.removeAttribute('data-visible');
  // Set the text on a later task so the live region sees a change even for a repeated message.
  setTimeout(() => {
    el.textContent = message;
    el.setAttribute('data-visible', '');
  }, 50);
  timer = setTimeout(() => {
    el.removeAttribute('data-visible');
    setTimeout(() => {
      if (!el.hasAttribute('data-visible')) el.textContent = '';
    }, 300);
  }, duration);
}
