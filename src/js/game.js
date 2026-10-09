// Hidden game: canvas Space Invaders in a <dialog>. Lazy-loaded by konami.js; nothing in the main bundle imports it.
// Colours come from the CSS tokens at game start. The Silkscreen face is loaded here, through the FontFace API.
import { storage } from './storage.js';
import { motionAllowed } from './motion.js';

const W = 240;
const H = 300;
const STEP = 1000 / 60;
const FONT_URL = '/assets/fonts/Silkscreen-Regular.woff2';
const HIGH_KEY = 'invaders-high';

const COLS = 8;
const ROWS = 4;
const CELL_W = 22;
const CELL_H = 18;
const SPRITE = 2; // sprite pixel size in canvas pixels
const PLAYER_Y = H - 30;

const SQUID = [
  ['...XX...', '..XXXX..', '.XXXXXX.', 'XX.XX.XX', 'XXXXXXXX', '..X..X..', '.X.XX.X.', 'X.X..X.X'],
  ['...XX...', '..XXXX..', '.XXXXXX.', 'XX.XX.XX', 'XXXXXXXX', '.X.XX.X.', 'X..XX..X', '.X....X.'],
];
const CRAB = [
  ['..X..X..', 'X.XXXX.X', 'XXXXXXXX', 'XXX..XXX', 'XXXXXXXX', '.XXXXXX.', '..X..X..', '.X....X.'],
  ['..X..X..', '..XXXX..', 'XXXXXXXX', 'XXX..XXX', 'XXXXXXXX', '.XXXXXX.', '.X.XX.X.', 'X......X'],
];
const SHIP = ['.....X.....', '....XXX....', '.XXXXXXXXX.', 'XXXXXXXXXXX', 'XXXXXXXXXXX'];
const ROW_SPRITES = [SQUID, SQUID, CRAB, CRAB];

let dialog = null;
let ui = null;
let game = null;
let colours = null;
let opener = null;
let fontPromise = null;

function loadFont(doc) {
  if (fontPromise) return fontPromise;
  try {
    const face = new FontFace('Silkscreen', `url(${FONT_URL}) format("woff2")`, { display: 'swap' });
    const timeout = new Promise(resolve => setTimeout(resolve, 1500));
    fontPromise = Promise.race([
      face.load().then(loaded => {
        doc.fonts.add(loaded);
      }),
      timeout,
    ]).catch(() => {}); // The monospace fallback in the CSS and canvas font stack carries on.
  } catch (e) {
    fontPromise = Promise.resolve();
  }
  return fontPromise;
}

function readColours(win) {
  const style = win.getComputedStyle(win.document.documentElement);
  const token = name => style.getPropertyValue(`--color-${name}`).trim();
  return {
    bg: token('bg'),
    border: token('border'),
    text: token('text'),
    muted: token('muted'),
    accent: token('accent'),
    strong: token('accent-strong'),
  };
}

const highScore = () => Math.max(0, parseInt(storage.get(HIGH_KEY, '0'), 10) || 0);
const pad = n => String(n).padStart(6, '0');

function build(doc) {
  const el = doc.createElement('dialog');
  el.className = 'game';
  el.setAttribute('aria-labelledby', 'game-title');
  el.setAttribute('aria-describedby', 'game-keys');
  el.innerHTML = `
    <div class="game__bar">
      <h2 id="game-title" class="game__title">Invaders</h2>
      <button type="button" class="game__close" data-game-close aria-label="Close game">Esc</button>
    </div>
    <p class="game__hud"><span data-hud-score></span><span data-hud-high></span><span data-hud-lives></span></p>
    <canvas class="game__canvas" width="${W}" height="${H}" tabindex="0" role="application"
      aria-label="Invaders game area. Arrow keys move, space fires, P pauses, Escape closes."></canvas>
    <div class="game__controls">
      <button type="button" class="game__btn" data-hold="left">Left</button>
      <button type="button" class="game__btn game__btn--fire" data-act="fire">Fire</button>
      <button type="button" class="game__btn" data-hold="right">Right</button>
      <button type="button" class="game__btn game__btn--small" data-act="pause">Pause</button>
    </div>
    <p id="game-keys" class="game__keys">Arrow keys move, space fires, P pauses, Esc closes. On touch, use the buttons or tap the screen to fire.</p>
    <p class="visually-hidden" role="status" aria-live="polite" data-game-status></p>`;
  doc.body.appendChild(el);
  const q = s => el.querySelector(s);
  return {
    el,
    canvas: q('canvas'),
    score: q('[data-hud-score]'),
    high: q('[data-hud-high]'),
    lives: q('[data-hud-lives]'),
    status: q('[data-game-status]'),
    pauseBtn: q('[data-act="pause"]'),
  };
}

