import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SettingsModal } from '../settings/SettingsModal';
import { Toast } from '../ui/Toast';
import { useSettings } from '../../hooks/useSettings';
import { useStats } from '../../hooks/useStats';
import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Calendar, Wrench, BookOpen, BarChart3, Settings } from 'lucide-react';

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const { newlyUnlocked, clearNewAchievementToast, resetAllStats } = useStats();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  const mobileNavItems = [
    { to: '/color-guessing-game', label: 'Play', icon: <Gamepad2 className="w-5 h-5" /> },
    { to: '/daily-color-challenge', label: 'Daily', icon: <Calendar className="w-5 h-5" /> },
    { to: '/color-converter', label: 'Tools', icon: <Wrench className="w-5 h-5" /> },
    { to: '/color-theory-guide', label: 'Learn', icon: <BookOpen className="w-5 h-5" /> },
    { to: '/statistics', label: 'Stats', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors overflow-x-hidden pb-20 md:pb-0">
      {/* Dynamic Ambient Background Mesh */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-60 dark:opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/10 blur-3xl animate-float" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-gradient-to-bl from-rose-500/20 to-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-sky-500/20 to-emerald-500/10 blur-3xl" />
      </div>

      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Desktop & Tablet Top Header */}
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-3.5 sm:px-6 py-6 sm:py-8">
        {children}
      </main>

      <div className="relative z-20">
        <Footer />
      </div>

      {/* Mobile Sticky Bottom Navigation Bar (Thumb Friendly) */}
      <nav
        aria-label="Mobile navigation bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1.5 flex items-center justify-around shadow-lg"
      >
        {mobileNavItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
                isActive
                  ? 'text-brand-600 dark:text-brand-400 font-extrabold scale-105'
                  : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setIsSettingsOpen(true)}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Settings</span>
        </button>
      </nav>

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
