import React from 'react';
import { Difficulty } from '../../types/game';

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onSelectDifficulty: (diff: Difficulty) => void;
  disabled?: boolean;
}

const DIFFICULTIES: { id: Difficulty; label: string; colorClass: string; badge: string }[] = [
  { id: 'easy', label: 'Easy', colorClass: 'text-emerald-500', badge: '3-4 Choices' },
  { id: 'medium', label: 'Medium', colorClass: 'text-sky-500', badge: '5-6 Choices' },
  { id: 'hard', label: 'Hard', colorClass: 'text-amber-500', badge: '6-8 Choices' },
  { id: 'expert', label: 'Expert', colorClass: 'text-rose-500', badge: '9 Choices' },
];

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  onSelectDifficulty,
  disabled = false,
}) => {
  return (
    <div className="inline-flex p-1 bg-slate-200/70 dark:bg-slate-900/80 rounded-2xl border border-slate-300/60 dark:border-slate-800 shadow-inner">
      {DIFFICULTIES.map((d) => {
        const isActive = currentDifficulty === d.id;
        return (
          <button
            key={d.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectDifficulty(d.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 select-none ${
              isActive
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm scale-100 ring-1 ring-black/5 dark:ring-white/10'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full transition-transform ${
                isActive ? 'scale-125' : 'opacity-40'
              } ${
                d.id === 'easy'
                  ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]'
                  : d.id === 'medium'
                  ? 'bg-sky-500 shadow-[0_0_6px_rgba(14,165,233,0.7)]'
                  : d.id === 'hard'
                  ? 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.7)]'
                  : 'bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.7)]'
              }`}
            />
            <span>{d.label}</span>
          </button>
        );
      })}
    </div>
  );
};
