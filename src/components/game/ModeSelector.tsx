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
  { id: 'exact-color', label: 'Exact Color', icon: <Eye className="w-4 h-4" />, desc: 'Match the target swatch' },
  { id: 'rgb-guess', label: 'RGB Mix', icon: <Sliders className="w-4 h-4" />, desc: 'Tune red, green, blue values' },
  { id: 'hex-guess', label: 'HEX Code', icon: <Hash className="w-4 h-4" />, desc: 'Input the hex color code' },
  { id: 'color-picker', label: 'Color Picker', icon: <Pipette className="w-4 h-4" />, desc: 'Manual palette recreation' },
  { id: 'color-match', label: 'Color Match', icon: <Palette className="w-4 h-4" />, desc: 'Tune Hue, Saturation, Lightness' },
  { id: 'color-name', label: 'Color Name', icon: <Tag className="w-4 h-4" />, desc: 'Identify by official name' },
  { id: 'warm-cool', label: 'Warm / Cool', icon: <SunMedium className="w-4 h-4" />, desc: 'Temperature & Neutral classification' },
  { id: 'light-dark', label: 'Light / Dark', icon: <Moon className="w-4 h-4" />, desc: 'WCAG relative luminance' },
  { id: 'closest-color', label: 'Closest Color', icon: <Compass className="w-4 h-4" />, desc: 'Perceptual OKLab distance' },
];

export const FORMATS: { id: GameFormat; label: string; icon: React.ReactNode }[] = [
  { id: 'standard', label: 'Standard (10)', icon: <Eye className="w-3.5 h-3.5" /> },
  { id: 'quick-challenge', label: 'Quick Escalation', icon: <Zap className="w-3.5 h-3.5" /> },
  { id: 'timed', label: 'Timed Sprint', icon: <Timer className="w-3.5 h-3.5 text-sky-500" /> },
  { id: 'endless', label: 'Endless (3 Lives)', icon: <Heart className="w-3.5 h-3.5 text-rose-500" /> },
  { id: 'survival', label: 'Survival', icon: <Flame className="w-3.5 h-3.5 text-amber-500" /> },
  { id: 'practice', label: 'Practice', icon: <GraduationCap className="w-3.5 h-3.5 text-emerald-500" /> },
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
                className={`snap-start flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-black text-xs whitespace-nowrap transition-all duration-150 select-none ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/30 scale-[1.02] ring-2 ring-brand-400/40'
                    : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/90 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/50'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-brand-500 dark:text-brand-400'}>
                  {m.icon}
                </span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Format Selector if supported */}
      {currentFormat && onSelectFormat && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1">
            Format:
          </span>
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            {FORMATS.map((f) => {
              const isActive = currentFormat === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => onSelectFormat(f.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-xs whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-black'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
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
