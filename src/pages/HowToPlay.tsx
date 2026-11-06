import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { Target, Zap, Keyboard, ArrowRight } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';

export const HowToPlayPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <SeoMeta canonicalPath="/how-to-play" />

      <PageHeader title="How to play ColorFlick" intro="The rules, how points are scored, and the keyboard shortcuts." />

      {/* Core Loop */}
      <section className="bg-white dark:bg-zinc-800 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-brand-600" />
          <span>The Core Game Loop</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Each round presents a central <strong>Target Color</strong>. Your objective depends on the selected game mode: identifying the exact matching swatch, mixing RGB channels, typing hex codes, or classifying temperature.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs font-semibold pt-2">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-700/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
            1. View Target Swatch
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-700/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
            2. Make Your Choice
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-700/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
            3. Instant Feedback
          </div>
          <div className="p-3 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 rounded-xl border border-brand-200 dark:border-brand-800">
            4. Build Your Streak!
          </div>
        </div>
      </section>

      {/* Scoring Engine Breakdown */}
      <section className="bg-white dark:bg-zinc-800 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <span>Transparent Scoring Formula</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Scores are mathematically transparent. Incorrect answers award 0 points. Correct answers earn points based on four transparent factors:
        </p>

        <div className="space-y-3 pt-2 text-xs">
          <div className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-700/40 rounded-xl">
            <span className="font-mono font-semibold text-zinc-900 dark:text-white text-sm w-28 flex-shrink-0">
              Base Points
            </span>
            <span className="text-zinc-600 dark:text-zinc-300">
              <strong>100 points</strong> for every correct answer.
            </span>
          </div>

          <div className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-700/40 rounded-xl">
            <span className="font-mono font-semibold text-zinc-900 dark:text-white text-sm w-28 flex-shrink-0">
              Difficulty Bonus
            </span>
            <span className="text-zinc-600 dark:text-zinc-300">
              Easy: <strong>+0</strong> • Medium: <strong>+50</strong> • Hard: <strong>+100</strong> • Expert: <strong>+180</strong> bonus points.
            </span>
          </div>

          <div className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-700/40 rounded-xl">
            <span className="font-mono font-semibold text-zinc-900 dark:text-white text-sm w-28 flex-shrink-0">
              Speed Bonus
            </span>
            <span className="text-zinc-600 dark:text-zinc-300">
              Earn up to <strong>+100 bonus points</strong> for answering under 1 second. Decays linearly over 6 seconds.
            </span>
          </div>

          <div className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-700/40 rounded-xl">
            <span className="font-mono font-semibold text-zinc-900 dark:text-white text-sm w-28 flex-shrink-0">
              Streak Bonus
            </span>
            <span className="text-zinc-600 dark:text-zinc-300">
              Each consecutive correct answer adds <strong>+15 points</strong> (capped at +150 points for 10+ streak).
            </span>
          </div>
        </div>
      </section>

      {/* Keyboard Controls */}
      <section className="bg-white dark:bg-zinc-800 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-sky-500" />
          <span>Desktop Keyboard Shortcuts</span>
        </h2>
        <p className="text-xs text-zinc-500">
          Play faster without lifting your fingers from the keyboard:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-700/40 rounded-xl">
            <span className="text-zinc-700 dark:text-zinc-300">Select Choice Card</span>
            <kbd className="px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md font-mono font-semibold">
              1 – 9
            </kbd>
          </div>

          <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-700/40 rounded-xl">
            <span className="text-zinc-700 dark:text-zinc-300">Next Round</span>
            <kbd className="px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md font-mono font-semibold">
              Space / Enter
            </kbd>
          </div>

          <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-700/40 rounded-xl">
            <span className="text-zinc-700 dark:text-zinc-300">Close Modals</span>
            <kbd className="px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md font-mono font-semibold">
              Escape
            </kbd>
          </div>

          <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-700/40 rounded-xl">
            <span className="text-zinc-700 dark:text-zinc-300">Navigate Controls</span>
            <kbd className="px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md font-mono font-semibold">
              Tab / Shift+Tab
            </kbd>
          </div>
        </div>
      </section>

      {/* Start Playing CTA */}
      <div className="text-center pt-4">
        <ButtonLink to="/color-guessing-game" variant="primary" size="lg" className="gap-2">
            <span>Start Playing Now</span>
            <ArrowRight className="w-5 h-5" />
          </ButtonLink>
      </div>
    </div>
  );
};
