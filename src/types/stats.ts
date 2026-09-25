import { GameMode } from './game';

export interface ModeStats {
  gamesPlayed: number;
  roundsPlayed: number;
  correctAnswers: number;
  totalScore: number;
  highestScore: number;
  bestStreak: number;
  totalResponseTimeMs: number;
}

export interface PlayerStats {
  totalGames: number;
  totalRounds: number;
  totalCorrect: number;
  totalScore: number;
  highestScore: number;
  currentStreak: number;
  bestStreak: number;
  dailyStreak: number;
  lastDailyDate: string | null;
  longestDailyStreak: number;
  dailyCompletedCount: number;
  totalResponseTimeMs: number;
  fastestResponseMs: number | null;
  modeStats: Record<GameMode, ModeStats>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null; // ISO date string or null
}
