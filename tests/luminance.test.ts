import { describe, it, expect } from 'vitest';
import { calculateLuminance, classifyLightDark } from '../src/utils/luminance';
import { calculateContrastRatio, getOptimalTextColor } from '../src/utils/contrast';

describe('luminance and contrast', () => {
  it('calculates 0 for black and 1 for white', () => {
    expect(calculateLuminance({ r: 0, g: 0, b: 0 })).toBe(0);
    expect(calculateLuminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1, 4);
  });

  it('correctly weighs spectral channels (Green > Red > Blue)', () => {
    const green = calculateLuminance({ r: 0, g: 255, b: 0 });
    const red = calculateLuminance({ r: 255, g: 0, b: 0 });
    const blue = calculateLuminance({ r: 0, g: 0, b: 255 });

    expect(green).toBeGreaterThan(red);
    expect(red).toBeGreaterThan(blue);
  });

  it('classifies light vs dark deterministically', () => {
    expect(classifyLightDark({ r: 255, g: 255, b: 255 })).toBe('Light');
    expect(classifyLightDark({ r: 255, g: 255, b: 0 })).toBe('Light');
    expect(classifyLightDark({ r: 0, g: 0, b: 0 })).toBe('Dark');
    expect(classifyLightDark({ r: 20, g: 20, b: 30 })).toBe('Dark');
  });

  it('selects optimal text color for accessibility', () => {
    expect(getOptimalTextColor('#FFFFFF')).toBe('#0F172A'); // Dark text on white
    expect(getOptimalTextColor('#FFFF00')).toBe('#0F172A'); // Dark text on yellow
    expect(getOptimalTextColor('#000000')).toBe('#FFFFFF'); // White text on black
    expect(getOptimalTextColor('#1E1B4B')).toBe('#FFFFFF'); // White text on deep indigo
  });

  it('calculates 21:1 contrast for black and white', () => {
    const contrast = calculateContrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 });
    expect(contrast).toBeCloseTo(21, 1);
  });
});
