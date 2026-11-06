import React from 'react';
import { RoundChoice } from '../../types/game';
import { Check, X } from 'lucide-react';

interface ColorChoiceProps {
  choice: RoundChoice;
  index: number;
  onSelect: (id: string) => void;
  disabled?: boolean;
  roundStatus: 'guessing' | 'answered' | 'completed';
  selectedId?: string;
  showCode?: boolean;
  accessiblePattern?: boolean;
}

export const ColorChoice: React.FC<ColorChoiceProps> = ({
  choice,
  index,
  onSelect,
  disabled = false,
  roundStatus,
  selectedId,
  showCode = false,
  accessiblePattern = false,
}) => {
  const isAnswered = roundStatus === 'answered' || roundStatus === 'completed';
  const isSelected = selectedId === choice.id;

  let stateClasses = 'ring-1 ring-inset ring-black/10 dark:ring-white/10 hover:ring-2 hover:ring-zinc-900/40 dark:hover:ring-white/50';

  if (isAnswered) {
    if (choice.isCorrect) {
      stateClasses = 'ring-[3px] ring-emerald-600 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900 z-10 cursor-default';
    } else if (isSelected && !choice.isCorrect) {
      stateClasses = 'ring-[3px] ring-red-600 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900 cursor-default';
    } else {
      stateClasses = 'opacity-40 cursor-default';
    }
  }

  const patternStyle = accessiblePattern
    ? {
        backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.2) 1.5px, transparent 0)`,
        backgroundSize: '10px 10px',
      }
    : {};

  const displayLabel = choice.label ? choice.label : showCode || isAnswered ? choice.hex : '';

  return (
    <button
      type="button"
      onClick={() => onSelect(choice.id)}
      disabled={disabled || isAnswered}
      aria-label={`Choice ${index + 1}${choice.label ? `: ${choice.label}` : ''}${
        isAnswered ? (choice.isCorrect ? ', correct answer' : isSelected ? ', your answer, incorrect' : '') : ''
      }`}
      style={{ backgroundColor: choice.hex, ...patternStyle }}
      className={`relative flex h-24 w-full select-none flex-col justify-between rounded-xl p-2.5 transition-[box-shadow,opacity] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-500 sm:h-28 ${stateClasses}`}
    >
      <span className="flex w-full items-center justify-between">
        <kbd className="rounded bg-black/55 px-1.5 py-0.5 text-xs font-medium text-white">{index + 1}</kbd>
        {isAnswered && choice.isCorrect && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white animate-pop">
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
            Match
          </span>
        )}
        {isAnswered && isSelected && !choice.isCorrect && (
          <span className="flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white animate-shake">
            <X className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
            Miss
          </span>
        )}
      </span>

      {displayLabel && (
        <span className="mx-auto max-w-[92%] truncate rounded-md bg-black/55 px-2 py-0.5 text-center text-xs font-medium text-white sm:text-sm">
          {displayLabel}
        </span>
      )}
      <span />
    </button>
  );
};
