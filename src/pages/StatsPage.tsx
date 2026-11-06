import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { StatsDashboard } from '../components/statistics/StatsDashboard';
import { ProgressCharts } from '../components/statistics/ProgressCharts';
import { useStats } from '../hooks/useStats';
import { useNavigate } from 'react-router-dom';

export const StatsPage: React.FC = () => {
  const { stats, achievements } = useStats();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <SeoMeta canonicalPath="/statistics" />

      <PageHeader title="Your statistics" intro="Your results so far. Everything here is stored only in this browser." />

      {stats.totalGames > 0 && <ProgressCharts />}

      <StatsDashboard
        stats={stats}
        achievements={achievements}
        onPlayNow={() => navigate('/color-guessing-game')}
      />
    </div>
  );
};
