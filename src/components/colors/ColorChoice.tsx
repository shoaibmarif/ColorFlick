import React from 'react';
import { RoundChoice } from '../../types/game';
import { getOptimalTextColor } from '../../utils/contrast';
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
  const textColor = getOptimalTextColor(choice.hex);

  // Accessible border and badge states
  let stateClasses = 'ring-1 ring-slate-200 dark:ring-slate-800 hover:ring-2 hover:ring-brand-500 hover:scale-[1.02] active:scale-[0.98]';

  if (isAnswered) {
    if (choice.isCorrect) {
      stateClasses = 'ring-4 ring-emerald-500 shadow-lg scale-[1.03] z-10';
    } else if (isSelected && !choice.isCorrect) {
      stateClasses = 'ring-4 ring-rose-500 opacity-80';
    } else {
      stateClasses = 'opacity-40 grayscale-[25%]';
    }
  }

  const patternStyle = accessiblePattern
    ? {
        backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.15) 1.5px, transparent 0)`,
        backgroundSize: '10px 10px',
      }
    : {};

  return (
    <button
      type="button"
      onClick={() => onSelect(choice.id)}
      disabled={disabled || isAnswered}
      aria-label={`Choice ${index + 1}: ${choice.label || choice.hex}`}
      style={{
        backgroundColor: choice.hex,
        ...patternStyle,
      }}
      className={`relative group w-full h-20 sm:h-24 md:h-28 rounded-2xl flex flex-col items-center justify-between p-2.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-brand-400 select-none shadow-md ${stateClasses}`}
    >
      {/* Top Header: Shortcut Key badge & Status Indicator */}
      <div className="w-full flex items-center justify-between pointer-events-none">
        <span
          className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold backdrop-blur-md bg-black/30 shadow-sm transition-opacity"
          style={{ color: textColor }}
        >
          {index + 1}
        </span>

        {isAnswered && (
          <div>
            {choice.isCorrect ? (
              <span className="flex items-center gap-0.5 bg-emerald-600 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-md">
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="sr-only">Correct</span>
              </span>
            ) : isSelected ? (
              <span className="flex items-center gap-0.5 bg-rose-600 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-md">
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="sr-only">Incorrect</span>
              </span>
            ) : null}
          </div>
        )}
      </div>

      {/* Center Label (Name, HEX or Category) */}
      <div
        className="font-bold text-sm sm:text-base tracking-wide px-2 py-0.5 rounded-lg backdrop-blur-sm bg-black/15 transition-all"
        style={{ color: textColor }}
      >
        {choice.label ? choice.label : showCode || isAnswered ? choice.hex : ''}
      </div>

      <div className="w-full h-1" />
    </button>
  );
};
