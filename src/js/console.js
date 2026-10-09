// The same banner as the HTML comment at the top of the page source, once per page load, with the CV link, the
// terminal hint and the build stamp. The banner text is read from that comment so the copy lives in one place
// (sections/banner.ejs).
function sourceBanner(doc) {
  for (const node of doc.childNodes) {
    if (node.nodeType === 8) return node.data.replace(/^\n+|\s+$/g, '');
  }
  return '';
}

export function initConsole(win = window) {
  if (win.__ctBanner) return;
  win.__ctBanner = true;
  const doc = win.document;
  const log = win.console && win.console.log;
  if (!log) return;

  const accent = win.getComputedStyle(doc.documentElement).getPropertyValue('--color-accent').trim();
  const style = accent ? `color: ${accent}; font-family: monospace;` : 'font-family: monospace;';
  const banner = sourceBanner(doc);
  if (banner) log.call(win.console, `%c${banner}`, style);

  log.call(win.console, `CV: ${win.location.origin}/cv`);
  log.call(win.console, 'Press ` for terminal mode.');

  const stamp = doc.querySelector('.footer-meta a');
  if (stamp) log.call(win.console, `Build: ${stamp.textContent.replace(/\s+/g, ' ').trim()} ${stamp.href}`);
}
