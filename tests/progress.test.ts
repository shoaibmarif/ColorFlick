import { describe, it, expect } from 'vitest';
import { colorFamily, accuracyByFamily } from '../src/utils/progress';

describe('colorFamily', () => {
  it.each([
    ['#FF0000', 'red'],
    ['#FF8800', 'orange'],
    ['#FFE000', 'yellow'],
    ['#22AA44', 'green'],
    ['#00C8C8', 'teal'],
    ['#2255EE', 'blue'],
    ['#7A2BD9', 'purple'],
    ['#E0409A', 'pink'],
    ['#808080', 'neutral'],
    ['#FFFFFF', 'neutral'],
    ['#000000', 'neutral'],
  ])('%s is %s', (hex, family) => {
    expect(colorFamily(hex)).toBe(family);
  });
});

describe('accuracyByFamily', () => {
  it('sorts weakest family first and drops families with too few rounds', () => {
    const rounds = [
      ...Array.from({ length: 4 }, (_, i) => ({ targetHex: '#2255EE', isCorrect: i < 1 })), // blue 25%
      ...Array.from({ length: 4 }, () => ({ targetHex: '#FF0000', isCorrect: true })), // red 100%
      { targetHex: '#22AA44', isCorrect: false }, // green: only 1 round
    ];
    const result = accuracyByFamily(rounds);
    expect(result.map((r) => r.family)).toEqual(['blue', 'red']);
    expect(result[0]).toMatchObject({ rounds: 4, correct: 1, accuracy: 25 });
  });
});
