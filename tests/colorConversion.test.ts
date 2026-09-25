import { describe, it, expect } from 'vitest';
import {
  rgbToHex,
  hexToRgb,
  rgbToHsl,
  hslToRgb,
  rgbToOklab,
  oklabToRgb,
  normalizeHex,
} from '../src/utils/colorConversion';

describe('colorConversion', () => {
  it('converts RGB to HEX correctly', () => {
    expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#FF0000');
    expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe('#00FF00');
    expect(rgbToHex({ r: 0, g: 0, b: 255 })).toBe('#0000FF');
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('#FFFFFF');
  });

  it('converts HEX to RGB with short and long hex codes', () => {
    expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('00ff00')).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('invalid')).toBeNull();
  });

  it('normalizes hex strings correctly', () => {
    expect(normalizeHex('#abc')).toBe('#AABBCC');
    expect(normalizeHex('abc')).toBe('#AABBCC');
    expect(normalizeHex('#123456')).toBe('#123456');
    expect(normalizeHex('abcdef')).toBe('#ABCDEF');
    expect(normalizeHex('12345')).toBeNull();
  });

  it('performs accurate HSL round-trip conversion', () => {
    const testColors = [
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 128, b: 0 },
      { r: 75, g: 0, b: 130 },
      { r: 255, g: 255, b: 255 },
      { r: 0, g: 0, b: 0 },
    ];

    for (const rgb of testColors) {
      const hsl = rgbToHsl(rgb);
      const restored = hslToRgb(hsl);
      expect(Math.abs(restored.r - rgb.r)).toBeLessThanOrEqual(2);
      expect(Math.abs(restored.g - rgb.g)).toBeLessThanOrEqual(2);
      expect(Math.abs(restored.b - rgb.b)).toBeLessThanOrEqual(2);
    }
  });

  it('converts RGB to OKLab and back accurately', () => {
    const testColors = [
      { r: 200, g: 100, b: 50 },
      { r: 25, g: 180, b: 220 },
      { r: 128, g: 128, b: 128 },
    ];

    for (const rgb of testColors) {
      const oklab = rgbToOklab(rgb);
      const restored = oklabToRgb(oklab);
      expect(Math.abs(restored.r - rgb.r)).toBeLessThanOrEqual(2);
      expect(Math.abs(restored.g - rgb.g)).toBeLessThanOrEqual(2);
      expect(Math.abs(restored.b - rgb.b)).toBeLessThanOrEqual(2);
    }
  });
});
