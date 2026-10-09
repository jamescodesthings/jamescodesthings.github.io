// Terminal mode command parser. Pure and browser-safe: the build copies this file to public/js/terminal-lib.js
// so the client imports the same code the tests run. No DOM, no storage, no imports.

export const COMMANDS = Object.freeze([
  { name: 'help', description: 'list the commands' },
  { name: 'cv', description: 'open the CV' },
  { name: 'blog', description: 'read the blog' },
  { name: 'now', description: 'what I am doing at the moment' },
  { name: 'uses', description: 'gear and software I use' },
  { name: 'colophon', description: 'how this site is made' },
  { name: 'projects', description: 'all projects' },
  { name: 'work', description: 'jump to the Work section' },
  { name: 'make', description: 'jump to the Make section' },
  { name: 'photos', description: 'jump to the Photos section' },
  { name: 'email', description: 'copy my email address' },
  { name: 'theme', description: 'theme dark|light|system' },
  { name: 'nav', description: 'nav on|off, the section navigation' },
  { name: 'play', description: 'play the game' },
  { name: 'whoami', description: 'a one-line bio' },
  { name: 'sudo hire james', description: 'open the CV, politely' },
  { name: 'exit', description: 'close the terminal' },
]);

const PAGES = {
  cv: '/cv',
  blog: '/blog/',
  now: '/now',
  uses: '/uses',
  colophon: '/colophon',
  projects: '/projects/',
  work: '/#work',
  make: '/#make',
  photos: '/#photos',
};

const THEMES = ['dark', 'light', 'system'];
const NAV = ['on', 'off'];

// Trimmed, lowercased, split on whitespace. Empty or non-string input gives an empty name.
export function parseCommand(input) {
  const words = String(input ?? '')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  return { name: words[0] || '', args: words.slice(1) };
}

function helpText() {
  const width = Math.max(...COMMANDS.map(c => c.name.length));
  return COMMANDS.map(c => `${c.name.padEnd(width)}  ${c.description}`).join('\n');
}

// `context` carries site copy the pure module must not hold itself: { bio, email }.
export function resolveCommand({ name, args }, context = {}) {
  if (!name) return { action: 'print', output: '' };
  if (Object.hasOwn(PAGES, name)) return { action: 'navigate', value: PAGES[name] };

  switch (name) {
    case 'help':
      return { action: 'print', output: helpText() };
    case 'theme':
      return THEMES.includes(args[0]) && args.length === 1
        ? { action: 'theme', value: args[0] }
        : { action: 'print', output: 'Usage: theme dark|light|system' };
    case 'nav':
      return NAV.includes(args[0]) && args.length === 1
        ? { action: 'nav', value: args[0] }
        : { action: 'print', output: 'Usage: nav on|off' };
    case 'email':
      return context.email
        ? { action: 'copy', value: context.email }
        : { action: 'print', output: 'email: no address available' };
    case 'whoami':
      return { action: 'print', output: context.bio || 'whoami: nobody knows' };
    case 'play':
      return { action: 'play' };
    case 'exit':
      return { action: 'close' };
    case 'sudo':
      return args.join(' ') === 'hire james'
        ? { action: 'navigate', value: '/cv' }
        : { action: 'print', output: 'sudo: you are not in the sudoers file. Try sudo hire james.' };
    default:
      return { action: 'print', output: `command not found: ${name}. Try help.` };
  }
}
