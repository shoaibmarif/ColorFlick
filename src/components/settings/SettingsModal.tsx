import React, { useState } from 'react';
import { GameSettings } from '../../types/game';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Volume2, VolumeX, Sun, Moon, Monitor, Eye, Trash2, AlertTriangle } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onResetAllData: () => void;
}

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
    <Modal isOpen={isOpen} onClose={onClose} title="Game Settings" maxWidth="md">
      <div className="space-y-6">
        {/* Theme Setting */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
            Interface Theme
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
              { id: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
              { id: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onUpdateSettings({ theme: t.id as GameSettings['theme'] })}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all border ${
                  settings.theme === t.id
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Audio Setting */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 flex items-center gap-2">
              {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-brand-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              <span>Sound Effects</span>
            </label>
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => onUpdateSettings({ soundEnabled: e.target.checked })}
              className="w-5 h-5 accent-brand-600 rounded cursor-pointer"
              aria-label="Toggle sound effects"
            />
          </div>

          {settings.soundEnabled && (
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs text-slate-400 font-bold">Vol</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={settings.soundVolume}
                onChange={(e) => onUpdateSettings({ soundVolume: Number(e.target.value) })}
                className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-brand-600 cursor-pointer"
                aria-label="Sound volume"
              />
              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 w-8">
                {Math.round(settings.soundVolume * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Color Accessibility Assistance */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-emerald-500" />
            <span>Color Blindness & Contrast Assistance</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'off', label: 'Standard' },
              { id: 'basic', label: 'Basic' },
              { id: 'enhanced', label: 'Enhanced' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onUpdateSettings({ colorAssistance: opt.id as GameSettings['colorAssistance'] })}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  settings.colorAssistance === opt.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Enhanced mode adds subtle micro-patterns and high-contrast outer rings to eliminate reliance solely on hue.
          </p>
        </div>

        {/* Show Color Codes Setting */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
            Show Color Codes (HEX/RGB)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'never', label: 'Never' },
              { id: 'after-answer', label: 'After Answer' },
              { id: 'always', label: 'Always' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onUpdateSettings({ showColorCodes: opt.id as GameSettings['showColorCodes'] })}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  settings.showColorCodes === opt.id
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* High Contrast */}
        <div className="flex justify-between items-center py-1">
          <div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
              High Contrast Borders
            </span>
            <span className="text-[11px] text-slate-400">
              Increases borders on all cards for maximum visibility
            </span>
          </div>
          <input
            type="checkbox"
            checked={settings.highContrast}
            onChange={(e) => onUpdateSettings({ highContrast: e.target.checked })}
            className="w-5 h-5 accent-brand-600 rounded cursor-pointer"
            aria-label="Toggle high contrast borders"
          />
        </div>

        {/* Danger Zone: Reset All Data */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          {!showResetConfirm ? (
            <Button
              onClick={() => setShowResetConfirm(true)}
              variant="ghost"
              size="sm"
              className="w-full text-rose-600 hover:text-rose-700 dark:text-rose-400 gap-2 hover:bg-rose-50 dark:hover:bg-rose-950/30"
            >
              <Trash2 className="w-4 h-4" />
              <span>Reset All Game Data</span>
            </Button>
          ) : (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>Reset all local statistics, history, and achievements?</span>
              </div>
              <p className="text-[11px] text-rose-600 dark:text-rose-400">
                This cannot be undone. All your progress will be wiped.
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowResetConfirm(false)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleReset} variant="danger" size="sm" className="flex-1">
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
