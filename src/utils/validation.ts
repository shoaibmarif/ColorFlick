import { RGB } from '../types/color';

/**
 * Validates whether a string is a valid CSS Hex color code.
 * Accepts: #FFFFFF, FFFFFF, #FFF, FFF, lowercase and uppercase.
 */
export function isValidHex(input: string): boolean {
  if (!input || typeof input !== 'string') return false;
  const trimmed = input.trim().replace(/^#/, '');
  return /^[0-9A-Fa-f]{3}$/.test(trimmed) || /^[0-9A-Fa-f]{6}$/.test(trimmed);
}

/**
 * Sanitizes and normalizes hex input into standard 6-digit #RRGGBB format.
 * Returns null if invalid.
 */
export function sanitizeHexInput(input: string): string | null {
  if (!isValidHex(input)) return null;
  let clean = input.trim().replace(/^#/, '');

  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }

  return `#${clean.toUpperCase()}`;
}

/**
 * Validates whether an RGB channel value is a valid integer between 0 and 255.
 */
export function isValidRgbChannel(val: unknown): boolean {
  if (typeof val === 'number') {
    return Number.isInteger(val) && val >= 0 && val <= 255;
  }
  if (typeof val === 'string') {
    const num = Number(val.trim());
    return !isNaN(num) && Number.isInteger(num) && num >= 0 && num <= 255;
  }
  return false;
}

/**
 * Validates an entire RGB object.
 */
export function isValidRgb(rgb: Partial<RGB> | null | undefined): rgb is RGB {
  if (!rgb) return false;
  return (
    isValidRgbChannel(rgb.r) &&
    isValidRgbChannel(rgb.g) &&
    isValidRgbChannel(rgb.b)
  );
}
