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
    <div className="flex-1 flex items-center justify-between gap-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3.5 sm:px-4 py-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
      {/* Round / Format Info */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
          RD
        </span>
        <span className="font-mono font-black text-sm sm:text-base text-slate-900 dark:text-white">
          {roundNumber}
          {format !== 'endless' && format !== 'survival' && (
            <span className="text-slate-400 dark:text-slate-600 font-normal">
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
                    ? 'text-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)] scale-100'
                    : 'text-slate-300 dark:text-slate-800 scale-75'
                }`}
              >
                ♥
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Score */}
      <div className="flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-400/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
        <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
        <span className="font-mono font-black text-sm sm:text-base text-amber-600 dark:text-amber-400">
          {formatScore(score)}
        </span>
      </div>
    </div>
  );
};
