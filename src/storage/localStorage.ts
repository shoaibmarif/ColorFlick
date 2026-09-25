import { GameSettings, DailyChallengeState } from '../types/game';
import { PlayerStats, Achievement } from '../types/stats';
import {
  DEFAULT_SETTINGS,
  DEFAULT_STATS,
  GameHistoryEntry,
} from './storageSchema';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';

const KEYS = {
  VERSION: 'colorGuessing.version',
  SETTINGS: 'colorGuessing.settings',
  STATS: 'colorGuessing.stats',
  HISTORY: 'colorGuessing.history',
  ACHIEVEMENTS: 'colorGuessing.achievements',
  DAILY: 'colorGuessing.daily',
} as const;

// In-memory fallback if localStorage is blocked by private mode or permission
const memoryStorage: Record<string, string> = {};

function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

const hasStorage = typeof window !== 'undefined' && isLocalStorageAvailable();

function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = hasStorage ? window.localStorage.getItem(key) : memoryStorage[key];
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    if (hasStorage) {
      window.localStorage.setItem(key, serialized);
    } else {
      memoryStorage[key] = serialized;
    }
  } catch {
    // QuotaExceededError or security block
  }
}

export const Storage = {
  getSettings(): GameSettings {
    const data = getItem<GameSettings>(KEYS.SETTINGS, DEFAULT_SETTINGS);
    return { ...DEFAULT_SETTINGS, ...data };
  },

  saveSettings(settings: GameSettings): void {
    setItem(KEYS.SETTINGS, settings);
  },

  getStats(): PlayerStats {
    const data = getItem<PlayerStats>(KEYS.STATS, DEFAULT_STATS);
    // Merge mode stats to ensure new modes are always populated
    return {
      ...DEFAULT_STATS,
      ...data,
      modeStats: {
        ...DEFAULT_STATS.modeStats,
        ...(data?.modeStats || {}),
      },
    };
  },

  saveStats(stats: PlayerStats): void {
    setItem(KEYS.STATS, stats);
  },

  getHistory(): GameHistoryEntry[] {
    return getItem<GameHistoryEntry[]>(KEYS.HISTORY, []);
  },

  addHistoryEntry(entry: GameHistoryEntry): void {
    const history = this.getHistory();
    // Keep last 25 games to prevent excessive storage
    const updated = [entry, ...history].slice(0, 25);
    setItem(KEYS.HISTORY, updated);
  },

  getAchievements(): Achievement[] {
    const stored = getItem<Achievement[]>(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
    // Merge with latest schema to incorporate any newly added achievements
    return INITIAL_ACHIEVEMENTS.map((initial) => {
      const found = stored.find((s) => s.id === initial.id);
      return found ? { ...initial, unlockedAt: found.unlockedAt } : initial;
    });
  },

  saveAchievements(achievements: Achievement[]): void {
    setItem(KEYS.ACHIEVEMENTS, achievements);
  },

  getDailyChallenge(dateStr: string): DailyChallengeState | null {
    const stored = getItem<DailyChallengeState | null>(KEYS.DAILY, null);
    if (stored && stored.date === dateStr) {
      return stored;
    }
    return null;
  },

  saveDailyChallenge(state: DailyChallengeState): void {
    setItem(KEYS.DAILY, state);
  },

  resetAllData(): void {
    try {
      if (hasStorage) {
        Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
      }
      Object.keys(memoryStorage).forEach((k) => delete memoryStorage[k]);
    } catch {
      // ignore
    }
  },
};
