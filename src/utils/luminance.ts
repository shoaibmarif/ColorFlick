import { RGB } from '../types/color';
import { LightDarkCategory } from '../types/color';

/**
 * Computes WCAG 2.1 relative luminance for an sRGB color.
 * Result is in the range [0, 1], where 0 is pure black and 1 is pure white.
 */
export function calculateLuminance(rgb: RGB): number {
  const toLinear = (val: number) => {
    const s = val / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };

  const rLin = toLinear(rgb.r);
  const gLin = toLinear(rgb.g);
  const bLin = toLinear(rgb.b);

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

/**
 * Classifies a color deterministically as 'Light' or 'Dark'.
 * Uses a luminance threshold of 0.20 (derived from perceptual midpoint).
 */
export function classifyLightDark(rgb: RGB, threshold: number = 0.20): LightDarkCategory {
  const lum = calculateLuminance(rgb);
  return lum >= threshold ? 'Light' : 'Dark';
}

/**
 * Returns an educational explanation for the color's luminance classification.
 */
export function getLuminanceExplanation(rgb: RGB, category: LightDarkCategory, threshold: number = 0.20): string {
  const lum = calculateLuminance(rgb);
  const roundedLum = (lum * 100).toFixed(1);
  const thresholdPct = (threshold * 100).toFixed(0);
  if (category === 'Light') {
    return `Light. Its luminance is ${roundedLum}%, above our ${thresholdPct}% line, so dark text reads well on it.`;
  }
  return `Dark. Its luminance is ${roundedLum}%, below our ${thresholdPct}% line, so it needs light text on top.`;
}

