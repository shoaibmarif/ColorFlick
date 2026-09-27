import { RGB, WarmCoolCategory } from '../types/color';
import { rgbToHsl } from './colorConversion';

/**
 * Classifies a color as Warm, Cool, or Neutral based on hue angle, saturation, and lightness:
 * - Neutral: Low saturation (<= 14%), near-black (<= 10%), near-white (>= 92%),
 *   or borderline transition hues (72°-86° and 312°-326°).
 * - Warm: 0° to 72° (Reds, Oranges, warm Yellows) and 326° to 360° (Warm Pinks, Magentas).
 * - Cool: 86° to 312° (Greens, Cyans, Blues, Violets).
 */
export function classifyWarmCool(rgb: RGB): WarmCoolCategory {
  const hsl = rgbToHsl(rgb);
  const hue = hsl.h;
  const sat = hsl.s;
  const light = hsl.l;

  // Achromatic or extreme lightness/darkness is Neutral
  if (sat <= 14 || light <= 10 || light >= 92) {
    return 'Neutral';
  }

  // Borderline transition hues where color theory views temperature as ambiguous
  if ((hue >= 72 && hue <= 86) || (hue >= 312 && hue <= 326)) {
    return 'Neutral';
  }

  if (hue < 72 || hue > 326) {
    return 'Warm';
  }

  return 'Cool';
}

/**
 * Checks if a hue is in an ambiguous transition boundary between warm and cool.
 */
export function isAmbiguousWarmCool(hue: number): boolean {
  return (hue >= 72 && hue <= 86) || (hue >= 312 && hue <= 326);
}

/**
 * Returns an educational explanation for the color's temperature classification.
 */
export function getWarmCoolExplanation(rgb: RGB, category: WarmCoolCategory): string {
  const hsl = rgbToHsl(rgb);
  if (category === 'Neutral') {
    if (hsl.s <= 14) return `Neutral: Very low saturation (${hsl.s}%), appearing grayscale.`;
    if (hsl.l <= 10 || hsl.l >= 92) return `Neutral: Extreme lightness (${hsl.l}%), washing out hue perception.`;
    return `Neutral: Hue angle of ${hsl.h}° lies right on the boundary between warm and cool spectrums.`;
  }
  if (category === 'Warm') {
    return `Warm: Hue of ${hsl.h}° (red-yellow/magenta range evokes sunlight and fire).`;
  }
  return `Cool: Hue of ${hsl.h}° (green-blue-violet range evokes water, foliage, and sky).`;
}

