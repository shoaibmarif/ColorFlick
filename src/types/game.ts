export type GameMode =
  | 'exact-color'
  | 'rgb-guess'
  | 'hex-guess'
  | 'color-name'
  | 'warm-cool'
  | 'light-dark'
  | 'closest-color';

export type GameFormat =
  | 'standard'        // 10 rounds
  | 'quick-challenge' // 10 rounds with 30s total limit
  | 'timed'           // Fixed countdown (30s, 60s, 120s)
  | 'endless'         // 3 lives, play until lost
  | 'survival'        // Progressive difficulty escalating every 3 rounds
  | 'daily';          // Seeded daily 10-round challenge

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
  targetCategory?: string;
}

export interface GameSettings {
  theme: 'light' | 'dark' | 'system';
  soundEnabled: boolean;
  soundVolume: number; // 0 to 1
  reducedMotion: boolean;
  colorAssistance: 'off' | 'basic' | 'enhanced';
  showColorCodes: 'never' | 'after-answer' | 'always';
  highContrast: boolean;
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
