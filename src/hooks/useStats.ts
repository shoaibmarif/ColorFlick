import { useState, useCallback } from 'react';
import { GameMode, GameFormat, Difficulty, RoundResult } from '../types/game';
import { PlayerStats, Achievement } from '../types/stats';
import { Storage } from '../storage/localStorage';
import { soundManager } from '../utils/audio';
import { trackEvent } from '../utils/analytics';

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
    (
      currentStats: PlayerStats,
      lastRound?: RoundResult,
      _mode?: GameMode,
      format?: GameFormat,
      difficulty?: Difficulty,
      gameScore?: number
    ) => {
      const allAchievements = Storage.getAchievements();
      let updated = false;
      let firstNewUnlock: Achievement | null = null;

      const unlock = (id: string) => {
        const item = allAchievements.find((a) => a.id === id);
        if (item && !item.unlockedAt) {
          item.unlockedAt = new Date().toISOString();
          updated = true;
          if (!firstNewUnlock) firstNewUnlock = item;
          trackEvent('achievement_unlocked', { achievementId: id, title: item.title });
        }
      };

      // 1. First Game
      if (currentStats.totalGames >= 1) unlock('first_game');
      // 2. First Perfect Answer
      if (lastRound?.isCorrect && (lastRound.differencePercentage === 0 || lastRound.differencePercentage === undefined)) {
        unlock('first_perfect');
      }
      // 3. Correct Counts
      if (currentStats.totalCorrect >= 5) unlock('correct_5');
      if (currentStats.totalCorrect >= 10) unlock('correct_10');
      if (currentStats.totalCorrect >= 25) unlock('correct_25');
      if (currentStats.totalCorrect >= 50) unlock('correct_50');
      if (currentStats.totalCorrect >= 100) unlock('correct_100');
      // 4. Streaks
      if (currentStats.bestStreak >= 10) unlock('streak_10');
      if (currentStats.bestStreak >= 25) unlock('streak_25');
      // 5. Daily Challenge
      if (currentStats.dailyCompletedCount >= 1 || format === 'daily') unlock('daily_complete');
      if (currentStats.longestDailyStreak >= 7) unlock('daily_streak_7');
      if (currentStats.longestDailyStreak >= 30) unlock('daily_streak_30');
      // 6. Color Master (90%+ accuracy across 50+ rounds)
      if (currentStats.totalRounds >= 50 && (currentStats.totalCorrect / currentStats.totalRounds) >= 0.9) {
        unlock('color_master');
      }
      // 7. Speed Demon (< 1000ms correct with tight accuracy)
      if (lastRound?.isCorrect && lastRound.responseTimeMs <= 1000 && (lastRound.differencePercentage === undefined || lastRound.differencePercentage <= 5)) {
        unlock('speed_demon');
      }
      // 8. Expert Player
      if (difficulty === 'expert' && (gameScore ?? 0) >= 1500) {
        unlock('expert_player');
      }

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
      trackEvent('answer_submitted', {
        mode,
        isCorrect: result.isCorrect,
        responseTimeMs: result.responseTimeMs,
        scoreEarned: result.scoreEarned,
      });

      setStats((prev) => {
        const isCorrect = result.isCorrect;
        const newStreak = isCorrect ? prev.currentStreak + 1 : 0;
        const bestStreak = Math.max(prev.bestStreak, newStreak);
        const fastestResponse = isCorrect
          ? prev.fastestResponseMs === null
            ? result.responseTimeMs
            : Math.min(prev.fastestResponseMs, result.responseTimeMs)
          : prev.fastestResponseMs;

        const currentModeStats = prev.modeStats[mode] || {
          gamesPlayed: 0,
          roundsPlayed: 0,
          correctAnswers: 0,
          totalScore: 0,
          highestScore: 0,
          bestStreak: 0,
          totalResponseTimeMs: 0,
        };

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
      const totalDuration = rounds.reduce((sum, r) => sum + r.responseTimeMs, 0);

      // Compute streak achieved in this session
      let maxSessionStreak = 0;
      let curStreak = 0;
      for (const r of rounds) {
        if (r.isCorrect) {
          curStreak++;
          if (curStreak > maxSessionStreak) maxSessionStreak = curStreak;
        } else {
          curStreak = 0;
        }
      }

      // Save to game history
      Storage.addHistoryEntry({
        id: `game-${Date.now()}`,
        timestamp: Date.now(),
        date: new Date().toISOString(),
        mode,
        format,
        difficulty,
        score,
        accuracy,
        durationMs: totalDuration,
        bestStreak: maxSessionStreak,
        rounds,
      });

      trackEvent('game_completed', {
        mode,
        format,
        difficulty,
        score,
        accuracy,
      });

      setStats((prev) => {
        const modeStat = prev.modeStats[mode] || {
          gamesPlayed: 0,
          roundsPlayed: 0,
          correctAnswers: 0,
          totalScore: 0,
          highestScore: 0,
          bestStreak: 0,
          totalResponseTimeMs: 0,
        };

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

        checkAndUnlockAchievements(
          updated,
          rounds[rounds.length - 1],
          mode,
          format,
          difficulty,
          score
        );
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
