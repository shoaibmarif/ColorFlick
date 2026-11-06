import { describe, it, expect } from 'vitest';
import { difficultyForRound } from '../src/hooks/useGameEngine';

describe('difficultyForRound', () => {
  it('keeps the chosen difficulty for normal formats', () => {
    for (const round of [1, 5, 10]) {
      expect(difficultyForRound('standard', 'hard', round, 10)).toBe('hard');
      expect(difficultyForRound('timed', 'easy', round, 10)).toBe('easy');
    }
  });

  it('escalates through every level in a quick challenge', () => {
    const levels = Array.from({ length: 10 }, (_, i) => difficultyForRound('quick-challenge', 'medium', i + 1, 10));
    expect(levels[0]).toBe('easy');
    expect(levels[9]).toBe('expert');
    expect(new Set(levels)).toEqual(new Set(['easy', 'medium', 'hard', 'expert']));
  });

  it('escalates in survival mode', () => {
    expect(difficultyForRound('survival', 'medium', 1, 10)).toBe('easy');
    expect(difficultyForRound('survival', 'medium', 5, 10)).toBe('medium');
    expect(difficultyForRound('survival', 'medium', 8, 10)).toBe('hard');
    expect(difficultyForRound('survival', 'medium', 20, 10)).toBe('expert');
  });
});
