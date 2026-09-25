import React from 'react';
import { formatScore } from '../../utils/scoring';
import { Trophy } from 'lucide-react';

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
    <div className="flex items-center justify-between gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
      {/* Round / Format Info */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Round
        </span>
        <span className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 font-mono">
          {roundNumber}
          {format !== 'endless' && format !== 'survival' && (
            <span className="text-slate-400 dark:text-slate-500 font-normal">
              /{totalRounds}
            </span>
          )}
        </span>

        {/* Endless Lives */}
        {format === 'endless' && (
          <div className="flex items-center gap-1 ml-2" title={`${lives} lives remaining`}>
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm transition-transform ${
                  i < lives ? 'text-rose-500 scale-100' : 'text-slate-300 dark:text-slate-700 scale-90'
                }`}
              >
                ♥
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Score */}
      <div className="flex items-center gap-2">
        <Trophy className="w-4 h-4 text-amber-500" />
        <span className="font-mono font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
          {formatScore(score)}
        </span>
      </div>
    </div>
  );
};
