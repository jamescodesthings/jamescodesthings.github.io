// Terminal mode: a command palette in a <dialog>, built as an accessible combobox (input plus listbox).
// Loaded on demand from main.js. The command table and parser are shared with the tests (/js/terminal-lib.js is a
// build-time copy of src/lib/terminal.js); site copy (bio, email) arrives from the page as JSON, not from here.
import { parseCommand, resolveCommand, COMMANDS } from '/js/terminal-lib.js';
import { session } from './storage.js';
import { copyText } from './copy-email.js';
import { applyNavSections } from './settings.js';
import { motionAllowed } from './motion.js';
import { openGame } from './konami.js';
import { toast } from './toast.js';

const HISTORY_KEY = 'terminal-history';
const HISTORY_MAX = 50;

// Commands that need an argument. Choosing one of these completes it and waits; the rest run straight away.
const ARGUMENTS = { theme: ['dark', 'light', 'system'], nav: ['on', 'off'] };
const argumentCandidates = () =>
  Object.entries(ARGUMENTS).flatMap(([cmd, values]) =>
    values.map(v => ({ name: `${cmd} ${v}`, description: `${cmd} ${v}` })),
  );

let dialog = null;
let ui = null;
let opener = null;
let history = [];
let historyIndex = 0; // history.length means "the line being typed"
let draft = '';
let options = [];
let active = -1;

function readContext(doc) {
  try {
    return JSON.parse(doc.getElementById('site-data').textContent) || {};
  } catch (e) {
    return {};
  }
}

function loadHistory() {
  try {
    const list = JSON.parse(session.get(HISTORY_KEY, '[]'));
    return Array.isArray(list) ? list.filter(x => typeof x === 'string').slice(-HISTORY_MAX) : [];
  } catch (e) {
    return [];
  }
}

function remember(line) {
  if (history[history.length - 1] !== line) history.push(line);
  history = history.slice(-HISTORY_MAX);
  session.set(HISTORY_KEY, JSON.stringify(history));
}

function build(doc) {
  const el = doc.createElement('dialog');
  el.className = 'terminal';
  el.setAttribute('aria-label', 'Terminal');
  el.innerHTML = `
    <div class="terminal__bar">
      <span class="terminal__title" aria-hidden="true">codesthings ~ terminal</span>
      <button type="button" class="terminal__close" aria-label="Close terminal">Esc</button>
    </div>
    <div class="terminal__log" role="log" aria-live="polite" aria-label="Terminal output"></div>
    <form class="terminal__form" autocomplete="off">
      <label class="terminal__prompt" for="terminal-input"><span aria-hidden="true">$</span><span class="visually-hidden">Command</span></label>
      <input id="terminal-input" class="terminal__input" type="text" role="combobox" aria-expanded="false"
        aria-controls="terminal-options" aria-autocomplete="list" aria-describedby="terminal-help"
        autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go" />
      <ul id="terminal-options" class="terminal__options" role="listbox" aria-label="Commands" hidden></ul>
    </form>
    <p id="terminal-help" class="terminal__hint">Type help for commands. Up and Down browse suggestions or history, Tab completes, Esc closes.</p>`;
  doc.body.appendChild(el);
  return {
    log: el.querySelector('.terminal__log'),
    form: el.querySelector('.terminal__form'),
    input: el.querySelector('.terminal__input'),
    list: el.querySelector('.terminal__options'),
    close: el.querySelector('.terminal__close'),
    el,
  };
}

function print(text, className) {
  for (const line of String(text).split('\n')) {
    const p = ui.el.ownerDocument.createElement('p');
    p.className = className ? `terminal__line ${className}` : 'terminal__line';
    p.textContent = line;
    ui.log.appendChild(p);
  }
  ui.log.scrollTop = ui.log.scrollHeight;
}

function setActive(index) {
  active = index;
  options.forEach((li, i) => li.setAttribute('aria-selected', String(i === index)));
  const current = options[index];
  if (current) {
    ui.input.setAttribute('aria-activedescendant', current.id);
    current.scrollIntoView({ block: 'nearest' });
  } else {
    ui.input.removeAttribute('aria-activedescendant');
  }
}

function hideOptions() {
  ui.list.hidden = true;
  ui.list.replaceChildren();
  options = [];
  ui.input.setAttribute('aria-expanded', 'false');
  setActive(-1);
}

// Suggestions are commands whose name starts with what has been typed; an empty line suggests them all
// only when asked (ArrowDown).
function showOptions(all = false) {
  // Keeps one trailing space: "theme " asks for the arguments, "theme" for the command.
  const typed = ui.input.value.toLowerCase().replace(/^\s+/, '').replace(/\s+/g, ' ');
  if (!typed.trim() && !all) return hideOptions();
  const candidates = [...COMMANDS, ...argumentCandidates().filter(c => typed.startsWith(c.name.split(' ')[0] + ' '))];
  const matches = candidates.filter(c => c.name.startsWith(typed) && c.name !== typed);
  if (!matches.length) return hideOptions();
  const doc = ui.el.ownerDocument;
  options = matches.map((c, i) => {
    const li = doc.createElement('li');
    li.id = `terminal-option-${i}`;
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', 'false');
    li.dataset.value = c.name;
    if (Object.hasOwn(ARGUMENTS, c.name)) li.dataset.partial = ''; // takes arguments: complete, do not run
    li.innerHTML = '<span class="terminal__opt-name"></span><span class="terminal__opt-desc"></span>';
    li.firstChild.textContent = c.name;
    li.lastChild.textContent = c.description;
    return li;
  });
  ui.list.replaceChildren(...options);
  ui.list.hidden = false;
  ui.input.setAttribute('aria-expanded', 'true');
  setActive(-1);
}

