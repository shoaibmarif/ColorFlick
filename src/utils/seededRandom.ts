/**
 * Hash a string (e.g. date '2026-09-20') into a 32-bit integer seed.
 */
export function hashStringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return hash >>> 0; // Convert to unsigned
}

/**
 * Fast, high-quality 32-bit PRNG (Mulberry32).
 * Returns a pseudorandom number between 0 (inclusive) and 1 (exclusive).
 */
export function createMulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Creates a deterministic random number generator for a specific date string (YYYY-MM-DD).
 */
export function createDailyRng(dateString: string): () => number {
  const seed = hashStringToSeed(dateString + '-color-guess-v1');
  return createMulberry32(seed);
}
