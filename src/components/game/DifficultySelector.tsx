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
    <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner">
      {DIFFICULTIES.map((d) => {
        const isActive = currentDifficulty === d.id;
        return (
          <button
            key={d.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectDifficulty(d.id)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all select-none ${
              isActive
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {d.label}
          </button>
        );
      })}
    </div>
  );
};
