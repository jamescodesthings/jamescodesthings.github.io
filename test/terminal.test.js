import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCommand, resolveCommand, COMMANDS } from '../src/lib/terminal.js';

const run = (input, ctx) => resolveCommand(parseCommand(input), ctx);

test('parseCommand trims, lowercases and splits on whitespace', () => {
  assert.deepEqual(parseCommand('  Theme DARK '), { name: 'theme', args: ['dark'] });
  assert.deepEqual(parseCommand('sudo   hire   james'), { name: 'sudo', args: ['hire', 'james'] });
  assert.deepEqual(parseCommand(''), { name: '', args: [] });
  assert.deepEqual(parseCommand(undefined), { name: '', args: [] });
});

test('theme accepts dark, light and system', () => {
  for (const value of ['dark', 'light', 'system']) {
    assert.deepEqual(run(`theme ${value}`), { action: 'theme', value });
  }
});

test('theme with a bad or missing value prints usage', () => {
  for (const input of ['theme purple', 'theme']) {
    const result = run(input);
    assert.equal(result.action, 'print');
    assert.match(result.output, /usage: theme dark\|light\|system/i);
  }
});

test('nav accepts on and off, and prints usage otherwise', () => {
  assert.deepEqual(run('nav on'), { action: 'nav', value: 'on' });
  assert.deepEqual(run('nav off'), { action: 'nav', value: 'off' });
  assert.match(run('nav maybe').output, /usage: nav on\|off/i);
});

test('sudo hire james navigates to the CV', () => {
  assert.deepEqual(run('sudo hire james'), { action: 'navigate', value: '/cv' });
  assert.deepEqual(run('SUDO Hire James'), { action: 'navigate', value: '/cv' });
});

test('other sudo commands are refused, not treated as unknown', () => {
  const result = run('sudo rm -rf');
  assert.equal(result.action, 'print');
  assert.match(result.output, /sudo hire james/);
});

test('page commands navigate', () => {
  const paths = {
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
  for (const [name, value] of Object.entries(paths)) {
    assert.deepEqual(run(name), { action: 'navigate', value });
  }
});

test('email copies the address from the context', () => {
  assert.deepEqual(run('email', { email: 'a@b.co' }), { action: 'copy', value: 'a@b.co' });
});

test('whoami prints the bio from the context', () => {
  assert.deepEqual(run('whoami', { bio: 'Hello there.' }), { action: 'print', output: 'Hello there.' });
});

test('play and exit', () => {
  assert.deepEqual(run('play'), { action: 'play' });
  assert.deepEqual(run('exit'), { action: 'close' });
});

test('unknown commands print the not-found line', () => {
  assert.deepEqual(run('xyz'), { action: 'print', output: 'command not found: xyz. Try help.' });
  assert.equal(run('XYZ foo').output, 'command not found: xyz. Try help.');
});

test('help lists every command name', () => {
  const result = run('help');
  assert.equal(result.action, 'print');
  for (const { name } of COMMANDS) assert.ok(result.output.includes(name), `help is missing ${name}`);
});

test('the empty string is a no-op print', () => {
  assert.deepEqual(run(''), { action: 'print', output: '' });
  assert.deepEqual(run('   '), { action: 'print', output: '' });
});

test('every COMMANDS entry has a name and a description', () => {
  for (const c of COMMANDS) {
    assert.equal(typeof c.name, 'string');
    assert.ok(c.description.length > 0);
  }
});
