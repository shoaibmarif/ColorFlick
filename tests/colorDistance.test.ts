import { describe, it, expect } from 'vitest';
import {
  oklabDistance,
  rgbEuclideanDistance,
  calculateSimilarityPercentage,
  calculateDifferencePercentage,
} from '../src/utils/colorDistance';

describe('colorDistance', () => {
  it('measures 0 distance between identical colors', () => {
    const c1 = { r: 120, g: 80, b: 200 };
    expect(oklabDistance(c1, c1)).toBe(0);
    expect(rgbEuclideanDistance(c1, c1)).toBe(0);
    expect(calculateSimilarityPercentage(c1, c1)).toBe(100);
    expect(calculateDifferencePercentage(c1, c1)).toBe(0);
  });

  it('measures significant distance between opposite colors', () => {
    const black = { r: 0, g: 0, b: 0 };
    const white = { r: 255, g: 255, b: 255 };
    const dist = oklabDistance(black, white);
    expect(dist).toBeGreaterThan(0.9);
    expect(calculateSimilarityPercentage(black, white)).toBeLessThan(20);
  });

  it('reflects subtle differences accurately', () => {
    const target = { r: 100, g: 100, b: 100 };
    const close = { r: 102, g: 100, b: 101 };
    expect(calculateSimilarityPercentage(target, close)).toBeGreaterThan(97);
  });
});