function newWave(g) {
  g.aliens = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) g.aliens.push({ r, c, alive: true });
  }
  g.gridX = 20;
  g.gridY = 34 + Math.min(g.wave - 1, 4) * 8;
  g.dir = 1;
  g.frame = 0;
  g.stepClock = 0;
  g.fireClock = 0;
  g.shot = null;
  g.bombs = [];
}

function freshGame(win) {
  const slow = !motionAllowed(win);
  const g = {
    state: slow ? 'paused' : 'playing',
    speed: slow ? 0.5 : 1,
    score: 0,
    lives: 3,
    wave: 1,
    px: W / 2,
    hit: 0,
    left: false,
    right: false,
    wantFire: false,
    acc: 0,
    last: 0,
    raf: 0,
    saved: highScore(),
  };
  newWave(g);
  return g;
}

function say(text) {
  // A new text node each time so a repeated message is announced again.
  ui.status.textContent = '';
  setTimeout(() => {
    ui.status.textContent = text;
  }, 50);
}

function saveHigh() {
  if (game.score > game.saved) {
    game.saved = game.score;
    storage.set(HIGH_KEY, game.saved);
  }
}

function hud() {
  ui.score.textContent = `SCORE ${pad(game.score)}`;
  ui.high.textContent = `HI ${pad(Math.max(game.saved, game.score))}`;
  ui.lives.textContent = `LIVES ${game.lives}`;
}

const alive = () => game.aliens.filter(a => a.alive);
const alienX = a => game.gridX + a.c * CELL_W;
const alienY = a => game.gridY + a.r * CELL_H;
const overlap = (ax, ay, aw, ah, bx, by, bw, bh) => ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;

function update(dtMs) {
  const g = game;
  const dt = (dtMs / 1000) * g.speed;
  const live = alive();

  // Player
  const move = (g.right ? 1 : 0) - (g.left ? 1 : 0);
  g.px = Math.max(12, Math.min(W - 12, g.px + move * 110 * dt));
  if (g.wantFire && !g.shot) g.shot = { x: g.px, y: PLAYER_Y - 4 };
  g.wantFire = false;
  if (g.hit > 0) g.hit -= dt;

  // Player shot
  if (g.shot) {
    g.shot.y -= 240 * dt;
    if (g.shot.y < 0) g.shot = null;
    else {
      for (const a of live) {
        if (overlap(g.shot.x - 1, g.shot.y, 2, 6, alienX(a) + 2, alienY(a) + 2, 16, 14)) {
          a.alive = false;
          g.shot = null;
          g.score += (ROWS - a.r) * 10;
          hud();
          break;
        }
      }
    }
  }

  // Aliens march faster as they thin out
  const left = alive();
  if (left.length === 0) {
    g.wave++;
    saveHigh();
    newWave(g);
    say(`Wave ${g.wave}`);
    return;
  }
  g.stepClock += dt * 1000;
  const interval = Math.max(55, (40 + left.length * 22) / (1 + (g.wave - 1) * 0.12));
  if (g.stepClock >= interval) {
    g.stepClock = 0;
    g.frame = 1 - g.frame;
    const minC = Math.min(...left.map(a => a.c));
    const maxC = Math.max(...left.map(a => a.c));
    const nextX = g.gridX + g.dir * 4;
    if (nextX + minC * CELL_W < 6 || nextX + maxC * CELL_W + 18 > W - 6) {
      g.dir = -g.dir;
      g.gridY += 8;
    } else g.gridX = nextX;
  }
  const lowest = Math.max(...left.map(a => alienY(a)));
  if (lowest + 16 >= PLAYER_Y - 4) return end('The invaders landed');

  // Alien bombs
  g.fireClock += dt * 1000;
  const every = Math.max(350, 1000 - g.wave * 70);
  if (g.fireClock >= every && g.bombs.length < 3) {
    g.fireClock = 0;
    const cols = [...new Set(left.map(a => a.c))];
    const c = cols[Math.floor(Math.random() * cols.length)];
    const shooter = left.filter(a => a.c === c).sort((a, b) => b.r - a.r)[0];
    g.bombs.push({ x: alienX(shooter) + 10, y: alienY(shooter) + 16 });
  }
  for (const b of g.bombs) b.y += (80 + g.wave * 8) * dt;
  g.bombs = g.bombs.filter(b => b.y < H);
  if (g.hit <= 0) {
    for (const b of g.bombs) {
      if (overlap(b.x - 1, b.y, 2, 6, g.px - 11, PLAYER_Y, 22, 10)) {
        g.lives--;
        g.hit = 1.2;
        g.bombs = [];
        hud();
        if (g.lives <= 0) return end('Game over');
        say(`Hit. ${g.lives} ${g.lives === 1 ? 'life' : 'lives'} left`);
        break;
      }
    }
  }
}

