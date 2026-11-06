import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useSettings } from '../../hooks/useSettings';

const iconButton =
  'inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white';

/** One-click light/dark switch. "System" is still available in Settings. */
export const ThemeToggle: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  // Track the resolved theme (it can also follow the OS while on "system").
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains('dark'));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, [settings.theme]);

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={() => updateSettings({ theme: isDark ? 'light' : 'dark' })}
      className={iconButton}
      aria-label={label}
      title={label}
    >
      {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
};
