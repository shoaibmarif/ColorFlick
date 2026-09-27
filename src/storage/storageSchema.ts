import { GameSettings, RoundResult } from '../types/game';
import { PlayerStats } from '../types/stats';

export const STORAGE_VERSION = 1;

export const DEFAULT_SETTINGS: GameSettings = {
  theme: 'system',
  soundEnabled: true,
  soundVolume: 0.6,
  reducedMotion: false,
  colorAssistance: 'off',
  colorblindMode: 'off',
  showColorCodes: 'after-answer',
  highContrast: false,
  autoNext: false,
  largeText: false,
  keyboardNavigation: true,
};

const initialModeStats = {
  gamesPlayed: 0,
  roundsPlayed: 0,
  correctAnswers: 0,
  totalScore: 0,
  highestScore: 0,
  bestStreak: 0,
  totalResponseTimeMs: 0,
};

export const DEFAULT_STATS: PlayerStats = {
  totalGames: 0,
  totalRounds: 0,
  totalCorrect: 0,
  totalScore: 0,
  highestScore: 0,
  currentStreak: 0,
  bestStreak: 0,
  dailyStreak: 0,
  lastDailyDate: null,
  longestDailyStreak: 0,
  dailyCompletedCount: 0,
  totalResponseTimeMs: 0,
  fastestResponseMs: null,
  modeStats: {
    'exact-color': { ...initialModeStats },
    'rgb-guess': { ...initialModeStats },
    'hex-guess': { ...initialModeStats },
    'color-name': { ...initialModeStats },
    'warm-cool': { ...initialModeStats },
    'light-dark': { ...initialModeStats },
    'closest-color': { ...initialModeStats },
    'color-picker': { ...initialModeStats },
    'color-match': { ...initialModeStats },
  },
};

export interface GameHistoryEntry {
  id: string;
  timestamp: number;
  date: string; // ISO date string
  mode: string;
  format: string;
  difficulty: string;
  score: number;
  accuracy: number;
  durationMs: number;
  bestStreak: number;
  rounds: RoundResult[];
}
