import { useState, useMemo, useCallback } from 'react';
import { DailyChallengeState, RoundResult } from '../types/game';
import { Storage } from '../storage/localStorage';
import { createDailyRng } from '../utils/seededRandom';
import { useGameEngine } from './useGameEngine';
import { useStats } from './useStats';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function useDailyChallenge() {
  const todayStr = useMemo(() => getTodayDateString(), []);
  const [persistedState, setPersistedState] = useState<DailyChallengeState | null>(() =>
    Storage.getDailyChallenge(todayStr)
  );

  const { recordGameComplete } = useStats();

  // Create deterministic PRNG for today
  const dailyRng = useMemo(() => createDailyRng(todayStr), [todayStr]);

  const handleGameComplete = useCallback(
    (
      _mode: string,
      _format: string,
      _diff: string,
      finalScore: number,
      rounds: RoundResult[]
    ) => {
      const correctCount = rounds.filter((r) => r.isCorrect).length;
      const accuracy = rounds.length > 0 ? Math.round((correctCount / rounds.length) * 100) : 0;

      const completedState: DailyChallengeState = {
        date: todayStr,
        version: 1,
        completed: true,
        score: finalScore,
        accuracy,
        correctAnswers: correctCount,
        totalRounds: rounds.length,
        rounds,
      };

      Storage.saveDailyChallenge(completedState);
      setPersistedState(completedState);

      // Update daily streak in stats
      const stats = Storage.getStats();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

      let newDailyStreak = 1;
      if (stats.lastDailyDate === yesterdayStr) {
        newDailyStreak = stats.dailyStreak + 1;
      } else if (stats.lastDailyDate === todayStr) {
        newDailyStreak = stats.dailyStreak; // already counted today
      }

      stats.dailyStreak = newDailyStreak;
      stats.longestDailyStreak = Math.max(stats.longestDailyStreak, newDailyStreak);
      stats.lastDailyDate = todayStr;
      stats.dailyCompletedCount = stats.dailyCompletedCount + 1;
      Storage.saveStats(stats);

      recordGameComplete('exact-color', 'daily', 'medium', finalScore, rounds);
    },
    [todayStr, recordGameComplete]
  );

  const engine = useGameEngine({
    initialMode: 'exact-color',
    initialFormat: 'daily',
    initialDifficulty: 'medium',
    customRng: dailyRng,
    totalRounds: 10,
    onGameComplete: handleGameComplete,
  });

  return {
    todayStr,
    isCompletedToday: persistedState?.completed ?? false,
    dailyResult: persistedState,
    engine,
  };
}
