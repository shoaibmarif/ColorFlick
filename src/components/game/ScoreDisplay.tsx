import React from 'react';
import { formatScore } from '../../utils/scoring';

interface ScoreDisplayProps {
  score: number;
  roundNumber: number;
  totalRounds?: number;
  format: string;
  lives?: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  roundNumber,
  totalRounds = 10,
  format,
  lives = 3,
}) => {
  return (
    <div className="flex-1 flex items-center justify-between gap-2.5 px-1 py-1">
      {/* Round / Format Info */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Round</span>
        <span className="font-semibold tabular-nums text-zinc-900 dark:text-white">
          {roundNumber}
          {format !== 'endless' && format !== 'survival' && (
            <span className="text-zinc-400 dark:text-zinc-600 font-normal">
              /{totalRounds}
            </span>
          )}
        </span>

        {/* Endless Lives Hearts */}
        {format === 'endless' && (
          <div className="flex items-center gap-1 ml-1.5" title={`${lives} lives remaining`}>
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm sm:text-base transition-all duration-300 ${
                  i < lives
                    ? 'text-rose-500 scale-100'
                    : 'text-zinc-300 dark:text-zinc-800 scale-75'
                }`}
              >
                ♥
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Score */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Score</span>
        <span className="font-semibold tabular-nums text-zinc-900 dark:text-white">
          {formatScore(score)}
        </span>
      </div>
    </div>
  );
};
