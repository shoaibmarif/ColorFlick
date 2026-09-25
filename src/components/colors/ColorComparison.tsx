import React from 'react';
import { getOptimalTextColor } from '../../utils/contrast';

interface ColorComparisonProps {
  targetHex: string;
  playerHex: string;
  differencePercentage: number;
}

export const ColorComparison: React.FC<ColorComparisonProps> = ({
  targetHex,
  playerHex,
  differencePercentage,
}) => {
  const similarity = Math.max(0, Math.min(100, Math.round(100 - differencePercentage)));
  const targetTextColor = getOptimalTextColor(targetHex);
  const playerTextColor = getOptimalTextColor(playerHex);

  return (
    <div className="w-full bg-slate-100 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Target Swatch */}
        <div>
          <span className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
            Target
          </span>
          <div
            className="w-full h-20 rounded-xl flex items-center justify-center font-mono text-xs sm:text-sm font-bold shadow-md ring-1 ring-black/10"
            style={{ backgroundColor: targetHex, color: targetTextColor }}
          >
            {targetHex}
          </div>
        </div>

        {/* Player Swatch */}
        <div>
          <span className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
            Your Color
          </span>
          <div
            className="w-full h-20 rounded-xl flex items-center justify-center font-mono text-xs sm:text-sm font-bold shadow-md ring-1 ring-black/10"
            style={{ backgroundColor: playerHex, color: playerTextColor }}
          >
            {playerHex}
          </div>
        </div>
      </div>

      {/* Accuracy & Difference Stats */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-slate-600 dark:text-slate-300">
            Perceptual Match: <span className="text-brand-600 dark:text-brand-400">{similarity}%</span>
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            Difference: {differencePercentage.toFixed(1)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              similarity >= 90
                ? 'bg-emerald-500'
                : similarity >= 75
                ? 'bg-amber-500'
                : 'bg-rose-500'
            }`}
            style={{ width: `${similarity}%` }}
          />
        </div>
      </div>
    </div>
  );
};
