import { Difficulty } from '../types/game';

export interface ScoreBreakdown {
  basePoints: number;
  difficultyBonus: number;
  speedBonus: number;
  streakBonus: number;
  totalPoints: number;
}

const DIFFICULTY_BONUSES: Record<Difficulty, number> = {
  easy: 0,
  medium: 50,
  hard: 100,
  expert: 180,
};

/**
 * Calculates score for a correct answer:
 * Base (100) + Difficulty Bonus + Speed Bonus (up to 100 for < 5s) + Streak Bonus (up to 150)
 */
export function calculateRoundScore(
  isCorrect: boolean,
  difficulty: Difficulty,
  responseTimeMs: number,
  streak: number,
  similarityPercentage: number = 100
): ScoreBreakdown {
  if (!isCorrect) {
    return {
      basePoints: 0,
      difficultyBonus: 0,
      speedBonus: 0,
      streakBonus: 0,
      totalPoints: 0,
    };
  }

  const basePoints = 100;
  const difficultyBonus = DIFFICULTY_BONUSES[difficulty] || 0;

  // Speed bonus: full 100 pts if under 1s, decaying linearly until 6s (6000ms)
  const speedBonus = Math.max(0, Math.min(100, Math.round((6000 - responseTimeMs) / 50)));

  // Streak bonus: +15 points per current streak level up to +150
  const streakBonus = Math.min(150, Math.max(0, streak * 15));

  // Multiplier for continuous guess similarity (e.g. RGB/Hex slider modes)
  const accuracyMultiplier = Math.max(0.5, similarityPercentage / 100);

  const totalPoints = Math.round(
    (basePoints + difficultyBonus + speedBonus + streakBonus) * accuracyMultiplier
  );

  return {
    basePoints,
    difficultyBonus,
    speedBonus,
    streakBonus,
    totalPoints,
  };
}

/**
 * Formats a score with comma separators (e.g. 1,420).
 */
export function formatScore(score: number): string {
  return new Intl.NumberFormat('en-US').format(score);
}
