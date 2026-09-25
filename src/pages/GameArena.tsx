import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { SeoMeta } from '../components/ui/SeoMeta';
import { GameBoard } from '../components/game/GameBoard';
import { GameMode, Difficulty } from '../types/game';
import { useSettings } from '../hooks/useSettings';
import { ArrowLeft } from 'lucide-react';

interface GameArenaProps {
  forcedMode?: GameMode;
  forcedDifficulty?: Difficulty;
}

export const GameArena: React.FC<GameArenaProps> = ({
  forcedMode,
  forcedDifficulty,
}) => {
  const { settings } = useSettings();
  const { difficultyParam } = useParams<{ difficultyParam?: string }>();
  const location = useLocation();

  // Determine active mode and difficulty from props or URL
  let activeMode: GameMode = forcedMode || 'exact-color';
  if (location.pathname.includes('rgb-color-game')) activeMode = 'rgb-guess';
  if (location.pathname.includes('hex-color-game')) activeMode = 'hex-guess';
  if (location.pathname.includes('color-name-game')) activeMode = 'color-name';

  let activeDifficulty: Difficulty = forcedDifficulty || 'medium';
  if (difficultyParam && ['easy', 'medium', 'hard', 'expert'].includes(difficultyParam)) {
    activeDifficulty = difficultyParam as Difficulty;
  }

  const titles: Record<GameMode, string> = {
    'exact-color': 'Exact Color Matching Game - Test Visual Acuity',
    'rgb-guess': 'RGB Color Guessing Game - Tune Red, Green, Blue',
    'hex-guess': 'HEX Color Game - Guess Hexadecimal Color Codes',
    'color-name': 'Color Name Game - Identify Standard Color Names',
    'warm-cool': 'Warm or Cool Color Quiz - Test Color Temperature',
    'light-dark': 'Light or Dark Color Quiz - Relative Luminance',
    'closest-color': 'Closest Color Game - Perceptual Distance Challenge',
  };

  const descriptions: Record<GameMode, string> = {
    'exact-color': 'Play the exact color match game online. Choose the swatch that matches the target across varying difficulty tiers.',
    'rgb-guess': 'Challenge your color mixing skills. Adjust red, green, and blue sliders to recreate the target color.',
    'hex-guess': 'Test your CSS and web design skills by predicting the 6-digit or 3-digit hexadecimal color code of target swatches.',
    'color-name': 'Identify official CSS and X11 color names from swatches. Educational and fun for designers.',
    'warm-cool': 'Determine whether a displayed color is warm or cool based on hue angles and color theory principles.',
    'light-dark': 'Classify colors as light or dark using deterministic WCAG 2.1 relative luminance mathematics.',
    'closest-color': 'Determine which color option is mathematically and perceptually closest to the target in OKLab color space.',
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <SeoMeta
        title={titles[activeMode] || 'Play Color Guessing Game Online'}
        description={descriptions[activeMode] || 'Test your color recognition skills online.'}
        canonicalPath={location.pathname}
      />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link
          to="/"
          className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 font-bold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span className="font-mono uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
          {activeMode.replace('-', ' ')} • {activeDifficulty}
        </span>
      </div>

      {/* Main Board Container */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
        <GameBoard
          key={`${activeMode}-${activeDifficulty}`}
          initialMode={activeMode}
          initialDifficulty={activeDifficulty}
          settings={settings}
        />
      </div>
    </div>
  );
};
