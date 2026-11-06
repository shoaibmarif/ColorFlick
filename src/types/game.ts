export type GameMode =
  | 'exact-color'
  | 'rgb-guess'
  | 'hex-guess'
  | 'color-name'
  | 'warm-cool'
  | 'light-dark'
  | 'closest-color'
  | 'color-picker'
  | 'color-match';

export type GameFormat =
  | 'standard'        // 10 rounds
  | 'quick-challenge' // 5, 10, or 20 rounds with progressive difficulty
  | 'timed'           // Fixed countdown (30s, 60s, 120s)
  | 'endless'         // 3 lives, play until lost
  | 'survival'        // Progressive difficulty escalating until mistake
  | 'daily'           // Seeded daily 10-round challenge
  | 'practice';       // Untimed learning mode with hints

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface RoundChoice {
  id: string;
  hex: string;
  label?: string; // Color name or index
  isCorrect: boolean;
  distanceToTarget?: number; // In closest-color or rgb modes
}

export interface RoundResult {
  roundNumber: number;
  targetHex: string;
  playerHex?: string;
  playerAnswerLabel?: string;
  isCorrect: boolean;
  scoreEarned: number;
  responseTimeMs: number;
  differencePercentage?: number;
  similarityPercentage?: number;
  targetCategory?: string;
  explanation?: string;
}

export interface GameSettings {
  theme: 'light' | 'dark' | 'system';
  soundEnabled: boolean;
  soundVolume: number; // 0 to 1
  reducedMotion: boolean;
  colorAssistance: 'off' | 'basic' | 'enhanced';
  colorblindMode: 'off' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  showColorCodes: 'never' | 'after-answer' | 'always';
  highContrast: boolean;
  autoNext: boolean;
  largeText: boolean;
  keyboardNavigation: boolean;
}

/** Compact record of one finished daily challenge, kept for the calendar. */
export interface DailySummary {
  date: string; // YYYY-MM-DD
  score: number;
  accuracy: number;
  correctAnswers: number;
  totalRounds: number;
  /** Per-round outcome, used for the shareable result grid. */
  results: boolean[];
  /** Target color of each round (shown on the results screen). */
  targets: string[];
  /** True if played on the day itself (counts toward streaks). */
  onTheDay: boolean;
}

export interface DailyChallengeState {
  date: string; // YYYY-MM-DD
  version: number;
  completed: boolean;
  score: number;
  accuracy: number;
  correctAnswers: number;
  totalRounds: number;
  rounds: RoundResult[];
}
