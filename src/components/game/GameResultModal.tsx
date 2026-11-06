import React from 'react';
import { RoundResult, GameMode, GameFormat, Difficulty } from '../../types/game';
import { formatScore } from '../../utils/scoring';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Trophy, Flame, Zap, Target, RotateCcw } from 'lucide-react';

interface GameResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  onViewStats?: () => void;
  mode?: GameMode;
  format?: GameFormat;
  difficulty?: Difficulty;
  score: number;
  rounds: RoundResult[];
  isNewPersonalBest?: boolean;
}

export const GameResultModal: React.FC<GameResultModalProps> = ({
  isOpen,
  onClose,
  onRestart,
  score,
  rounds,
  isNewPersonalBest = false,
}) => {
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Challenge Complete" maxWidth="md">
      <div className="space-y-6 text-center">
        {/* Celebration Header */}
        <div className="relative flex flex-col items-center">
          <div className="w-20 h-20 bg-amber-100 dark:bg-amber-950/60 rounded-full flex items-center justify-center text-amber-500 mb-3 ring-8 ring-amber-500/10">
            <Trophy className="w-10 h-10" />
          </div>

          {isNewPersonalBest && (
            <span className="inline-block bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200 font-medium text-xs px-3 py-1 rounded-full mb-2">
              New Personal Best!
            </span>
          )}

          <div className="font-mono text-4xl sm:text-5xl font-semibold text-zinc-900 dark:text-white">
            {formatScore(score)}
          </div>
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
            Total Points Earned
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 bg-zinc-50 dark:bg-zinc-800/60 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700">
          <div className="flex flex-col items-center p-2">
            <Target className="w-5 h-5 text-emerald-500 mb-1" />
            <span className="font-mono text-lg font-semibold text-zinc-900 dark:text-white">
              {accuracy}%
            </span>
            <span className="text-xs font-semibold text-zinc-500">
              {correctCount}/{totalRounds} Correct
            </span>
          </div>

          <div className="flex flex-col items-center p-2 border-x border-zinc-200 dark:border-zinc-700">
            <Flame className="w-5 h-5 text-amber-500 mb-1" />
            <span className="font-mono text-lg font-semibold text-zinc-900 dark:text-white">
              {bestStreak}
            </span>
            <span className="text-xs font-semibold text-zinc-500">
              Best Streak
            </span>
          </div>

          <div className="flex flex-col items-center p-2">
            <Zap className="w-5 h-5 text-sky-500 mb-1" />
            <span className="font-mono text-lg font-semibold text-zinc-900 dark:text-white">
              {avgResponseTimeSec}s
            </span>
            <span className="text-xs font-semibold text-zinc-500">
              Avg Speed
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2">
          <Button onClick={onRestart} variant="primary" size="lg" className="w-full gap-2">
            <RotateCcw className="w-5 h-5" />
            <span>Play Again</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
