import React from 'react';
import { GameMode, GameFormat } from '../../types/game';
import { Eye, Sliders, Hash, Tag, SunMedium, Moon, Compass, Zap, Heart, Flame } from 'lucide-react';

interface ModeSelectorProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  currentFormat?: GameFormat;
  onSelectFormat?: (format: GameFormat) => void;
  disabled?: boolean;
}

export const MODES: { id: GameMode; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'exact-color', label: 'Exact Color', icon: <Eye className="w-4 h-4" />, desc: 'Match the target swatch' },
  { id: 'rgb-guess', label: 'RGB Mix', icon: <Sliders className="w-4 h-4" />, desc: 'Tune red, green, blue values' },
  { id: 'hex-guess', label: 'HEX Code', icon: <Hash className="w-4 h-4" />, desc: 'Input the hex color code' },
  { id: 'color-name', label: 'Color Name', icon: <Tag className="w-4 h-4" />, desc: 'Identify by official name' },
  { id: 'warm-cool', label: 'Warm / Cool', icon: <SunMedium className="w-4 h-4" />, desc: 'Color temperature classification' },
  { id: 'light-dark', label: 'Light / Dark', icon: <Moon className="w-4 h-4" />, desc: 'WCAG relative luminance' },
  { id: 'closest-color', label: 'Closest Color', icon: <Compass className="w-4 h-4" />, desc: 'Perceptual OKLab distance' },
];

export const FORMATS: { id: GameFormat; label: string; icon: React.ReactNode }[] = [
  { id: 'standard', label: 'Standard (10)', icon: <Eye className="w-3.5 h-3.5" /> },
  { id: 'quick-challenge', label: 'Quick (30s)', icon: <Zap className="w-3.5 h-3.5" /> },
  { id: 'endless', label: 'Endless (3 Lives)', icon: <Heart className="w-3.5 h-3.5 text-rose-500" /> },
  { id: 'survival', label: 'Survival', icon: <Flame className="w-3.5 h-3.5 text-amber-500" /> },
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onSelectMode,
  currentFormat,
  onSelectFormat,
  disabled = false,
}) => {
  return (
    <div className="w-full space-y-3">
      {/* Mode Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar">
        {MODES.map((m) => {
          const isActive = currentMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectMode(m.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all select-none ${
                isActive
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25 scale-[1.02]'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {m.icon}
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Format Selector if supported */}
      {currentFormat && onSelectFormat && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase mr-1">
            Format:
          </span>
          {FORMATS.map((f) => {
            const isActive = currentFormat === f.id;
            return (
              <button
                key={f.id}
                type="button"
                disabled={disabled}
                onClick={() => onSelectFormat(f.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-xs transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {f.icon}
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
