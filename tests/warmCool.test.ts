import { describe, it, expect } from 'vitest';
import { classifyWarmCool, getWarmCoolExplanation, isAmbiguousWarmCool } from '../src/utils/warmCool';

describe('warmCool classification', () => {
  it('correctly classifies classic warm colors (red, orange, yellow, magenta)', () => {
    expect(classifyWarmCool({ r: 255, g: 0, b: 0 })).toBe('Warm'); // Pure Red (0°)
    expect(classifyWarmCool({ r: 255, g: 140, b: 0 })).toBe('Warm'); // Dark Orange (33°)
    expect(classifyWarmCool({ r: 255, g: 215, b: 0 })).toBe('Warm'); // Gold (51°)
    expect(classifyWarmCool({ r: 255, g: 20, b: 147 })).toBe('Warm'); // Deep Pink (328°)
  });

  it('correctly classifies classic cool colors (cyan, blue, green, violet)', () => {
    expect(classifyWarmCool({ r: 0, g: 0, b: 255 })).toBe('Cool'); // Pure Blue (240°)
    expect(classifyWarmCool({ r: 0, g: 255, b: 255 })).toBe('Cool'); // Cyan (180°)
    expect(classifyWarmCool({ r: 0, g: 128, b: 0 })).toBe('Cool'); // Green (120°)
    expect(classifyWarmCool({ r: 138, g: 43, b: 226 })).toBe('Cool'); // Blue Violet (271°)
  });

  it('correctly classifies neutral colors (grays, desaturated colors, transition boundaries)', () => {
    expect(classifyWarmCool({ r: 128, g: 128, b: 128 })).toBe('Neutral'); // Pure Gray (s = 0)
    expect(classifyWarmCool({ r: 10, g: 10, b: 10 })).toBe('Neutral'); // Near Black (l <= 10)
    expect(classifyWarmCool({ r: 250, g: 250, b: 250 })).toBe('Neutral'); // Near White (l >= 92)
  });

  it('generates educational explanations for each category', () => {
    const warmExpl = getWarmCoolExplanation({ r: 255, g: 0, b: 0 }, 'Warm');
    expect(warmExpl).toContain('Warm.');

    const coolExpl = getWarmCoolExplanation({ r: 0, g: 0, b: 255 }, 'Cool');
    expect(coolExpl).toContain('Cool.');

    const neutralExpl = getWarmCoolExplanation({ r: 128, g: 128, b: 128 }, 'Neutral');
    expect(neutralExpl).toContain('Neutral.');
  });

  it('identifies ambiguous transition hue zones', () => {
    expect(isAmbiguousWarmCool(80)).toBe(true);
    expect(isAmbiguousWarmCool(320)).toBe(true);
    expect(isAmbiguousWarmCool(0)).toBe(false);
    expect(isAmbiguousWarmCool(180)).toBe(false);
  });
});
