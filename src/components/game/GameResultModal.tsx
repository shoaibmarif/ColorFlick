import React, { useState } from 'react';
import { RoundResult, GameMode, GameFormat, Difficulty } from '../../types/game';
import { formatScore } from '../../utils/scoring';
import { shareGameResult } from '../../utils/share';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Trophy, Flame, Zap, Target, Share2, RotateCcw, BarChart3, Check } from 'lucide-react';

interface GameResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  onViewStats: () => void;
  mode: GameMode;
  format: GameFormat;
  difficulty: Difficulty;
  score: number;
  rounds: RoundResult[];
  isNewPersonalBest?: boolean;
}

export const GameResultModal: React.FC<GameResultModalProps> = ({
  isOpen,
  onClose,
  onRestart,
  onViewStats,
  mode,
  score,
  rounds,
  isNewPersonalBest = false,
}) => {
  const [copied, setCopied] = useState(false);

  const totalRounds = rounds.length;
  const correctCount = rounds.filter((r) => r.isCorrect).length;
  const accuracy = totalRounds > 0 ? Math.round((correctCount / totalRounds) * 100) : 0;

  // Calculate best streak within these rounds
  let currentRun = 0;
  let bestStreak = 0;
  let totalTimeMs = 0;

  rounds.forEach((r) => {
    totalTimeMs += r.responseTimeMs;
    if (r.isCorrect) {
      currentRun++;
      if (currentRun > bestStreak) bestStreak = currentRun;
    } else {
      currentRun = 0;
    }
  });

  const avgResponseTimeSec = totalRounds > 0 ? (totalTimeMs / totalRounds / 1000).toFixed(1) : '0.0';

  const handleShare = async () => {
    const res = await shareGameResult({
      modeName: mode.replace('-', ' ').toUpperCase(),
      score,
      accuracy,
      bestStreak,
      roundCount: totalRounds,
    });
    if (res.method === 'clipboard' || res.success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Challenge Complete" maxWidth="md">
      <div className="space-y-6 text-center">
        {/* Celebration Header */}
        <div className="relative flex flex-col items-center">
          <div className="w-20 h-20 bg-amber-100 dark:bg-amber-950/60 rounded-full flex items-center justify-center text-amber-500 mb-3 ring-8 ring-amber-500/10">
            <Trophy className="w-10 h-10" />
          </div>

          {isNewPersonalBest && (
            <span className="inline-block bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md mb-2 animate-bounce">
              New Personal Best!
            </span>
          )}

          <div className="font-mono text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
            {formatScore(score)}
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
            Total Points Earned
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col items-center p-2">
            <Target className="w-5 h-5 text-emerald-500 mb-1" />
            <span className="font-mono text-lg font-bold text-slate-900 dark:text-white">
              {accuracy}%
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500">
              {correctCount}/{totalRounds} Correct
            </span>
          </div>

          <div className="flex flex-col items-center p-2 border-x border-slate-200 dark:border-slate-700">
            <Flame className="w-5 h-5 text-amber-500 mb-1" />
            <span className="font-mono text-lg font-bold text-slate-900 dark:text-white">
              {bestStreak}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500">
              Best Streak
            </span>
          </div>

          <div className="flex flex-col items-center p-2">
            <Zap className="w-5 h-5 text-sky-500 mb-1" />
            <span className="font-mono text-lg font-bold text-slate-900 dark:text-white">
              {avgResponseTimeSec}s
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500">
              Avg Speed
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Button onClick={onRestart} variant="primary" size="lg" className="w-full gap-2">
            <RotateCcw className="w-5 h-5" />
            <span>Play Again</span>
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button onClick={handleShare} variant="secondary" size="md" className="gap-2">
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </>
              )}
            </Button>

            <Button onClick={onViewStats} variant="outline" size="md" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span>Statistics</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
