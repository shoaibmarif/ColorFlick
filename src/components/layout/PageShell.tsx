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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      <main id="main-content" className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {children}
      </main>

      <Footer />

      {/* Global Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        onResetAllData={resetAllStats}
      />

      {/* Achievement Toast */}
      <Toast achievement={newlyUnlocked} onDismiss={clearNewAchievementToast} />
    </div>
  );
};
