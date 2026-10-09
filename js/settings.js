// Settings popover: theme, section navigation and motion radios, plus the terminal hint.
// theme-init.js has already applied the saved theme and motion before first paint. Every value is also held in
// memory, so the controls keep working when storage throws.
import { storage } from './storage.js';

const MOTIONS = ['system', 'reduce', 'full'];

export function applyMotion(value, doc = document) {
  const root = doc.documentElement;
  if (value === 'reduce' || value === 'full') root.setAttribute('data-motion', value);
  else root.removeAttribute('data-motion');
  doc.dispatchEvent(new CustomEvent('motion:change', { detail: { value } }));
}

// Turns the section rail on or off: saves the choice and tells the rail and the settings radios. Shared with
// the terminal's `nav` command so there is one way to do it.
export function applyNavSections(value, doc = document) {
  const next = value === 'off' ? 'off' : 'on';
  storage.set('nav-sections', next);
  doc.dispatchEvent(new CustomEvent('navsections:change', { detail: { value: next } }));
  return next;
}

export function initSettings(win = window) {
  const doc = win.document;
  const toggle = doc.querySelector('[data-settings-toggle]');
  const pop = doc.getElementById('settings-popover');
  if (!toggle || !pop) return null;

  const radios = name => Array.from(pop.querySelectorAll(`input[name="${name}"]`));
  let nav = storage.get('nav-sections', 'on') === 'off' ? 'off' : 'on';
  let motion = storage.get('motion', 'system');
  if (!MOTIONS.includes(motion)) motion = 'system';

  const check = (name, value) => radios(name).forEach(r => (r.checked = r.value === value));
  function sync() {
    check('settings-theme', win.__theme ? win.__theme.get() : 'dark');
    check('settings-nav', nav);
    check('settings-motion', motion);
  }

  const isOpen = () => !pop.hidden;

  function open() {
    if (isOpen()) return;
    sync();
    pop.hidden = false;
    try {
      pop.showPopover();
    } catch (e) {} // No native popover support: the hidden attribute alone controls it.
    toggle.setAttribute('aria-expanded', 'true');
    const first = pop.querySelector('input:checked') || pop.querySelector('input');
    if (first) first.focus({ preventScroll: true });
  }

  function close({ focus = false } = {}) {
    if (!isOpen()) return;
    try {
      pop.hidePopover();
    } catch (e) {}
    pop.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (focus) toggle.focus({ preventScroll: true });
  }

  toggle.addEventListener('click', () => (isOpen() ? close() : open()));

  doc.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isOpen()) {
      event.preventDefault();
      close({ focus: true });
    }
  });
  // Outside click closes it and returns focus to the chevron, unless the click landed on something focusable:
  // then that element takes focus as normal.
  const FOCUSABLE = 'a[href], button, input, select, textarea, summary, [tabindex]';
  doc.addEventListener('pointerdown', event => {
    if (!isOpen() || pop.contains(event.target) || toggle.contains(event.target)) return;
    const target = event.target instanceof win.Element ? event.target : null;
    close({ focus: !(target && target.closest(FOCUSABLE)) });
  });
  // So does tabbing out of it.
  pop.addEventListener('focusout', event => {
    const to = event.relatedTarget;
    if (to && !pop.contains(to) && !toggle.contains(to)) close();
  });

  pop.addEventListener('change', event => {
    const input = event.target;
    if (!(input instanceof win.HTMLInputElement)) return;
    if (input.name === 'settings-theme' && win.__theme) win.__theme.set(input.value);
    if (input.name === 'settings-nav') {
      nav = applyNavSections(input.value, doc);
    }
    if (input.name === 'settings-motion' && MOTIONS.includes(input.value)) {
      motion = input.value;
      storage.set('motion', motion);
      applyMotion(motion, doc);
    }
  });

  // The rail's own close button turns navigation off from outside this popover.
  doc.addEventListener('navsections:change', event => {
    nav = event.detail.value === 'off' ? 'off' : 'on';
    check('settings-nav', nav);
  });
  // The header sun/moon button changes the theme too. theme.js has already handled its click by now.
  doc.querySelectorAll('[data-theme-toggle]').forEach(btn => btn.addEventListener('click', sync));

  const hint = pop.querySelector('[data-terminal-open]');
  if (hint) {
    hint.addEventListener('click', () => {
      close();
      doc.dispatchEvent(new CustomEvent('terminal:open'));
    });
  }

  sync();
  return { open, close, isOpen };
}
