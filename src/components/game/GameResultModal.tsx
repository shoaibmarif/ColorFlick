import React, { useState } from 'react';
import { shareGameResult } from '../../utils/share';
import { MODE_GUIDES, difficultyLabel } from '../../data/modeGuides';
import { RoundResult, GameMode, GameFormat, Difficulty } from '../../types/game';
import { formatScore } from '../../utils/scoring';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Trophy, Flame, Zap, Target, RotateCcw, Share2, Check } from 'lucide-react';

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
  mode = 'exact-color',
  difficulty = 'medium',
  isNewPersonalBest = false,
}) => {
  const [shared, setShared] = useState(false);
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
    <Modal isOpen={isOpen} onClose={onClose} title="Game over" maxWidth="md">
      <div className="space-y-6 text-center">
        {/* Celebration Header */}
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 bg-sun-100 dark:bg-sun-900/40 rounded-full flex items-center justify-center text-sun-600 mb-3">
            <Trophy className="w-10 h-10" />
          </div>

          {isNewPersonalBest && (
            <span className="inline-block bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200 font-medium text-xs px-3 py-1 rounded-full mb-2">
              New personal best
            </span>
          )}

          <div className="tabular-nums text-4xl sm:text-5xl font-semibold text-zinc-900 dark:text-white">
            {formatScore(score)}
          </div>
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
            points
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 bg-zinc-50 dark:bg-zinc-800/60 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700">
          <div className="flex flex-col items-center p-2">
            <Target className="w-5 h-5 text-mint-500 mb-1" />
            <span className="tabular-nums text-lg font-semibold text-zinc-900 dark:text-white">
              {accuracy}%
            </span>
            <span className="text-xs font-semibold text-zinc-500">
              {correctCount}/{totalRounds} correct
            </span>
          </div>

          <div className="flex flex-col items-center p-2 border-x border-zinc-200 dark:border-zinc-700">
            <Flame className="w-5 h-5 text-coral-500 mb-1" />
            <span className="tabular-nums text-lg font-semibold text-zinc-900 dark:text-white">
              {bestStreak}
            </span>
            <span className="text-xs font-semibold text-zinc-500">
              Best streak
            </span>
          </div>

          <div className="flex flex-col items-center p-2">
            <Zap className="w-5 h-5 text-brand-500 mb-1" />
            <span className="tabular-nums text-lg font-semibold text-zinc-900 dark:text-white">
              {avgResponseTimeSec}s
            </span>
            <span className="text-xs font-semibold text-zinc-500">
              Avg. time
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid gap-2 pt-2 sm:grid-cols-2">
          <Button onClick={onRestart} variant="primary" size="lg" className="w-full">
            <RotateCcw className="h-5 w-5" />
            Play again
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={async () => {
              const how = await shareGameResult({
                modeName: `${MODE_GUIDES[mode].title} (${difficultyLabel(difficulty)})`,
                score,
                accuracy,
                bestStreak,
                roundCount: totalRounds,
              });
              if (how !== 'failed') {
                setShared(true);
                setTimeout(() => setShared(false), 2500);
              }
            }}
          >
            {shared ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
            {shared ? 'Shared' : 'Share score'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
