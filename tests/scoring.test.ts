import { describe, it, expect } from 'vitest';
import { calculateRoundScore } from '../src/utils/scoring';

describe('scoring engine', () => {
  it('awards 0 points for incorrect answers', () => {
    const score = calculateRoundScore(false, 'expert', 500, 10);
    expect(score.totalPoints).toBe(0);
    expect(score.basePoints).toBe(0);
  });

  it('calculates points with difficulty, speed, and streak bonuses', () => {
    // Correct on medium, fast response (800ms), streak 3
    const score = calculateRoundScore(true, 'medium', 800, 3);
    expect(score.basePoints).toBe(100);
    expect(score.difficultyBonus).toBe(50);
    expect(score.speedBonus).toBeGreaterThan(80);
    expect(score.streakBonus).toBe(45);
    expect(score.totalPoints).toBeGreaterThan(250);
  });

  it('rewards higher difficulty more', () => {
    const easy = calculateRoundScore(true, 'easy', 2000, 0);
    const expert = calculateRoundScore(true, 'expert', 2000, 0);

    expect(expert.totalPoints).toBeGreaterThan(easy.totalPoints);
  });
});