function end(message) {
  game.state = 'over';
  saveHigh();
  hud();
  say(`${message}. Score ${game.score}. High score ${game.saved}. Press space to play again.`);
}

function sprite(ctx, rows, x, y, colour) {
  ctx.fillStyle = colour;
  rows.forEach((row, ry) => {
    for (let rx = 0; rx < row.length; rx++)
      if (row[rx] === 'X') ctx.fillRect(x + rx * SPRITE, y + ry * SPRITE, SPRITE, SPRITE);
  });
}

function banner(ctx, lines) {
  ctx.fillStyle = colours.bg;
  ctx.globalAlpha = 0.8;
  ctx.fillRect(0, H / 2 - 36, W, 72);
  ctx.globalAlpha = 1;
  ctx.fillStyle = colours.accent;
  ctx.textAlign = 'center';
  ctx.font = `16px Silkscreen, monospace`;
  ctx.fillText(lines[0], W / 2, H / 2 - 8);
  ctx.fillStyle = colours.text;
  ctx.font = `8px Silkscreen, monospace`;
  lines.slice(1).forEach((line, i) => ctx.fillText(line, W / 2, H / 2 + 8 + i * 12));
  ctx.textAlign = 'left';
}

function draw() {
  const ctx = ui.canvas.getContext('2d');
  const g = game;
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = colours.bg;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = colours.border;
  ctx.fillRect(0, PLAYER_Y + 14, W, 1);

  for (const a of alive()) {
    const colour = a.r === 0 ? colours.accent : a.r === 3 ? colours.muted : colours.text;
    sprite(ctx, ROW_SPRITES[a.r][g.frame], alienX(a) + 2, alienY(a) + 1, colour);
  }
  if (g.state !== 'over' && (g.hit <= 0 || Math.floor(g.hit * 10) % 2 === 0)) {
    sprite(ctx, SHIP, g.px - 11, PLAYER_Y, colours.accent);
  }
  ctx.fillStyle = colours.strong;
  if (g.shot) ctx.fillRect(g.shot.x - 1, g.shot.y, 2, 6);
  ctx.fillStyle = colours.text;
  for (const b of g.bombs) ctx.fillRect(b.x - 1, b.y, 2, 6);

  if (g.state === 'paused') banner(ctx, ['PAUSED', 'Press P or tap to play']);
  if (g.state === 'over') banner(ctx, ['GAME OVER', `Score ${pad(g.score)}`, 'Space or tap to play again']);
}

function frame(now) {
  const g = game;
  if (!g || g.state !== 'playing') return;
  g.acc += Math.min(now - (g.last || now), 100);
  g.last = now;
  while (g.acc >= STEP && g.state === 'playing') {
    update(STEP);
    g.acc -= STEP;
  }
  draw();
  g.raf = g.state === 'playing' ? requestAnimationFrame(frame) : 0;
}

function run() {
  game.last = 0;
  game.acc = 0;
  cancelAnimationFrame(game.raf);
  game.raf = requestAnimationFrame(frame);
}

