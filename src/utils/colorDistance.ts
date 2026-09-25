import { RGB } from '../types/color';
import { rgbToOklab } from './colorConversion';

/**
 * Calculates Euclidean distance in OKLab color space between two RGB colors.
 * OKLab distance represents human perceptual difference far better than raw RGB distance.
 */
export function oklabDistance(c1: RGB, c2: RGB): number {
  const lab1 = rgbToOklab(c1);
  const lab2 = rgbToOklab(c2);

  const dL = lab1.L - lab2.L;
  const da = lab1.a - lab2.a;
  const db = lab1.b - lab2.b;

  return Math.sqrt(dL * dL + da * da + db * db);
}

/**
 * Standard Euclidean distance in 3D RGB color space [0, 441.67].
 */
export function rgbEuclideanDistance(c1: RGB, c2: RGB): number {
  const dr = c1.r - c2.r;
  const dg = c1.g - c2.g;
  const db = c1.b - c2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/**
 * Calculates a perceptual similarity percentage from 0% to 100%.
 * 100% means identical colors.
 */
export function calculateSimilarityPercentage(target: RGB, guessed: RGB): number {
  const dist = oklabDistance(target, guessed);
  // Maximum possible distance in OKLab within sRGB cube is ~1.15 (between black and vibrant yellow/green)
  const maxDist = 1.15;
  const similarity = Math.max(0, Math.min(100, (1 - dist / maxDist) * 100));
  return Math.round(similarity * 10) / 10;
}

/**
 * Calculates a perceptual difference percentage from 0% to 100%.
 * 0% means identical colors.
 */
export function calculateDifferencePercentage(target: RGB, guessed: RGB): number {
  const sim = calculateSimilarityPercentage(target, guessed);
  return Math.round((100 - sim) * 10) / 10;
}
