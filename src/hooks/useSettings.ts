import { useState, useEffect, useCallback } from 'react';
import { GameSettings } from '../types/game';
import { Storage } from '../storage/localStorage';
import { soundManager } from '../utils/audio';

export function useSettings() {
  const [settings, setSettings] = useState<GameSettings>(() => Storage.getSettings());

  // Apply theme and contrast classes to document root
  useEffect(() => {
    const root = document.documentElement;

    const isDark =
      settings.theme === 'dark' ||
      (settings.theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Configure sound engine
    soundManager.setEnabled(settings.soundEnabled);
    soundManager.setVolume(settings.soundVolume);
  }, [settings]);

  const updateSettings = useCallback((newSettings: Partial<GameSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      Storage.saveSettings(updated);
      return updated;
    });
  }, []);

  return { settings, updateSettings };
}
