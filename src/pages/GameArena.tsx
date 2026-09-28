import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { SeoMeta } from '../components/ui/SeoMeta';
import { GameBoard } from '../components/game/GameBoard';
import { GameModeDescription } from '../components/game/GameModeDescription';
import { GameMode, GameFormat, Difficulty } from '../types/game';
import { useSettings } from '../hooks/useSettings';
import { ArrowLeft } from 'lucide-react';

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

  if (difficultyParam && ['easy', 'medium', 'hard', 'expert'].includes(difficultyParam)) {
    activeDifficulty = difficultyParam as Difficulty;
  }

  const titles: Record<string, string> = {
    '/color-guessing-game': 'Color Guessing Game - Test Visual Acuity Online',
    '/color-guessing-game-online': 'Color Guessing Game Online - Free Color Perception Challenge',
    '/color-game': 'Play Color Game Online - Interactive Color Quiz',
    '/color-match-game': 'Color Match Game - Match Target Hues and Shades',
    '/rgb-color-game': 'RGB Color Game - Recreate Colors by Tuning Red, Green, Blue',
    '/rgb-color-guessing-game': 'RGB Color Guessing Game - Interactive RGB Slider Quiz',
    '/hex-color-game': 'HEX Color Game - Guess Hexadecimal Color Codes',
    '/hex-color-guessing-game': 'HEX Color Guessing Game - CSS Hexadecimal Code Challenge',
    '/color-picker-game': 'Color Picker Game - Manual Palette Color Recreation Challenge',
    '/color-matching-game': 'Color Matching Game - Tune HSL Sliders to Match Colors',
    '/color-name-game': 'Color Name Game - Guess Common and Descriptive Color Names',
    '/closest-color-game': 'Closest Color Game - Identify the Perceptually Nearest Color Swatch',
    '/light-dark-game': 'Light vs Dark Game - Relative Luminance & Contrast Challenge',
    '/light-vs-dark-game': 'Light vs Dark Color Game - WCAG Luminance Quiz',
    '/guess-the-color': 'Guess the Color - Quick Color Acuity Challenge',
    '/color-challenge': 'Color Challenge Platform - Multi-Mode Color Tests',
    '/color-quiz': 'Online Color Quiz - Test Your Color Recognition',
    '/color-test': 'Color Vision & Perception Test - Interactive Acuity Test',
    '/color-game-timed': 'Timed Color Challenge - Rapid-Fire 60-Second Color Quiz',
    '/color-game-practice': 'Color Game Practice - Untimed Beginner Practice Mode',
    '/color-game-for-beginners': 'Color Game for Beginners - Easy Color Guessing with Hints',
    '/color-theory-game': 'Color Theory Game - Warm vs Cool and Light vs Dark Challenge',
    '/color-theory-quiz': 'Color Theory Quiz - Test Your Color Science Knowledge',
  };

  const descriptions: Record<string, string> = {
    '/color-guessing-game': 'Play the exact color match game online. Choose the swatch that matches the target across varying difficulty tiers with instant visual feedback.',
    '/color-guessing-game-online': 'Play free online color guessing games with instant feedback, streaks, and personal records directly in your browser.',
    '/color-game': 'Test your eye for color with an interactive browser-based color game featuring 9 modes and 4 difficulty tiers.',
    '/color-match-game': 'Match target colors and build high streaks across multiple game formats with live similarity calculations.',
    '/rgb-color-game': 'Challenge your color mixing skills. Adjust red, green, and blue sliders to recreate the target color.',
    '/rgb-color-guessing-game': 'Fine-tune RGB channel sliders from 0 to 255 and test your knowledge of additive digital color mixing.',
    '/hex-color-game': 'Test your CSS and web design skills by predicting the 6-digit or 3-digit hexadecimal color code of target swatches.',
    '/hex-color-guessing-game': 'Decipher hex codes and improve your CSS color proficiency in this interactive quiz.',
    '/color-picker-game': 'Manually recreate target swatches using an interactive 2D color picker and live OKLab similarity tracking.',
    '/color-matching-game': 'Adjust Hue, Saturation, and Lightness sliders live to match the target color with maximum precision.',
    '/color-name-game': 'Identify the correct CSS and standardized descriptive color name for target swatches.',
    '/closest-color-game': 'Determine which color swatch is perceptually closest to the target using OKLab Delta-E metrics.',
    '/light-dark-game': 'Classify whether target colors are light or dark according to official WCAG 2.1 relative luminance formulas.',
    '/light-vs-dark-game': 'Test your understanding of digital relative luminance and accessibility contrast thresholds.',
    '/guess-the-color': 'Fast-paced color guessing gameplay with immediate accuracy feedback, streaks, and keyboard controls.',
    '/color-challenge': 'Explore 9 diverse color game modes and test your visual perception limits with personal best tracking.',
    '/color-quiz': 'Fun and educational color quiz suitable for designers, artists, frontend developers, and casual players.',
    '/color-test': 'Measure your color perception and discrimination abilities on a calibrated perceptual scale.',
    '/color-game-timed': 'Answer as many color questions as possible within 30, 60, or 120 seconds in rapid-fire mode.',
    '/color-game-practice': 'Relaxed, untimed color learning environment with helpful hints and explanations.',
    '/color-game-for-beginners': 'Beginner-friendly color guessing with large differences, 3 choices, and assistive hints.',
    '/color-theory-game': 'Classify color temperatures and relative luminances according to WCAG 2.1 formulas and color wheel angles.',
    '/color-theory-quiz': 'Interactive quiz testing knowledge of warm vs cool hues, luminance, and color harmonies.',
  };

  const keywordsByMode: Record<GameMode, string[]> = {
    'exact-color': ['color guessing game', 'exact color match', 'visual acuity test', 'color perception challenge', 'spot the color', 'hex color match'],
    'rgb-guess': ['rgb color game', 'rgb guessing game', 'additive color mixing', 'red green blue sliders', 'digital color quiz', 'rgb color theory'],
    'hex-guess': ['hex color game', 'hexadecimal color quiz', 'css hex code challenge', 'web design color quiz', 'predict hex code', 'hex color picker'],
    'color-name': ['color name game', 'guess color name', 'color vocabulary test', 'css color names', 'color shades quiz', 'identify color by name'],
    'warm-cool': ['warm vs cool color game', 'color temperature quiz', 'color theory game', 'warm cool neutral colors', 'chromatic temperature test'],
    'light-dark': ['light vs dark color game', 'relative luminance test', 'wcag luminance quiz', 'perceptual luminance challenge', 'accessibility contrast game'],
    'closest-color': ['closest color game', 'oklab color distance test', 'perceptual delta-e challenge', 'nearest color swatch', 'color discrimination test'],
    'color-picker': ['color picker game', 'recreate target color', 'manual palette game', 'color matching test', 'online color picker challenge'],
    'color-match': ['color matching game', 'hsl slider challenge', 'hue saturation lightness game', 'color match quiz', 'match the color online'],
  };

  let pageTitle = titles[path];
  if (!pageTitle) {
    if (difficultyParam) {
      pageTitle = `Color Guessing Game (${difficultyParam.toUpperCase()}) - Visual Acuity Challenge`;
    } else {
      pageTitle = `${activeMode.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())} Challenge - Color Guessing Game`;
    }
  }

  const pageDesc = descriptions[path] || `Play the ${activeMode.replace('-', ' ')} game online. Sharpen your color vision, test acuity, and track streaks.`;
  const pageKeywords = keywordsByMode[activeMode] || ['color game', 'color guessing game', 'color theory'];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: pageTitle,
    description: pageDesc,
    url: `https://colorguess.game${path}`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    genre: ['Puzzle', 'Educational', 'Trivia', 'Color Theory'],
    inLanguage: 'en',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Shoaib Arif',
      url: 'https://shoaibarif.vercel.app/',
    },
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <SeoMeta
        title={pageTitle}
        description={pageDesc}
        canonicalPath={path}
        keywords={pageKeywords}
        structuredData={structuredData}
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
          {activeMode.replace('-', ' ')} • {activeFormat} • {activeDifficulty}
        </span>
      </div>

      {/* Main Board Container */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
        <GameBoard
          key={`${activeMode}-${activeFormat}-${activeDifficulty}`}
          initialMode={activeMode}
          initialFormat={activeFormat}
          initialDifficulty={activeDifficulty}
          settings={settings}
        />
      </div>

      {/* Game Mode Information & Educational Description */}
      <GameModeDescription
        mode={activeMode}
        difficulty={activeDifficulty}
        format={activeFormat}
      />
    </div>
  );
};
