import { describe, it, expect, beforeEach } from 'vitest';
import { Storage } from '../src/storage/localStorage';
import { DEFAULT_SETTINGS, DEFAULT_STATS } from '../src/storage/storageSchema';

describe('Storage System', () => {
  beforeEach(() => {
    Storage.resetAllData();
  });

  it('returns default settings when storage is empty', () => {
    const settings = Storage.getSettings();
    expect(settings.theme).toBe(DEFAULT_SETTINGS.theme);
    expect(settings.soundEnabled).toBe(true);
    expect(settings.soundVolume).toBe(0.6);
  });

  it('saves and retrieves updated settings', () => {
    Storage.saveSettings({
      ...DEFAULT_SETTINGS,
      theme: 'dark',
      soundVolume: 0.8,
      reducedMotion: true,
    });
    const retrieved = Storage.getSettings();
    expect(retrieved.theme).toBe('dark');
    expect(retrieved.soundVolume).toBe(0.8);
    expect(retrieved.reducedMotion).toBe(true);
  });

  it('handles game history recording and clearing correctly', () => {
    expect(Storage.getHistory()).toEqual([]);

    Storage.addHistoryEntry({
      id: 'test-1',
      timestamp: Date.now(),
      date: new Date().toISOString(),
      mode: 'exact-color',
      format: 'standard',
      difficulty: 'medium',
      score: 1200,
      accuracy: 90,
      durationMs: 45000,
      bestStreak: 6,
      rounds: [],
    });

    const history = Storage.getHistory();
    expect(history.length).toBe(1);
    expect(history[0].score).toBe(1200);

    Storage.clearHistory();
    expect(Storage.getHistory()).toEqual([]);
  });

  it('retrieves default stats safely', () => {
    const stats = Storage.getStats();
    expect(stats.totalGames).toBe(DEFAULT_STATS.totalGames);
    expect(stats.totalScore).toBe(DEFAULT_STATS.totalScore);
    expect(stats.modeStats['color-picker']).toBeDefined();
    expect(stats.modeStats['color-match']).toBeDefined();
  });
});
