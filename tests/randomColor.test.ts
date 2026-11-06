import { describe, it, expect } from 'vitest';
import {
  DIFFICULTY_CONFIGS,
  JND,
  generateExactColorChoices,
  generateClosestColorChoices,
  generateRandomRgb,
} from '../src/utils/randomColor';
import { createMulberry32 } from '../src/utils/seededRandom';
import { hexToRgb } from '../src/utils/colorConversion';
import { oklabDistance } from '../src/utils/colorDistance';
import { Difficulty } from '../src/types/game';

const DIFFS: Difficulty[] = ['easy', 'medium', 'hard', 'expert'];
const SEEDS = 150;

const rgb = (hex: string) => {
  const c = hexToRgb(hex);
  if (!c) throw new Error(`bad hex ${hex}`);
  return c;
};

describe('generateExactColorChoices', () => {
  for (const diff of DIFFS) {
    it(`${diff}: always shows the advertised number of visibly different choices`, () => {
      const cfg = DIFFICULTY_CONFIGS[diff];
      for (let seed = 1; seed <= SEEDS; seed++) {
        const rng = createMulberry32(seed);
        const target = generateRandomRgb(rng);
        const choices = generateExactColorChoices(target, diff, rng);

        expect(choices).toHaveLength(cfg.choiceCount);
        expect(choices.filter((c) => c.isCorrect)).toHaveLength(1);
        expect(new Set(choices.map((c) => c.hex)).size).toBe(choices.length);

        // Every pair of swatches is above the just-noticeable difference.
        for (let i = 0; i < choices.length; i++) {
          for (let j = i + 1; j < choices.length; j++) {
            expect(oklabDistance(rgb(choices[i].hex), rgb(choices[j].hex))).toBeGreaterThanOrEqual(JND);
          }
        }
      }
    });
  }

  it('wrong answers on expert are subtle but never invisible', () => {
    const { minDelta, maxDelta } = DIFFICULTY_CONFIGS.expert;
    let inRange = 0;
    let total = 0;
    for (let seed = 1; seed <= SEEDS; seed++) {
      const rng = createMulberry32(seed);
      const target = generateRandomRgb(rng);
      for (const c of generateExactColorChoices(target, 'expert', rng)) {
        if (c.isCorrect) continue;
        total++;
        const d = oklabDistance(target, rgb(c.hex));
        expect(d).toBeGreaterThanOrEqual(JND);
        if (d >= minDelta && d <= maxDelta) inRange++;
      }
    }
    // Nearly all distractors land in the intended band.
    expect(inRange / total).toBeGreaterThan(0.95);
  });

  it('is deterministic for a given seed (needed for the daily challenge)', () => {
    const a = createMulberry32(42);
    const b = createMulberry32(42);
    const ta = generateRandomRgb(a);
    const tb = generateRandomRgb(b);
    expect(generateExactColorChoices(ta, 'medium', a)).toEqual(generateExactColorChoices(tb, 'medium', b));
  });
});

describe('generateClosestColorChoices', () => {
  for (const diff of DIFFS) {
    it(`${diff}: exactly one answer is clearly the closest`, () => {
      const cfg = DIFFICULTY_CONFIGS[diff];
      for (let seed = 1; seed <= SEEDS; seed++) {
        const rng = createMulberry32(seed);
        const target = generateRandomRgb(rng);
        const choices = generateClosestColorChoices(target, diff, rng);

        expect(choices).toHaveLength(cfg.closestChoiceCount);
        const correct = choices.filter((c) => c.isCorrect);
        expect(correct).toHaveLength(1);

        const best = oklabDistance(target, rgb(correct[0].hex));
        expect(best).toBeGreaterThanOrEqual(JND);
        for (const c of choices.filter((x) => !x.isCorrect)) {
          expect(oklabDistance(target, rgb(c.hex))).toBeGreaterThan(best + 0.03);
        }
      }
    });
  }
});
