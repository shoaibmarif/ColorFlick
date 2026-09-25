import { useState, useCallback } from 'react';
import { GameMode, GameFormat, Difficulty, RoundResult } from '../types/game';
import { PlayerStats, Achievement } from '../types/stats';
import { Storage } from '../storage/localStorage';
import { soundManager } from '../utils/audio';

export interface NewlyUnlockedAchievement {
  achievement: Achievement;
}

export function useStats() {
  const [stats, setStats] = useState<PlayerStats>(() => Storage.getStats());
  const [achievements, setAchievements] = useState<Achievement[]>(() =>
    Storage.getAchievements()
  );
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement | null>(null);

  const checkAndUnlockAchievements = useCallback(
    (currentStats: PlayerStats, lastRound?: RoundResult, mode?: GameMode, format?: GameFormat, difficulty?: Difficulty) => {
      const allAchievements = Storage.getAchievements();
      let updated = false;
      let firstNewUnlock: Achievement | null = null;

      const unlock = (id: string) => {
        const item = allAchievements.find((a) => a.id === id);
        if (item && !item.unlockedAt) {
          item.unlockedAt = new Date().toISOString();
          updated = true;
          if (!firstNewUnlock) firstNewUnlock = item;
        }
      };

      // Condition 1: First Correct
      if (currentStats.totalCorrect >= 1) unlock('first_correct');
      // Condition 2: 10 Correct
      if (currentStats.totalCorrect >= 10) unlock('correct_10');
      // Condition 3: 50 Correct
      if (currentStats.totalCorrect >= 50) unlock('correct_50');
      // Condition 4: 100 Correct
      if (currentStats.totalCorrect >= 100) unlock('correct_100');
      // Condition 5: 500 Correct
      if (currentStats.totalCorrect >= 500) unlock('correct_500');
      // Condition 6: 10 Streak
      if (currentStats.bestStreak >= 10) unlock('streak_10');
      // Condition 7: Speed Colorist (< 1000ms correct)
      if (lastRound?.isCorrect && lastRound.responseTimeMs <= 1000) {
        unlock('speed_colorist');
      }
      // Condition 8: HEX Master
      if (currentStats.modeStats['hex-guess'].correctAnswers >= 5) {
        unlock('hex_master');
      }
      // Condition 9: RGB Master
      if (
        lastRound?.isCorrect &&
        mode === 'rgb-guess' &&
        (lastRound.differencePercentage !== undefined && lastRound.differencePercentage <= 5)
      ) {
        unlock('rgb_master');
      }
      // Condition 10: Expert Completed
      if (difficulty === 'expert') unlock('expert_completed');
      // Condition 11: Survival Champion
      if (format === 'survival' && (lastRound?.roundNumber ?? 0) >= 12) {
        unlock('survival_champion');
      }
      // Condition 12: Daily Challenge First
      if (currentStats.dailyCompletedCount >= 1) unlock('daily_first');
      // Condition 13: 7-Day Streak
      if (currentStats.longestDailyStreak >= 7) unlock('daily_streak_7');
      // Condition 14: 30-Day Streak
      if (currentStats.longestDailyStreak >= 30) unlock('daily_streak_30');

      if (updated) {
        Storage.saveAchievements(allAchievements);
        setAchievements([...allAchievements]);
        if (firstNewUnlock) {
          setNewlyUnlocked(firstNewUnlock);
          soundManager.playAchievement();
        }
      }
    },
    []
  );

  const recordRoundResult = useCallback(
    (mode: GameMode, result: RoundResult) => {
      setStats((prev) => {
        const isCorrect = result.isCorrect;
        const newStreak = isCorrect ? prev.currentStreak + 1 : 0;
        const bestStreak = Math.max(prev.bestStreak, newStreak);
        const fastestResponse = isCorrect
          ? prev.fastestResponseMs === null
            ? result.responseTimeMs
            : Math.min(prev.fastestResponseMs, result.responseTimeMs)
          : prev.fastestResponseMs;

        const currentModeStats = prev.modeStats[mode];
        const updatedModeStats = {
          ...currentModeStats,
          roundsPlayed: currentModeStats.roundsPlayed + 1,
          correctAnswers: currentModeStats.correctAnswers + (isCorrect ? 1 : 0),
          totalScore: currentModeStats.totalScore + result.scoreEarned,
          highestScore: Math.max(currentModeStats.highestScore, result.scoreEarned),
          bestStreak: Math.max(currentModeStats.bestStreak, newStreak),
          totalResponseTimeMs: currentModeStats.totalResponseTimeMs + result.responseTimeMs,
        };

        const updated: PlayerStats = {
          ...prev,
          totalRounds: prev.totalRounds + 1,
          totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
          totalScore: prev.totalScore + result.scoreEarned,
          highestScore: Math.max(prev.highestScore, result.scoreEarned),
          currentStreak: newStreak,
          bestStreak,
          fastestResponseMs: fastestResponse,
          totalResponseTimeMs: prev.totalResponseTimeMs + result.responseTimeMs,
          modeStats: {
            ...prev.modeStats,
            [mode]: updatedModeStats,
          },
        };

        Storage.saveStats(updated);
        checkAndUnlockAchievements(updated, result, mode);
        return updated;
      });
    },
    [checkAndUnlockAchievements]
  );

  const recordGameComplete = useCallback(
    (
      mode: GameMode,
      format: GameFormat,
      difficulty: Difficulty,
      score: number,
      rounds: RoundResult[]
    ) => {
      const correctCount = rounds.filter((r) => r.isCorrect).length;
      const accuracy = rounds.length > 0 ? Math.round((correctCount / rounds.length) * 100) : 0;

      // Save to game history
      Storage.addHistoryEntry({
        id: `game-${Date.now()}`,
        timestamp: Date.now(),
        mode,
        format,
        difficulty,
        score,
        accuracy,
        rounds,
      });

      setStats((prev) => {
        const modeStat = prev.modeStats[mode];
        const updatedModeStat = {
          ...modeStat,
          gamesPlayed: modeStat.gamesPlayed + 1,
          highestScore: Math.max(modeStat.highestScore, score),
        };

        const updated: PlayerStats = {
          ...prev,
          totalGames: prev.totalGames + 1,
          highestScore: Math.max(prev.highestScore, score),
          modeStats: {
            ...prev.modeStats,
            [mode]: updatedModeStat,
          },
        };

        Storage.saveStats(updated);

        // Check for Perfect Round achievement (10+ rounds with 100% accuracy)
        if (rounds.length >= 10 && accuracy === 100) {
          const allAch = Storage.getAchievements();
          const p = allAch.find((a) => a.id === 'perfect_round');
          if (p && !p.unlockedAt) {
            p.unlockedAt = new Date().toISOString();
            Storage.saveAchievements(allAch);
            setAchievements([...allAch]);
            setNewlyUnlocked(p);
            soundManager.playAchievement();
          }
        }

        checkAndUnlockAchievements(updated, rounds[rounds.length - 1], mode, format, difficulty);
        return updated;
      });
    },
    [checkAndUnlockAchievements]
  );

  const clearNewAchievementToast = useCallback(() => {
    setNewlyUnlocked(null);
  }, []);

  const resetAllStats = useCallback(() => {
    Storage.resetAllData();
    setStats(Storage.getStats());
    setAchievements(Storage.getAchievements());
  }, []);

  return {
    stats,
    achievements,
    newlyUnlocked,
    clearNewAchievementToast,
    recordRoundResult,
    recordGameComplete,
    resetAllStats,
  };
}
