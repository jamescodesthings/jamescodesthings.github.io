import { initTheme } from './theme.js';
import { initCopyEmail } from './copy-email.js';
import { initVideos } from './video.js';
import { initFab } from './fab.js';
import { initSettings } from './settings.js';
import { initRail } from './rail.js';
import { initToast, toast } from './toast.js';
import { initKonami, initLogoTaps, openGame } from './konami.js';
import { initConsole } from './console.js';

export { toast };

initToast();
initTheme();
initSettings();
initRail({ toast });
initCopyEmail();
initVideos();
// After the settings popover and the rail, so their Escape handlers run first and mark the event handled.
initFab();

// Easter eggs. Terminal mode loads on first use; the game (and its font) only when triggered.
const openTerminal = () => import('./terminal.js').then(m => m.openTerminal());
const playGame = () => openGame({ toast });
document.addEventListener('terminal:open', openTerminal);
document.addEventListener('keydown', event => {
  if (event.key !== '`' || event.ctrlKey || event.metaKey || event.altKey || event.defaultPrevented) return;
  const target = event.target;
  // Backtick inside a form field is just a backtick.
  if (
    target &&
    target.closest &&
    target.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]')
  )
    return;
  if (document.querySelector('dialog[open]')) return;
  event.preventDefault();
  openTerminal();
});
initKonami({ onTrigger: playGame });
initLogoTaps({ toast, onTrigger: playGame });
initConsole();

// Post pages only: the table of contents, code copy buttons and the video facade.
if (document.querySelector('.post-body')) {
  Promise.all([import('./toc.js'), import('./copy-code.js'), import('./yt-facade.js')]).then(([toc, copy, yt]) => {
    toc.initToc();
    copy.initCopyCode();
    yt.initYoutubeFacades();
  });
}

// Phone nav collapses into a <details> menu; from 768px it sits inline.
const menu = document.querySelector('.site-menu');
if (menu) {
  const wide = window.matchMedia('(min-width: 768px)');
  const sync = () => {
    if (wide.matches) {
      menu.open = true;
      menu.setAttribute('data-inline', '');
    } else {
      menu.open = false;
      menu.removeAttribute('data-inline');
    }
  };
  sync();
  wide.addEventListener('change', sync);

  menu.addEventListener('click', event => {
    if (!wide.matches && event.target.closest('a')) menu.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !wide.matches && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
}
