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

  // Tactile arcade 3D states
  let stateClasses =
    'shadow-[0_5px_0_0_rgba(0,0,0,0.16)] hover:shadow-[0_7px_0_0_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none ring-1 ring-black/10 dark:ring-white/10 cursor-pointer';

  if (isAnswered) {
    if (choice.isCorrect) {
      stateClasses =
        'ring-4 ring-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.5)] scale-[1.03] z-10 cursor-default';
    } else if (isSelected && !choice.isCorrect) {
      stateClasses = 'ring-4 ring-rose-500 opacity-80 cursor-default';
    } else {
      stateClasses = 'opacity-35 grayscale-[25%] cursor-default';
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
      aria-label={`Choice ${index + 1}: ${choice.label || choice.hex}`}
      style={{
        backgroundColor: choice.hex,
        ...patternStyle,
      }}
      className={`relative group w-full h-22 sm:h-26 md:h-28 rounded-2xl flex flex-col items-center justify-between p-2.5 sm:p-3 transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-brand-400 select-none overflow-hidden ${stateClasses}`}
    >
      {/* Specular Glare & Inner Shading */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/20 via-transparent to-black/15 rounded-2xl" />

      {/* Top Header: Shortcut Keycap & Status Indicator */}
      <div className="relative z-10 w-full flex items-center justify-between pointer-events-none">
        <kbd
          className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-black uppercase tracking-wider bg-black/45 text-white backdrop-blur-md shadow-xs border border-white/20"
        >
          {index + 1}
        </kbd>

        {isAnswered && (
          <div>
            {choice.isCorrect ? (
              <span className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded-full text-xs font-black shadow-md animate-pop">
                <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />
                <span>MATCH</span>
              </span>
            ) : isSelected ? (
              <span className="flex items-center gap-1 bg-rose-600 text-white px-2 py-0.5 rounded-full text-xs font-black shadow-md animate-shake">
                <X className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />
                <span>MISS</span>
              </span>
            ) : null}
          </div>
        )}
      </div>

      {/* Center Label (Name, HEX or Category) */}
      {displayLabel && (
        <div
          className="relative z-10 font-extrabold text-xs sm:text-sm tracking-wide px-3 py-1 rounded-xl backdrop-blur-md bg-black/40 text-white shadow-md border border-white/15 text-center max-w-[92%] truncate"
        >
          {displayLabel}
        </div>
      )}

      {/* Bottom spacer for tactile balance */}
      <div className="w-full h-1" />
    </button>
  );
};
