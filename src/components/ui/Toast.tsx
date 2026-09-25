import React, { useEffect } from 'react';
import { Award, X } from 'lucide-react';
import { Achievement } from '../../types/stats';

interface ToastProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ achievement, onDismiss }) => {
  useEffect(() => {
    if (!achievement) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 p-4 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-3.5 animate-pop"
    >
      <div className="text-3xl flex-shrink-0">{achievement.icon || '🏆'}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-amber-400 dark:text-amber-600 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Achievement Unlocked!</span>
        </div>
        <p className="font-extrabold text-sm truncate">{achievement.title}</p>
        <p className="text-xs text-slate-300 dark:text-slate-600 line-clamp-1">
          {achievement.description}
        </p>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="p-1 text-slate-400 hover:text-white dark:hover:text-black rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
