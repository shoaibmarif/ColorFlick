import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { StatsDashboard } from '../components/statistics/StatsDashboard';
import { useStats } from '../hooks/useStats';
import { useNavigate } from 'react-router-dom';

export const StatsPage: React.FC = () => {
  const { stats, achievements } = useStats();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <SeoMeta
        title="Your Player Statistics & Achievements - Color Guessing Game"
        description="View your personal color recognition statistics, accuracy percentage, best streaks, response speed, and unlocked achievements."
        canonicalPath="/statistics"
      />

      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Player Statistics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          All data is tracked securely and privately in your browser's local storage.
        </p>
      </div>

      <StatsDashboard
        stats={stats}
        achievements={achievements}
        onPlayNow={() => navigate('/color-guessing-game')}
      />
    </div>
  );
};
