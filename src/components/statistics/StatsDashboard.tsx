import React, { useState } from 'react';
import { PlayerStats, Achievement } from '../../types/stats';
import { GameMode } from '../../types/game';
import { MODES } from '../game/ModeSelector';
import { formatScore } from '../../utils/scoring';
import { Target, Flame, Zap, Trophy, Calendar, Award } from 'lucide-react';
import { Button } from '../ui/Button';

interface StatsDashboardProps {
  stats: PlayerStats;
  achievements: Achievement[];
  onPlayNow?: () => void;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  stats,
  achievements,
  onPlayNow,
}) => {
  const [selectedModeTab, setSelectedModeTab] = useState<GameMode>('exact-color');

  const accuracy =
    stats.totalRounds > 0
      ? Math.round((stats.totalCorrect / stats.totalRounds) * 100)
      : 0;

  const avgResponseTimeSec =
    stats.totalRounds > 0
      ? (stats.totalResponseTimeMs / stats.totalRounds / 1000).toFixed(1)
      : '0.0';

  const fastestSec =
    stats.fastestResponseMs !== null
      ? (stats.fastestResponseMs / 1000).toFixed(2)
      : '—';

  const modeStat = stats.modeStats[selectedModeTab];
  const modeAccuracy =
    modeStat && modeStat.roundsPlayed > 0
      ? Math.round((modeStat.correctAnswers / modeStat.roundsPlayed) * 100)
      : 0;

  const unlockedCount = achievements.filter((a) => a.unlockedAt !== null).length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Empty State if no games */}
      {stats.totalGames === 0 ? (
        <div className="text-center py-12 px-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="w-16 h-16 bg-brand-100 dark:bg-brand-950/60 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400 mx-auto">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            No games played yet
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Start your first color challenge to track accuracy, reaction speed, streaks, and unlock achievements!
          </p>
          {onPlayNow && (
            <Button onClick={onPlayNow} variant="primary" size="md">
              Play First Game
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* Global Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-500" />
                Accuracy
              </span>
              <div className="mt-2 font-mono text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {accuracy}%
              </div>
              <span className="text-[11px] text-slate-400 mt-1">
                {stats.totalCorrect} / {stats.totalRounds} correct
              </span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                High Score
              </span>
              <div className="mt-2 font-mono text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {formatScore(stats.highestScore)}
              </div>
              <span className="text-[11px] text-slate-400 mt-1">
                {stats.totalGames} games completed
              </span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500" />
                Best Streak
              </span>
              <div className="mt-2 font-mono text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {stats.bestStreak}
              </div>
              <span className="text-[11px] text-slate-400 mt-1">
                Current: {stats.currentStreak}
              </span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-sky-500" />
                Avg Speed
              </span>
              <div className="mt-2 font-mono text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {avgResponseTimeSec}s
              </div>
              <span className="text-[11px] text-slate-400 mt-1">
                Fastest: {fastestSec}s
              </span>
            </div>
          </div>

          {/* Daily Streak Highlight */}
          <div className="p-4 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-brand-500/10 rounded-2xl border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-md">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Daily Challenge Streak
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {stats.dailyCompletedCount} challenges finished • Longest: {stats.longestDailyStreak} days
                </p>
              </div>
            </div>
            <div className="font-mono text-2xl font-black text-amber-600 dark:text-amber-400">
              🔥 {stats.dailyStreak} Days
            </div>
          </div>

          {/* Mode-Specific Stats Tab */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Performance by Game Mode
            </h3>

            {/* Mode Sub-Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModeTab(m.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                    selectedModeTab === m.id
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Selected Mode Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Games</span>
                <p className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                  {modeStat?.gamesPlayed || 0}
                </p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Rounds</span>
                <p className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                  {modeStat?.roundsPlayed || 0}
                </p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Accuracy</span>
                <p className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                  {modeAccuracy}%
                </p>
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Mode Best</span>
                <p className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                  {formatScore(modeStat?.highestScore || 0)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Achievements Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Achievements
            </h3>
          </div>
          <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
            {unlockedCount} / {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {achievements.map((ach) => {
            const isUnlocked = ach.unlockedAt !== null;
            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                  isUnlocked
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div
                  className={`text-2xl p-2 rounded-xl flex-shrink-0 ${
                    isUnlocked ? 'bg-amber-100 dark:bg-amber-900/50' : 'bg-slate-200 dark:bg-slate-700/50 grayscale'
                  }`}
                >
                  {ach.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                      {ach.title}
                    </h4>
                    {isUnlocked && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
