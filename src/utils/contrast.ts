import { RGB } from '../types/color';
import { hexToRgb } from './colorConversion';
import { calculateLuminance } from './luminance';

/**
 * Calculates WCAG contrast ratio between two colors.
 * Result ranges from 1.0 (lowest) to 21.0 (highest).
 */
export function calculateContrastRatio(c1: RGB, c2: RGB): number {
  const lum1 = calculateLuminance(c1);
  const lum2 = calculateLuminance(c2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Determines whether dark text or light text provides higher contrast
 * when rendered against a given background color.
 */
export function getOptimalTextColor(bgColorHex: string): '#FFFFFF' | '#0F172A' {
  const rgb = hexToRgb(bgColorHex);
  if (!rgb) return '#FFFFFF';

  const whiteRgb: RGB = { r: 255, g: 255, b: 255 };
  const darkRgb: RGB = { r: 15, g: 23, b: 42 }; // slate-900

  const whiteContrast = calculateContrastRatio(rgb, whiteRgb);
  const darkContrast = calculateContrastRatio(rgb, darkRgb);

  return darkContrast >= whiteContrast ? '#0F172A' : '#FFFFFF';
}
