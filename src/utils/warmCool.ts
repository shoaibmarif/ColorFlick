import { RGB, WarmCoolCategory } from '../types/color';
import { rgbToHsl } from './colorConversion';

/**
 * Classifies a color as Warm or Cool based on hue angle in color theory:
 * - Warm: 0° to 80° (Reds, Oranges, Yellows) and 315° to 360° (Warm Pinks, Magentas)
 * - Cool: 80° to 315° (Greens, Cyans, Blues, Purples, Violets)
 *
 * Notice: For gameplay fairness, random color generation for Warm/Cool mode filters out
 * ambiguous boundary zones (e.g., 75°-90° and 305°-325°).
 */
export function classifyWarmCool(rgb: RGB): WarmCoolCategory {
  const hsl = rgbToHsl(rgb);
  const hue = hsl.h;

  if (hue <= 80 || hue >= 315) {
    return 'Warm';
  }
  return 'Cool';
}

/**
 * Checks if a hue is in an ambiguous transition boundary between warm and cool.
 */
export function isAmbiguousWarmCool(hue: number): boolean {
  return (hue >= 70 && hue <= 90) || (hue >= 305 && hue <= 325);
}
