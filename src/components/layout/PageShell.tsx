import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SettingsModal } from '../settings/SettingsModal';
import { Toast } from '../ui/Toast';
import { useSettings } from '../../hooks/useSettings';
import { useStats } from '../../hooks/useStats';

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const { newlyUnlocked, clearNewAchievementToast, resetAllStats } = useStats();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        {children}
      </main>

      <Footer />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        onResetAllData={resetAllStats}
      />

      <Toast achievement={newlyUnlocked} onDismiss={clearNewAchievementToast} />
    </div>
  );
};
