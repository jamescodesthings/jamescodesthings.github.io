import { initTheme } from './theme.js';
import { initCopyEmail } from './copy-email.js';
import { initVideos } from './video.js';
import { initFab } from './fab.js';

initTheme();
initCopyEmail();
initVideos();
initFab();

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
