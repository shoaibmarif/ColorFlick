import { useCallback, useEffect } from 'react';
import { GameSettings } from '../types/game';
import { Storage } from '../storage/localStorage';
import { createStore, useStore } from '../storage/store';
import { soundManager } from '../utils/audio';
import { trackEvent } from '../utils/analytics';

export const settingsStore = createStore<GameSettings>(() => Storage.getSettings());

const applySettings = (settings: GameSettings) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const isDark =
    settings.theme === 'dark' ||
    (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  root.classList.toggle('dark', isDark);
  root.classList.toggle('high-contrast', settings.highContrast);
  root.classList.toggle('reduce-motion', settings.reducedMotion);
  soundManager.setEnabled(settings.soundEnabled);
  soundManager.setVolume(settings.soundVolume);
};

export function useSettings() {
  const settings = useStore(settingsStore);

  useEffect(() => {
    applySettings(settings);
    if (settings.theme !== 'system') return;
    // Follow the OS theme live while on "system".
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applySettings(settingsStore.get());
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [settings]);

  const updateSettings = useCallback((patch: Partial<GameSettings>) => {
    settingsStore.set((prev) => {
      const updated = { ...prev, ...patch };
      Storage.saveSettings(updated);
      return updated;
    });
    trackEvent('settings_changed', { keys: Object.keys(patch).join(',') });
  }, []);

  return { settings, updateSettings };
}