function setPaused(paused) {
  if (game.state === 'over') return;
  if (paused && game.state === 'playing') {
    game.state = 'paused';
    game.left = game.right = false;
    cancelAnimationFrame(game.raf);
    game.raf = 0;
    draw();
    say('Paused');
  } else if (!paused && game.state === 'paused') {
    game.state = 'playing';
    say('Playing');
    run();
  }
  ui.pauseBtn.textContent = game.state === 'paused' ? 'Play' : 'Pause';
}

function restart(win) {
  cancelAnimationFrame(game.raf);
  const saved = game.saved;
  game = freshGame(win);
  game.saved = Math.max(saved, game.saved);
  hud();
  ui.pauseBtn.textContent = game.state === 'paused' ? 'Play' : 'Pause';
  say(game.state === 'paused' ? 'Paused. Press P to start.' : 'Go');
  draw();
  if (game.state === 'playing') run();
}

function fire(win) {
  if (game.state === 'over') return restart(win);
  if (game.state === 'paused') return setPaused(false);
  game.wantFire = true;
}

export function closeGame() {
  if (!dialog || !dialog.open) return;
  if (game) {
    saveHigh();
    cancelAnimationFrame(game.raf);
    game.raf = 0;
    if (game.state === 'playing') game.state = 'paused';
  }
  dialog.close();
  if (opener && opener.isConnected && typeof opener.focus === 'function') opener.focus({ preventScroll: true });
  opener = null;
}

function init(win) {
  const doc = win.document;
  ui = build(doc);
  dialog = ui.el;

  dialog.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const onButton = event.target instanceof win.HTMLButtonElement;
    switch (event.key) {
      case 'Escape':
        event.preventDefault(); // handled here, so the CampSnap button's Escape handler stands down
        closeGame();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        game.left = true;
        break;
      case 'ArrowRight':
        event.preventDefault();
        game.right = true;
        break;
      case ' ':
        if (onButton) return;
        event.preventDefault();
        if (!event.repeat) fire(win);
        break;
      case 'Enter':
        if (!onButton && game.state === 'over') {
          event.preventDefault();
          restart(win);
        }
        break;
      case 'p':
      case 'P':
        if (!event.repeat) setPaused(game.state === 'playing');
        break;
    }
  });
  dialog.addEventListener('keyup', event => {
    if (event.key === 'ArrowLeft') game.left = false;
    if (event.key === 'ArrowRight') game.right = false;
  });
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closeGame();
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeGame();
  });
  dialog.querySelector('[data-game-close]').addEventListener('click', closeGame);

  // On-screen controls. Left and right are held while the pointer is down.
  dialog.querySelectorAll('[data-hold]').forEach(btn => {
    const side = btn.dataset.hold;
    const set = on => {
      game[side] = on;
    };
    btn.addEventListener('pointerdown', event => {
      event.preventDefault();
      try {
        btn.setPointerCapture(event.pointerId);
      } catch (e) {}
      set(true);
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => btn.addEventListener(type, () => set(false)));
    // Keyboard activation of a focused button nudges once.
    btn.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') set(true);
    });
    btn.addEventListener('keyup', () => set(false));
  });
  dialog.querySelector('[data-act="fire"]').addEventListener('click', () => fire(win));
  ui.pauseBtn.addEventListener('click', () =>
    game.state === 'over' ? restart(win) : setPaused(game.state === 'playing'),
  );
  ui.canvas.addEventListener('pointerdown', event => {
    event.preventDefault();
    ui.canvas.focus({ preventScroll: true });
    fire(win);
  });

  doc.addEventListener('visibilitychange', () => {
    if (doc.hidden && dialog.open && game && game.state === 'playing') setPaused(true);
  });
}

export async function openGame(win = window) {
  const doc = win.document;
  if (dialog && dialog.open) return;
  const font = loadFont(doc);
  if (!dialog) init(win);
  opener = doc.activeElement;
  colours = readColours(win);
  game = freshGame(win);
  hud();
  ui.pauseBtn.textContent = game.state === 'paused' ? 'Play' : 'Pause';
  dialog.showModal();
  ui.canvas.focus({ preventScroll: true });
  draw();
  say(game.state === 'paused' ? 'Invaders. Paused. Press P to start.' : 'Invaders. Go.');
  // The first frame is drawn with the fallback face; once Silkscreen arrives, redraw and (if playing) carry on.
  font.then(() => {
    if (dialog.open && game.state !== 'playing') draw();
  });
  if (game.state === 'playing') run();
}
