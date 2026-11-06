import React from 'react';
import { Flame } from 'lucide-react';

interface StreakDisplayProps {
  streak: number;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ streak }) => {
  if (streak <= 0) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-all animate-pop ${
        streak >= 10
          ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200'
          : streak >= 5
          ? 'bg-amber-500 text-white'
          : 'bg-zinc-100 dark:bg-zinc-800 text-amber-600 dark:text-amber-400 border border-amber-500/30'
      }`}
      aria-label={`Current streak: ${streak} correct in a row`}
    >
      <Flame className="w-3.5 h-3.5 fill-current" />
      <span>{streak} Streak</span>
      {streak >= 3 && (
        <span className="text-xs opacity-90 font-mono">
          +{Math.min(150, streak * 15)} bonus
        </span>
      )}
    </div>
  );
};
