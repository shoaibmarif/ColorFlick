import { Difficulty } from '../types/game';

export interface ScoreBreakdown {
  basePoints: number;
  difficultyBonus: number;
  speedBonus: number;
  streakBonus: number;
  totalPoints: number;
}

export const DIFFICULTY_BONUSES: Record<Difficulty, number> = {
  easy: 0,
  medium: 50,
  hard: 100,
  expert: 180,
};

/** Scoring constants, exported so explanations in the UI stay accurate. */
export const SCORING = {
  base: 100,
  maxSpeedBonus: 100,
  /** Full speed bonus at or under this time… */
  fullSpeedMs: 1000,
  /** …falling to zero at this time. */
  zeroSpeedMs: 6000,
  streakBonusPerLevel: 15,
  maxStreakBonus: 150,
  minAccuracyMultiplier: 0.5,
  /** HEX and RGB guesses count as correct within this % difference. */
  codeGuessTolerancePct: 8,
  /** Picker and HSL-matcher guesses count as correct at this % similarity. */
  sliderPassSimilarityPct: 88,
} as const;

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

  const basePoints = SCORING.base;
  const difficultyBonus = DIFFICULTY_BONUSES[difficulty] || 0;

  // Speed bonus: full 100 pts if under 1s, decaying linearly until 6s (6000ms)
  const speedBonus = Math.max(0, Math.min(100, Math.round((SCORING.zeroSpeedMs - responseTimeMs) / ((SCORING.zeroSpeedMs - SCORING.fullSpeedMs) / SCORING.maxSpeedBonus))));

  // Streak bonus: +15 points per current streak level up to +150
  const streakBonus = Math.min(SCORING.maxStreakBonus, Math.max(0, streak * SCORING.streakBonusPerLevel));

  // Multiplier for continuous guess similarity (e.g. RGB/Hex slider modes)
  const accuracyMultiplier = Math.max(SCORING.minAccuracyMultiplier, similarityPercentage / 100);

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
