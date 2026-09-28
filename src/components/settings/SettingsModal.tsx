import React, { useState } from 'react';
import { GameSettings } from '../../types/game';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import {
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Monitor,
  Eye,
  Trash2,
  AlertTriangle,
  FastForward,
  Keyboard,
  Sparkles,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onResetAllData: () => void;
}

// Reusable tactile switch component
const ToggleSwitch: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}> = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
      checked ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetAllData,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    onResetAllData();
    setShowResetConfirm(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Platform Settings" maxWidth="lg">
      <div className="space-y-6">
        {/* Section 1: Interface Theme */}
        <div className="space-y-2.5">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Interface Theme
          </label>
          <div className="grid grid-cols-3 gap-2.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            {[
              { id: 'light', label: 'Light', icon: <Sun className="w-4 h-4 text-amber-500" /> },
              { id: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4 text-sky-400" /> },
              { id: 'system', label: 'System', icon: <Monitor className="w-4 h-4 text-purple-400" /> },
            ].map((t) => {
              const isActive = settings.theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onUpdateSettings({ theme: t.id as GameSettings['theme'] })}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all duration-150 select-none ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md ring-1 ring-black/5 dark:ring-white/10 scale-100'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-700/40'
                  }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Audio Controls */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </div>
              <div>
                <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                  Audio & Sound Effects
                </span>
                <span className="text-[11px] text-slate-400">
                  Web Audio API feedback for clicks, streaks, and correct matches
                </span>
              </div>
            </div>
            <ToggleSwitch
              checked={settings.soundEnabled}
              onChange={(val) => onUpdateSettings({ soundEnabled: val })}
              label="Toggle sound effects"
            />
          </div>
        </div>

        {/* Section 3: Colorblind Assistance */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 px-1">
            <Eye className="w-4 h-4 text-emerald-500" />
            <label className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Colorblind Assistance Mode
            </label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            {[
              { id: 'off', label: 'Standard', desc: 'Default' },
              { id: 'protanopia', label: 'Protanopia', desc: 'Red-Weak' },
              { id: 'deuteranopia', label: 'Deuteranopia', desc: 'Green-Weak' },
              { id: 'tritanopia', label: 'Tritanopia', desc: 'Blue-Weak' },
            ].map((cb) => {
              const isActive = settings.colorblindMode === cb.id;
              return (
                <button
                  key={cb.id}
                  type="button"
                  onClick={() => onUpdateSettings({ colorblindMode: cb.id as GameSettings['colorblindMode'] })}
                  className={`py-2 px-2 text-center rounded-xl transition-all duration-150 select-none ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md font-black scale-100 ring-1 ring-emerald-500/50'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-700/40'
                  }`}
                >
                  <span className="block text-xs font-extrabold">{cb.label}</span>
                  <span className={`block text-[10px] ${isActive ? 'text-emerald-100' : 'text-slate-400 dark:text-slate-500'}`}>
                    {cb.desc}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 px-1 leading-relaxed">
            Adapts cards with identifiable text labels, contrasting borders, and distinct pattern markers so color is never the sole indicator.
          </p>
        </div>

        {/* Section 4: Gameplay & Interaction Toggles */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
            Gameplay & Interaction
          </label>

          <div className="space-y-2 bg-slate-50 dark:bg-slate-800/40 p-3 sm:p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800">
            {/* Auto Next Round */}
            <div className="flex items-center justify-between gap-3 py-1.5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex-shrink-0">
                  <FastForward className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                    Auto-Advance Rounds
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    Automatically move to the next question after feedback
                  </span>
                </div>
              </div>
              <ToggleSwitch
                checked={settings.autoNext}
                onChange={(val) => onUpdateSettings({ autoNext: val })}
                label="Toggle auto-advance rounds"
              />
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between gap-3 py-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                    Reduced Motion
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    Disables scale bounces and rapid animations
                  </span>
                </div>
              </div>
              <ToggleSwitch
                checked={settings.reducedMotion}
                onChange={(val) => onUpdateSettings({ reducedMotion: val })}
                label="Toggle reduced motion"
              />
            </div>

            {/* Keyboard Shortcuts */}
            <div className="flex items-center justify-between gap-3 py-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex-shrink-0">
                  <Keyboard className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                    Keyboard Shortcuts (1–9, Enter, Space)
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    Enables rapid single-key answering on desktop
                  </span>
                </div>
              </div>
              <ToggleSwitch
                checked={settings.keyboardNavigation}
                onChange={(val) => onUpdateSettings({ keyboardNavigation: val })}
                label="Toggle keyboard shortcuts"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Danger Zone (Reset) */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          {!showResetConfirm ? (
            <div className="flex items-center justify-between p-3.5 bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 rounded-2xl">
              <div>
                <span className="text-xs font-black text-rose-700 dark:text-rose-400 block">
                  Local Storage & Progress
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Clear career statistics, streaks, and unlocked achievements
                </span>
              </div>
              <Button
                onClick={() => setShowResetConfirm(true)}
                variant="ghost"
                size="sm"
                className="text-rose-600 hover:text-rose-700 dark:text-rose-400 gap-1.5 hover:bg-rose-100/50 dark:hover:bg-rose-950/40 text-xs font-bold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Data</span>
              </Button>
            </div>
          ) : (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-black text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>Reset all local statistics, history, and achievements?</span>
              </div>
              <p className="text-[11px] text-rose-600 dark:text-rose-400">
                This cannot be undone. All your locally saved progress will be permanently erased.
              </p>
              <div className="flex gap-2 pt-1">
                <Button
                  onClick={() => setShowResetConfirm(false)}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs font-bold"
                >
                  Cancel
                </Button>
                <Button onClick={handleReset} variant="danger" size="sm" className="flex-1 text-xs font-bold bg-rose-600 hover:bg-rose-700">
                  Confirm Reset
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
