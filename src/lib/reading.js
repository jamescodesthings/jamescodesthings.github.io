const WORDS_PER_MINUTE = 220;

// Whole minutes to read `text` at 220 words a minute, rounded up, never below 1.
export function readingTime(text) {
  const words = String(text || '')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
