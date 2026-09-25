import { describe, it, expect } from 'vitest';
import { createDailyRng } from '../src/utils/seededRandom';

describe('seededRandom (Daily Challenge determinism)', () => {
  it('generates identical sequence for the same date', () => {
    const rng1 = createDailyRng('2026-09-20');
    const rng2 = createDailyRng('2026-09-20');

    const seq1 = Array.from({ length: 10 }, () => rng1());
    const seq2 = Array.from({ length: 10 }, () => rng2());

    expect(seq1).toEqual(seq2);
  });

  it('generates distinct sequences for different dates', () => {
    const rng1 = createDailyRng('2026-09-20');
    const rng2 = createDailyRng('2026-09-21');

    const val1 = rng1();
    const val2 = rng2();

    expect(val1).not.toBe(val2);
  });

  it('produces values strictly within [0, 1)', () => {
    const rng = createDailyRng('2026-12-31');
    for (let i = 0; i < 100; i++) {
      const val = rng();
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(1);
    }
  });
});
