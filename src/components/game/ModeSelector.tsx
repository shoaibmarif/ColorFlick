import React from 'react';
import { GameMode, GameFormat } from '../../types/game';
import { Eye, Sliders, Hash, Tag, SunMedium, Moon, Compass, Pipette, Palette, Zap, Heart, Flame, Timer, GraduationCap } from 'lucide-react';

interface ModeSelectorProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  currentFormat?: GameFormat;
  onSelectFormat?: (format: GameFormat) => void;
  disabled?: boolean;
}

export const MODES: { id: GameMode; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'exact-color', label: 'Exact Color', icon: <Eye className="w-4 h-4" />, desc: 'Find the swatch that matches' },
  { id: 'rgb-guess', label: 'RGB Mix', icon: <Sliders className="w-4 h-4" />, desc: 'Mix with red, green and blue sliders' },
  { id: 'hex-guess', label: 'HEX Code', icon: <Hash className="w-4 h-4" />, desc: 'Type the hex code you see' },
  { id: 'color-picker', label: 'Color Picker', icon: <Pipette className="w-4 h-4" />, desc: 'Recreate the color with a picker' },
  { id: 'color-match', label: 'Color Match', icon: <Palette className="w-4 h-4" />, desc: 'Match using HSL sliders' },
  { id: 'color-name', label: 'Color Name', icon: <Tag className="w-4 h-4" />, desc: 'Name the color' },
  { id: 'warm-cool', label: 'Warm / Cool', icon: <SunMedium className="w-4 h-4" />, desc: 'Sort colors into warm, cool or neutral' },
  { id: 'light-dark', label: 'Light / Dark', icon: <Moon className="w-4 h-4" />, desc: 'Is the color light or dark?' },
  { id: 'closest-color', label: 'Closest Color', icon: <Compass className="w-4 h-4" />, desc: 'Pick the nearest of several shades' },
];

export const FORMATS: { id: GameFormat; label: string; icon: React.ReactNode }[] = [
  { id: 'standard', label: 'Standard (10)', icon: <Eye className="w-3.5 h-3.5" /> },
  { id: 'quick-challenge', label: 'Quick Escalation', icon: <Zap className="w-3.5 h-3.5" /> },
  { id: 'timed', label: 'Timed Sprint', icon: <Timer className="w-3.5 h-3.5" /> },
  { id: 'endless', label: 'Endless (3 Lives)', icon: <Heart className="w-3.5 h-3.5" /> },
  { id: 'survival', label: 'Survival', icon: <Flame className="w-3.5 h-3.5" /> },
  { id: 'practice', label: 'Practice', icon: <GraduationCap className="w-3.5 h-3.5" /> },
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onSelectMode,
  currentFormat,
  onSelectFormat,
  disabled = false,
}) => {
  return (
    <div className="w-full space-y-2.5">
      {/* Mode Chips with smooth scroll */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar snap-x touch-pan-x">
          {MODES.map((m) => {
            const isActive = currentMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                disabled={disabled}
                onClick={() => onSelectMode(m.id)}
                aria-pressed={isActive}
                className={`snap-start flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium whitespace-nowrap transition-colors select-none ${
                  isActive
                    ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
                }`}
              >
                <span className="opacity-70" aria-hidden="true">{m.icon}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Format Selector if supported */}
      {currentFormat && onSelectFormat && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="mr-1 text-sm text-zinc-500 dark:text-zinc-400">Format</span>
          <div className="inline-flex p-1 bg-zinc-100 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800">
            {FORMATS.map((f) => {
              const isActive = currentFormat === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => onSelectFormat(f.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium text-xs whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-card'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  {f.icon}
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
