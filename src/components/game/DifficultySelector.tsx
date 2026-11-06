import React from 'react';
import { Difficulty } from '../../types/game';

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onSelectDifficulty: (diff: Difficulty) => void;
  disabled?: boolean;
}

const DIFFICULTIES: { id: Difficulty; label: string }[] = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
  { id: 'expert', label: 'Expert' },
];

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  onSelectDifficulty,
  disabled = false,
}) => (
  <div
    role="radiogroup"
    aria-label="Difficulty"
    className="inline-flex rounded-lg border border-zinc-200 bg-zinc-100 p-0.5 dark:border-zinc-800 dark:bg-zinc-900"
  >
    {DIFFICULTIES.map((d) => {
      const isActive = currentDifficulty === d.id;
      return (
        <button
          key={d.id}
          type="button"
          role="radio"
          aria-checked={isActive}
          disabled={disabled}
          onClick={() => onSelectDifficulty(d.id)}
          className={`h-8 rounded-md px-3 text-sm font-medium transition-colors select-none ${
            isActive
              ? 'bg-white text-zinc-900 shadow-card dark:bg-zinc-700 dark:text-white'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          {d.label}
        </button>
      );
    })}
  </div>
);
