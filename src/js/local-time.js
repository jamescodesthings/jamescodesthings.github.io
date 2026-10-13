// James's local time in the status pill ("· 19:32 local"), so a visitor in another zone can tell
// when a reply is likely. The slot ships hidden and empty; without JS the pill reads as before.

export function formatLocalTime(date, timeZone) {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone }).format(
    date,
  );
}

export function initLocalTime(win = window) {
  const el = win.document.querySelector('[data-local-time]');
  if (!el) return;
  const tz = el.dataset.tz;
  const render = () => {
    const now = new win.Date();
    el.textContent = ` · ${formatLocalTime(now, tz)} local`;
    el.setAttribute('datetime', now.toISOString());
  };
  try {
    render();
  } catch {
    // An unknown zone throws a RangeError; better no time than a wrong one.
    return;
  }
  el.hidden = false;
  // Tick on the minute boundary so the clock never shows a stale minute.
  win.setTimeout(
    () => {
      render();
      win.setInterval(render, 60000);
    },
    60000 - (win.Date.now() % 60000),
  );
}
