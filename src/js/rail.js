// Section rail (homepage only). The links work without JS; this adds the active section, the fade, the phone
// pill and the close button. "Hero scrolled out" and "section in view" both come from IntersectionObserver.
import { storage } from './storage.js';
import { motionAllowed } from './motion.js';

const IDLE_MS = 2000;
const TOAST = 'Section nav hidden. Turn it back on in settings.';
let closeToastShown = false; // The close toast shows once per page session, never again after.

export function initRail({ toast, win = window } = {}) {
  const doc = win.document;
  const rail = doc.querySelector('[data-rail]');
  if (!rail) return null;
  const toggle = rail.querySelector('[data-rail-toggle]');
  const closeBtn = rail.querySelector('[data-rail-close]');
  const links = Array.from(rail.querySelectorAll('[data-rail-id]'));
  const currentNum = rail.querySelector('[data-rail-current]');
  const wide = win.matchMedia('(min-width: 1024px)');

  let enabled = storage.get('nav-sections', 'on') !== 'off';
  let heroPast = false;
  let awake = true;
  let expanded = false;
  let timer = 0;

  const hasFocus = () => rail.matches(':focus-within');

  function render() {
    rail.hidden = !enabled;
    let state;
    if (!heroPast) state = 'away';
    else if (!motionAllowed(win) || awake || expanded || hasFocus()) state = 'shown';
    else state = 'idle';
    rail.setAttribute('data-state', state);
  }

  function wake() {
    awake = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      awake = false;
      if (rail.matches(':hover') || hasFocus()) return;
      render();
    }, IDLE_MS);
    render();
  }

  function setExpanded(value) {
    expanded = value;
    toggle.setAttribute('aria-expanded', String(value));
    rail.toggleAttribute('data-expanded', value);
    render();
  }

  function setCurrent(id) {
    links.forEach(link => {
      if (link.dataset.railId === id) {
        link.setAttribute('aria-current', 'location');
        if (currentNum) currentNum.textContent = link.querySelector('.rail__num').textContent;
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function hide() {
    const hadFocus = hasFocus();
    setExpanded(false);
    storage.set('nav-sections', 'off');
    doc.dispatchEvent(new CustomEvent('navsections:change', { detail: { value: 'off' } }));
    if (hadFocus) {
      const settings = doc.querySelector('[data-settings-toggle]');
      if (settings) settings.focus({ preventScroll: true });
      else doc.body.focus();
    }
    if (!closeToastShown && toast) {
      closeToastShown = true;
      toast(TOAST);
    }
  }

  doc.addEventListener('navsections:change', event => {
    enabled = event.detail.value !== 'off';
    if (enabled) wake();
    else setExpanded(false);
    render();
  });

  closeBtn.addEventListener('click', hide);
  toggle.addEventListener('click', () => setExpanded(!expanded));
  rail.addEventListener('click', event => {
    if (expanded && event.target.closest('.rail__link')) setExpanded(false);
  });

  // Escape only acts when focus is in the rail, so it never fights the settings popover or the CampSnap box.
  doc.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || event.defaultPrevented || !enabled || !hasFocus()) return;
    event.preventDefault();
    if (expanded) {
      setExpanded(false);
      toggle.focus({ preventScroll: true });
    } else {
      hide();
    }
  });
  doc.addEventListener('pointerdown', event => {
    if (expanded && !rail.contains(event.target)) setExpanded(false);
  });

  win.addEventListener('scroll', wake, { passive: true });
  rail.addEventListener('pointerenter', wake);
  rail.addEventListener('pointerleave', wake);
  rail.addEventListener('focusin', wake);
  rail.addEventListener('focusout', wake);
  doc.addEventListener('motion:change', render);
  // An OS reduced-motion change mid-session takes effect straight away.
  try {
    win.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', render);
  } catch (e) {}
  wide.addEventListener('change', () => {
    if (wide.matches) setExpanded(false);
  });

  if ('IntersectionObserver' in win) {
    const sections = links.map(link => doc.getElementById(link.dataset.railId)).filter(Boolean);
    const active = new win.IntersectionObserver(
      entries => {
        const hit = entries.filter(e => e.isIntersecting).pop();
        if (hit) setCurrent(hit.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach(section => active.observe(section));

    const hero = doc.getElementById('top');
    if (hero) {
      new win.IntersectionObserver(entries => {
        heroPast = !entries[entries.length - 1].isIntersecting;
        render();
      }).observe(hero);
    } else {
      heroPast = true;
    }
  } else {
    heroPast = true;
  }

  wake();
  return { hide, setCurrent };
}
