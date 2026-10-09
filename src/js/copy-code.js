// Reveals the copy button on each code block and copies the block's text. The icon swaps to a tick for 2s.
async function writeText(text, win) {
  if (win.navigator.clipboard && win.navigator.clipboard.writeText) {
    await win.navigator.clipboard.writeText(text);
    return;
  }
  throw new Error('Clipboard unavailable');
}

// Last resort when the Clipboard API is missing or refuses: select the code so Ctrl/Cmd+C finishes it.
function selectContents(pre, win) {
  const range = win.document.createRange();
  range.selectNodeContents(pre);
  const selection = win.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

export function initCopyCode(win = window) {
  const doc = win.document;
  doc.querySelectorAll('.code-block').forEach(block => {
    const button = block.querySelector('[data-copy-button]');
    const pre = block.querySelector('pre[data-copy]');
    if (!button || !pre) return;
    const status = button.querySelector('[role="status"]');
    let timer = null;
    button.hidden = false;
    button.addEventListener('click', async () => {
      try {
        await writeText(pre.textContent, win);
      } catch (e) {
        selectContents(pre, win);
        if (status) status.textContent = 'Press copy to finish';
        return;
      }
      button.classList.add('is-copied');
      button.setAttribute('aria-label', 'Copied');
      if (status) status.textContent = 'Copied to clipboard';
      win.clearTimeout(timer);
      timer = win.setTimeout(() => {
        button.classList.remove('is-copied');
        button.setAttribute('aria-label', 'Copy code');
        if (status) status.textContent = '';
      }, 2000);
    });
  });
}
