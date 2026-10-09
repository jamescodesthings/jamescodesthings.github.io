const RESET_MS = 2000;

// Copies the address. Resolves true on success; false means the caller should fall back to mailto.
export async function copyText(text, win = window) {
  try {
    if (!win.navigator.clipboard || !win.navigator.clipboard.writeText) return false;
    await win.navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}

// Every [data-copy-email] link is a plain mailto link that copies instead when it can.
export function initCopyEmail(win = window) {
  win.document.querySelectorAll('[data-copy-email]').forEach(el => {
    const email = el.getAttribute('data-copy-email');
    const label = el.querySelector('[data-copy-label]');
    const status = el.parentElement.querySelector('[data-copy-status]');
    let timer;

    el.addEventListener('click', async event => {
      if (!win.navigator.clipboard) return; // no clipboard: let the mailto link open
      event.preventDefault();
      if (!(await copyText(email, win))) {
        win.location.href = `mailto:${email}`;
        return;
      }
      el.classList.add('is-copied');
      if (label) label.textContent = 'Copied';
      if (status) status.textContent = `Email address ${email} copied to clipboard`;
      win.clearTimeout(timer);
      timer = win.setTimeout(() => {
        el.classList.remove('is-copied');
        if (label) label.textContent = 'Email';
        if (status) status.textContent = '';
      }, RESET_MS);
    });
  });
}
