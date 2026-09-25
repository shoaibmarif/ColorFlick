import { describe, it, expect } from 'vitest';
import {
  isValidHex,
  sanitizeHexInput,
  isValidRgbChannel,
  isValidRgb,
} from '../src/utils/validation';

describe('validation', () => {
  it('validates 3 and 6 digit hex codes with or without hash', () => {
    expect(isValidHex('#ffffff')).toBe(true);
    expect(isValidHex('FFFFFF')).toBe(true);
    expect(isValidHex('#f0a')).toBe(true);
    expect(isValidHex('123')).toBe(true);
    expect(isValidHex('#12345')).toBe(false);
    expect(isValidHex('xyz')).toBe(false);
    expect(isValidHex('')).toBe(false);
  });

  it('sanitizes and expands hex input', () => {
    expect(sanitizeHexInput('#fff')).toBe('#FFFFFF');
    expect(sanitizeHexInput('0a2')).toBe('#00AA22');
    expect(sanitizeHexInput('3b82f6')).toBe('#3B82F6');
    expect(sanitizeHexInput('xyz')).toBeNull();
  });

  it('validates RGB channels', () => {
    expect(isValidRgbChannel(0)).toBe(true);
    expect(isValidRgbChannel(255)).toBe(true);
    expect(isValidRgbChannel(128)).toBe(true);
    expect(isValidRgbChannel(-1)).toBe(false);
    expect(isValidRgbChannel(256)).toBe(false);
    expect(isValidRgbChannel(12.5)).toBe(false);
  });

  it('validates complete RGB objects', () => {
    expect(isValidRgb({ r: 10, g: 20, b: 30 })).toBe(true);
    expect(isValidRgb({ r: 300, g: 0, b: 0 })).toBe(false);
    expect(isValidRgb(null)).toBe(false);
  });
});
