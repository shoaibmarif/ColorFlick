import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette, BarChart3, Settings, Calendar } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const location = useLocation();

  const navLinks = [
    { to: '/color-guessing-game', label: 'Play' },
    { to: '/daily-color-challenge', label: 'Daily', badge: 'Daily' },
    { to: '/how-to-play', label: 'How to Play' },
    { to: '/color-theory', label: 'Theory' },
    { to: '/color-guessing-game-faq', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-xl p-1"
          aria-label="Color Guessing Game Home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-brand-500 to-sky-400 p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-none">
              Color<span className="text-brand-600 dark:text-brand-400">Guess</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
              Free Color Quiz
            </span>
          </div>
        </Link>

        {/* Center Navigation Links (Hidden on small mobile) */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-amber-500 text-white font-mono uppercase">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Tools (Daily, Stats, Settings) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/daily-color-challenge"
            className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-xl text-xs font-bold transition-colors"
            title="Today's Daily Color Challenge"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Daily</span>
          </Link>

          <Link
            to="/statistics"
            aria-label="View Statistics"
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title="Statistics & Achievements"
          >
            <BarChart3 className="w-5 h-5" />
          </Link>

          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Open settings"
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
