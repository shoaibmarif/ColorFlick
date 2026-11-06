import { useCallback, useMemo, useState } from 'react';
import { DailySummary, RoundResult } from '../types/game';
import { Storage } from '../storage/localStorage';
import { createDailyRng } from '../utils/seededRandom';
import { useGameEngine } from './useGameEngine';
import { useStats, statsStore } from './useStats';
import { trackEvent } from '../utils/analytics';
import { addDays, todayKey } from '../utils/dates';
import { createStore, useStore } from '../storage/store';

export const DAILY_ROUNDS = 10;

/** Shared so the calendar updates as soon as a game finishes. */
export const dailyHistoryStore = createStore<Record<string, DailySummary>>(() => Storage.getDailyHistory());

export function useDailyHistory() {
  return useStore(dailyHistoryStore);
}

/**
 * Daily challenge for a given date (defaults to today). Every date has its own
 * seeded set of rounds, identical for all players. Only playing on the day
 * itself counts toward the daily streak; older dates are replays.
 */
export function useDailyChallenge(dateKey: string = todayKey()) {
  const isToday = dateKey === todayKey();
  const history = useDailyHistory();
  const [justFinished, setJustFinished] = useState<DailySummary | null>(null);
  const { recordGameComplete } = useStats();

  const dailyRng = useMemo(() => createDailyRng(dateKey), [dateKey]);

  const handleGameComplete = useCallback(
    (_mode: string, _format: string, _diff: string, finalScore: number, rounds: RoundResult[]) => {
      const correct = rounds.filter((r) => r.isCorrect).length;
      const accuracy = rounds.length ? Math.round((correct / rounds.length) * 100) : 0;
      const summary: DailySummary = {
        date: dateKey,
        score: finalScore,
        accuracy,
        correctAnswers: correct,
        totalRounds: rounds.length,
        results: rounds.map((r) => r.isCorrect),
        targets: rounds.map((r) => r.targetHex),
        onTheDay: isToday,
      };

      // A replay never overwrites the original on-the-day result.
      const existing = dailyHistoryStore.get()[dateKey];
      if (!existing || (!existing.onTheDay && finalScore > existing.score)) {
        Storage.saveDailySummary(summary);
        dailyHistoryStore.set(Storage.getDailyHistory());
      }
      setJustFinished(summary);
      trackEvent('daily_challenge_completed', { score: finalScore, accuracy, replay: !isToday });

      if (isToday && !existing) {
        const stats = { ...statsStore.get() };
        const yesterday = addDays(dateKey, -1);
        const streak =
          stats.lastDailyDate === yesterday
            ? stats.dailyStreak + 1
            : stats.lastDailyDate === dateKey
            ? stats.dailyStreak
            : 1;
        stats.dailyStreak = streak;
        stats.longestDailyStreak = Math.max(stats.longestDailyStreak, streak);
        stats.lastDailyDate = dateKey;
        stats.dailyCompletedCount += 1;
        Storage.saveStats(stats);
        statsStore.set(stats);
      }

      recordGameComplete('exact-color', 'daily', 'medium', finalScore, rounds);
    },
    [dateKey, isToday, recordGameComplete]
  );

  const engine = useGameEngine({
    initialMode: 'exact-color',
    initialFormat: 'daily',
    initialDifficulty: 'medium',
    customRng: dailyRng,
    totalRounds: DAILY_ROUNDS,
    onGameComplete: handleGameComplete,
  });

  const result = justFinished ?? history[dateKey] ?? null;

  return { dateKey, isToday, result, engine };
}