// Takes a suggestion: argument-taking commands are completed with a trailing space and focus stays in the input
// (with the argument suggestions showing); everything else runs.
function accept(li, win) {
  const input = ui.input;
  hideOptions();
  if (li.dataset.partial !== undefined) {
    input.value = `${li.dataset.value} `;
    input.focus();
    showOptions();
    return;
  }
  input.value = li.dataset.value;
  run(input.value, win);
  input.value = '';
  draft = '';
  input.focus();
}

function go(value, win) {
  const doc = win.document;
  const hash = value.startsWith('/#') ? value.slice(2) : null;
  const target = hash && win.location.pathname === '/' ? doc.getElementById(hash) : null;
  close();
  if (target) {
    target.scrollIntoView({ behavior: motionAllowed(win) ? 'smooth' : 'auto' });
    try {
      win.history.replaceState(null, '', value);
    } catch (e) {}
  } else {
    win.location.assign(value);
  }
}

async function run(line, win) {
  print(`$ ${line}`, 'terminal__echo');
  if (line.trim()) remember(line.trim());
  historyIndex = history.length;
  const ctx = readContext(win.document);
  const result = resolveCommand(parseCommand(line), ctx);
  switch (result.action) {
    case 'print':
      if (result.output) print(result.output);
      break;
    case 'navigate':
      go(result.value, win);
      break;
    case 'theme':
      if (win.__theme) win.__theme.set(result.value);
      print(`Theme set to ${result.value}.`);
      break;
    case 'nav':
      applyNavSections(result.value, win.document);
      print(`Section navigation ${result.value}.`);
      break;
    case 'copy':
      print(
        (await copyText(result.value, win))
          ? `Copied ${result.value} to the clipboard.`
          : `Could not copy. It is ${result.value}.`,
      );
      break;
    case 'play':
      close();
      // After the terminal has handed focus back, so the game returns it to the same place.
      win.setTimeout(() => openGame({ toast }), 0);
      break;
    case 'close':
      close();
      break;
  }
}

export function close() {
  if (!dialog || !dialog.open) return;
  dialog.close();
  if (opener && opener.isConnected && typeof opener.focus === 'function') opener.focus({ preventScroll: true });
  opener = null;
}

function onKeydown(event, win) {
  const { input } = ui;
  switch (event.key) {
    case 'Escape':
      event.preventDefault(); // handled here, so the CampSnap button's document-level Escape stands down
      if (!ui.list.hidden) hideOptions();
      else close();
      break;
    case 'ArrowDown':
    case 'ArrowUp': {
      const down = event.key === 'ArrowDown';
      event.preventDefault();
      if (!ui.list.hidden) {
        const n = options.length;
        setActive(down ? (active + 1) % n : (active - 1 + n) % n);
      } else if (!down) {
        // Up with no suggestions open walks back through history.
        if (!history.length) return;
        if (historyIndex === history.length) draft = input.value;
        historyIndex = Math.max(0, historyIndex - 1);
        input.value = history[historyIndex];
      } else if (historyIndex < history.length) {
        historyIndex++;
        input.value = historyIndex === history.length ? draft : history[historyIndex];
      } else if (input.value.trim() === '') {
        showOptions(true); // Down on an empty line offers every command
      }
      break;
    }
    case 'Tab': {
      if (ui.list.hidden) return; // nothing to complete: Tab moves focus as normal
      event.preventDefault();
      const pick = options[active >= 0 ? active : 0];
      hideOptions();
      input.value = pick.dataset.value + (pick.dataset.partial !== undefined ? ' ' : '');
      if (pick.dataset.partial !== undefined) showOptions();
      break;
    }
    case 'Enter':
      event.preventDefault();
      if (active >= 0 && options[active]) return accept(options[active], win);
      hideOptions();
      run(input.value, win);
      input.value = '';
      draft = '';
      break;
  }
}

function init(win) {
  const doc = win.document;
  ui = build(doc);
  dialog = ui.el;
  history = loadHistory();
  historyIndex = history.length;

  ui.input.addEventListener('keydown', event => onKeydown(event, win));
  ui.input.addEventListener('input', () => {
    historyIndex = history.length;
    showOptions();
  });
  ui.form.addEventListener('submit', event => event.preventDefault());
  ui.list.addEventListener('pointerdown', event => event.preventDefault()); // keep focus in the input
  ui.list.addEventListener('click', event => {
    const li = event.target.closest('[role="option"]');
    if (li) accept(li, win);
  });
  ui.close.addEventListener('click', close);
  // The native Escape path: take it over so focus handling is ours and the event is marked handled.
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    if (!ui.list.hidden) hideOptions();
    else close();
  });
  // A click on the backdrop (the dialog element itself) closes it.
  dialog.addEventListener('click', event => {
    if (event.target === dialog) close();
  });
  print('Type help to see what this does.');
}

export function openTerminal(win = window) {
  if (!dialog) init(win);
  if (dialog.open) return;
  opener = win.document.activeElement;
  dialog.showModal();
  ui.input.value = '';
  hideOptions();
  ui.input.focus();
}
