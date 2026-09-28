import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { Link } from 'react-router-dom';
import { Target, Zap, Keyboard, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const HowToPlayPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <SeoMeta
        title="How to Play Color Guessing Game - Rules & Scoring"
        description="Learn how to play the Color Guessing Game, understand the scoring formula, response speed bonuses, and master keyboard controls."
        canonicalPath="/how-to-play"
      />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          How to Play ColorWise
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          A guide to the rules, scoring formulas, game modes, and keyboard controls.
        </p>
      </div>

      {/* Core Loop */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-brand-600" />
          <span>The Core Game Loop</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Each round presents a central <strong>Target Color</strong>. Your objective depends on the selected game mode: identifying the exact matching swatch, mixing RGB channels, typing hex codes, or classifying temperature.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs font-bold pt-2">
          <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700">
            1. View Target Swatch
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700">
            2. Make Your Choice
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700">
            3. Instant Feedback
          </div>
          <div className="p-3 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 rounded-xl border border-brand-200 dark:border-brand-800">
            4. Build Your Streak!
          </div>
        </div>
      </section>

      {/* Scoring Engine Breakdown */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <span>Transparent Scoring Formula</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Scores are mathematically transparent. Incorrect answers award 0 points. Correct answers earn points based on four transparent factors:
        </p>

        <div className="space-y-3 pt-2 text-xs">
          <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
            <span className="font-mono font-bold text-slate-900 dark:text-white text-sm w-28 flex-shrink-0">
              Base Points
            </span>
            <span className="text-slate-600 dark:text-slate-300">
              <strong>100 points</strong> for every correct answer.
            </span>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
            <span className="font-mono font-bold text-slate-900 dark:text-white text-sm w-28 flex-shrink-0">
              Difficulty Bonus
            </span>
            <span className="text-slate-600 dark:text-slate-300">
              Easy: <strong>+0</strong> • Medium: <strong>+50</strong> • Hard: <strong>+100</strong> • Expert: <strong>+180</strong> bonus points.
            </span>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
            <span className="font-mono font-bold text-slate-900 dark:text-white text-sm w-28 flex-shrink-0">
              Speed Bonus
            </span>
            <span className="text-slate-600 dark:text-slate-300">
              Earn up to <strong>+100 bonus points</strong> for answering under 1 second. Decays linearly over 6 seconds.
            </span>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
            <span className="font-mono font-bold text-slate-900 dark:text-white text-sm w-28 flex-shrink-0">
              Streak Bonus
            </span>
            <span className="text-slate-600 dark:text-slate-300">
              Each consecutive correct answer adds <strong>+15 points</strong> (capped at +150 points for 10+ streak).
            </span>
          </div>
        </div>
      </section>

      {/* Keyboard Controls */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-sky-500" />
          <span>Desktop Keyboard Shortcuts</span>
        </h2>
        <p className="text-xs text-slate-500">
          Play faster without lifting your fingers from the keyboard:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
            <span className="text-slate-700 dark:text-slate-300">Select Choice Card</span>
            <kbd className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md font-mono font-bold">
              1 – 9
            </kbd>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
            <span className="text-slate-700 dark:text-slate-300">Next Round</span>
            <kbd className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md font-mono font-bold">
              Space / Enter
            </kbd>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
            <span className="text-slate-700 dark:text-slate-300">Close Modals</span>
            <kbd className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md font-mono font-bold">
              Escape
            </kbd>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
            <span className="text-slate-700 dark:text-slate-300">Navigate Controls</span>
            <kbd className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md font-mono font-bold">
              Tab / Shift+Tab
            </kbd>
          </div>
        </div>
      </section>

      {/* Start Playing CTA */}
      <div className="text-center pt-4">
        <Link to="/color-guessing-game">
          <Button variant="primary" size="lg" className="gap-2">
            <span>Start Playing Now</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
