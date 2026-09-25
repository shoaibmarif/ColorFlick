import React, { useState } from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { GameBoard } from '../components/game/GameBoard';
import { ModeSelector, MODES } from '../components/game/ModeSelector';
import { DifficultySelector } from '../components/game/DifficultySelector';
import { GameMode, GameFormat, Difficulty } from '../types/game';
import { useSettings } from '../hooks/useSettings';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
  const { settings } = useSettings();
  const [activeMode, setActiveMode] = useState<GameMode>('exact-color');
  const [activeFormat, setActiveFormat] = useState<GameFormat>('standard');
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty>('medium');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://colorguess.game/#website',
        url: 'https://colorguess.game/',
        name: 'Color Guessing Game',
        description:
          'Test your color recognition skills with a free online color guessing game featuring RGB, HEX, matching, timed challenges, and daily puzzles.',
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://colorguess.game/#webapp',
        url: 'https://colorguess.game/',
        name: 'Color Guessing Game Platform',
        applicationCategory: 'GameApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  };

  return (
    <div className="space-y-12">
      <SeoMeta
        title="Color Guessing Game - Free Online Color Quiz"
        description="Test your color recognition skills with a free online color guessing game featuring RGB, HEX, color matching, timed challenges, daily challenges, and statistics."
        canonicalPath="/"
        structuredData={jsonLd}
      />

      {/* Hero Header */}
      <section className="text-center max-w-2xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 rounded-full text-xs font-bold border border-brand-200 dark:border-brand-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Browser Game • No Account Required</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Test Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-brand-500 to-sky-500">Color Vision</span> & Precision
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Identify target colors, tune RGB sliders, decipher HEX codes, and master color theory across 7 game modes.
        </p>
      </section>

      {/* Game Arena Controls & Live Board */}
      <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl max-w-3xl mx-auto space-y-6">
        {/* Controls Bar: Mode selector & Difficulty */}
        <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Select Challenge
            </h2>
            <DifficultySelector
              currentDifficulty={activeDifficulty}
              onSelectDifficulty={setActiveDifficulty}
            />
          </div>

          <ModeSelector
            currentMode={activeMode}
            onSelectMode={setActiveMode}
            currentFormat={activeFormat}
            onSelectFormat={setActiveFormat}
          />
        </div>

        {/* Live Interactive Game Board */}
        <GameBoard
          key={`${activeMode}-${activeFormat}-${activeDifficulty}`}
          initialMode={activeMode}
          initialFormat={activeFormat}
          initialDifficulty={activeDifficulty}
          settings={settings}
        />
      </section>

      {/* Daily Challenge Banner */}
      <section className="max-w-3xl mx-auto bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-brand-500/10 rounded-3xl p-6 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Deterministic Daily Puzzle
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Daily Color Challenge
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              10 seeded questions generated fresh every midnight. Same sequence for players worldwide.
            </p>
          </div>
        </div>
        <Link to="/daily-color-challenge" className="w-full sm:w-auto">
          <Button variant="primary" size="md" className="w-full whitespace-nowrap gap-2 bg-amber-600 hover:bg-amber-700">
            <span>Play Today's Daily</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>

      {/* 7 Game Modes Grid */}
      <section className="max-w-4xl mx-auto space-y-6 pt-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Seven Unique Ways to Play
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            From intuitive perceptual matching to developer-grade HEX and RGB calculations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {MODES.map((m) => (
            <div
              key={m.id}
              onClick={() => {
                setActiveMode(m.id);
                window.scrollTo({ top: 220, behavior: 'smooth' });
              }}
              className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs hover:border-brand-500 dark:hover:border-brand-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {m.icon}
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">
                {m.label}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works & Educational Section */}
      <section className="max-w-4xl mx-auto bg-slate-100 dark:bg-slate-800/50 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-600 text-white rounded-xl shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Color Mathematics & Perceptual Uniformity
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Why our scoring and color matching is mathematically honest.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="space-y-2 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>OKLab Distance (ΔE)</span>
            </h4>
            <p>
              Standard RGB Euclidean distance fails to reflect human vision because human eyes are far more sensitive to green than blue. We calculate color differences in the <strong>OKLab color space</strong> for accurate perceptual fairness.
            </p>
          </div>

          <div className="space-y-2 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>WCAG Relative Luminance</span>
            </h4>
            <p>
              Our Light or Dark classification evaluates colors according to the <strong>W3C WCAG 2.1 standard formula</strong> ($0.2126R + 0.7152G + 0.0722B$ with linear gamma expansion), ensuring scientific repeatability.
            </p>
          </div>

          <div className="space-y-2 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Accessibility First</span>
            </h4>
            <p>
              We adhere strictly to WCAG color accessibility principles. Status indicators never rely purely on red/green hues, incorporating text labels, distinct icons, and configurable micro-patterns.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
          <span className="text-slate-500">Want to deepen your understanding of color spaces?</span>
          <div className="flex gap-3">
            <Link to="/color-theory" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
              Color Theory Guide →
            </Link>
            <Link to="/rgb-vs-hex" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
              RGB vs HEX Breakdown →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick FAQ Section */}
      <section className="max-w-3xl mx-auto space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">Quick answers about how the game runs.</p>
        </div>

        <div className="space-y-3">
          <details className="group p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer">
            <summary className="font-bold text-sm text-slate-800 dark:text-slate-200 list-none flex justify-between items-center">
              <span>What is a Color Guessing Game?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A Color Guessing Game is an interactive quiz that tests your visual acuity and color theory knowledge. Players are presented with a target color swatch and must identify its match, predict its RGB or HEX codes, or categorize its temperature and luminance.
            </p>
          </details>

          <details className="group p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer">
            <summary className="font-bold text-sm text-slate-800 dark:text-slate-200 list-none flex justify-between items-center">
              <span>Does the game store my personal information?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No. ColorGuess runs 100% in your browser. All statistics, streaks, and achievements are saved strictly in your device's <code>localStorage</code>. No personal accounts, tracking cookies, or server backends are used.
            </p>
          </details>

          <details className="group p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 cursor-pointer">
            <summary className="font-bold text-sm text-slate-800 dark:text-slate-200 list-none flex justify-between items-center">
              <span>How does the Daily Color Challenge work?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The Daily Challenge uses a deterministic pseudo-random number generator seeded with the current calendar date (YYYY-MM-DD). Every player across the globe receives the exact same 10 color questions. Refreshing the browser preserves your result and prevents score exploitation.
            </p>
          </details>
        </div>

        <div className="text-center pt-2">
          <Link to="/color-guessing-game-faq" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
            Read all 13 FAQs and technical answers →
          </Link>
        </div>
      </section>
    </div>
  );
};
