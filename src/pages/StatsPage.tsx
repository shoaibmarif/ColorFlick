import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { StatsDashboard } from '../components/statistics/StatsDashboard';
import { useStats } from '../hooks/useStats';
import { useNavigate } from 'react-router-dom';

export const StatsPage: React.FC = () => {
  const { stats, achievements } = useStats();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <SeoMeta canonicalPath="/statistics" />

      <PageHeader title="Your statistics" intro="Your results so far. Everything here is stored only in this browser." />

      <StatsDashboard
        stats={stats}
        achievements={achievements}
        onPlayNow={() => navigate('/color-guessing-game')}
      />
    </div>
  );
};
