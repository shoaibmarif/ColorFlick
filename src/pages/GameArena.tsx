import React from 'react';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import { SeoMeta } from '../components/ui/SeoMeta';
import { GameBoard } from '../components/game/GameBoard';
import { GameModeDescription } from '../components/game/GameModeDescription';
import { GameMode, GameFormat, Difficulty } from '../types/game';
import { useSettings } from '../hooks/useSettings';
import { PageHeader } from '../components/layout/PageHeader';
import { getRouteMeta } from '../seo/routes';
import { gameJsonLd } from '../seo/head';

interface GameArenaProps {
  forcedMode?: GameMode;
  forcedFormat?: GameFormat;
  forcedDifficulty?: Difficulty;
}

export const GameArena: React.FC<GameArenaProps> = ({
  forcedMode,
  forcedFormat,
  forcedDifficulty,
}) => {
  const { settings } = useSettings();
  const { difficultyParam } = useParams<{ difficultyParam?: string }>();
  const location = useLocation();
  const path = location.pathname;

  // Determine active mode and format from props or URL
  let activeMode: GameMode = forcedMode || 'exact-color';
  let activeFormat: GameFormat = forcedFormat || 'standard';
  let activeDifficulty: Difficulty = forcedDifficulty || 'medium';

  if (path.includes('rgb-color-game') || path.includes('rgb-color-guessing-game')) {
    activeMode = 'rgb-guess';
  } else if (path.includes('hex-color-game') || path.includes('hex-color-guessing-game')) {
    activeMode = 'hex-guess';
  } else if (path.includes('color-name-game')) {
    activeMode = 'color-name';
  } else if (path.includes('color-picker-game')) {
    activeMode = 'color-picker';
  } else if (path.includes('color-matching-game') || path.includes('color-match-game')) {
    activeMode = 'color-match';
  } else if (path.includes('color-theory-game') || path.includes('color-theory-quiz')) {
    activeMode = 'warm-cool';
  } else if (path.includes('closest-color')) {
    activeMode = 'closest-color';
  } else if (path.includes('light-dark') || path.includes('light-vs-dark')) {
    activeMode = 'light-dark';
  }

  if (path.includes('color-game-timed')) {
    activeFormat = 'timed';
  } else if (path.includes('color-game-practice')) {
    activeFormat = 'practice';
  } else if (path.includes('color-game-for-beginners')) {
    activeDifficulty = 'easy';
  }

  if (difficultyParam) {
    if (!['easy', 'medium', 'hard', 'expert'].includes(difficultyParam)) {
      return <Navigate to="/color-guessing-game" replace />;
    }
    activeDifficulty = difficultyParam as Difficulty;
  }

  const routeMeta = getRouteMeta(path);
  const pageTitle = routeMeta?.title ?? 'Color Guessing Game';
  const pageDesc = routeMeta?.description ?? '';

  return (
    <div className="mx-auto max-w-3xl">
      <SeoMeta
        canonicalPath={path}
        structuredData={gameJsonLd(path, pageTitle, pageDesc)}
      />

      <PageHeader title={routeMeta?.heading ?? 'Color guessing game'} intro={pageDesc} />

      <div className="card p-4 shadow-card sm:p-6">
        <GameBoard
          key={`${activeMode}-${activeFormat}-${activeDifficulty}`}
          initialMode={activeMode}
          initialFormat={activeFormat}
          initialDifficulty={activeDifficulty}
          settings={settings}
        />
      </div>

      <div className="mt-10">
        <GameModeDescription mode={activeMode} difficulty={activeDifficulty} format={activeFormat} />
      </div>
    </div>
  );
};
