import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { Palette, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <SeoMeta
        title="About Color Guessing Game - Our Mission & Architecture"
        description="Learn about Color Guessing Game, our commitment to 100% browser-based architecture, privacy by design, and perceptual color science."
        canonicalPath="/about"
      />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          About Color Guessing Game
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          A modern, fast, educational color recognition web application built for designers, developers, and color lovers.
        </p>
      </div>

      <section className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-brand-600" />
          <span>Why We Built ColorGuess</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Understanding and distinguishing color is foundational for digital art, UI design, web development, and accessibility. However, most color quizzes are either overly simplistic single-trick demos or cluttered with advertisements and mandatory signups.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          We built <strong>ColorGuess</strong> as a clean, production-grade game platform that combines multiple challenge types—from visual matching to developer-oriented RGB and HEX puzzles—while remaining blazing fast, fully accessible, and completely respectful of user privacy.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            100% Client-Side
          </h3>
          <p className="text-xs text-slate-500">
            All code runs directly in your browser. We never collect personal data or transmit your scores to remote databases.
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
          <Zap className="w-6 h-6 text-amber-500" />
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Sub-Millisecond Speed
          </h3>
          <p className="text-xs text-slate-500">
            Powered by React 19, Vite, and Web Audio API synthesis for zero audio download latency and instant reactive gameplay.
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
          <Sparkles className="w-6 h-6 text-brand-500" />
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Perceptual Science
          </h3>
          <p className="text-xs text-slate-500">
            Built on OKLab color distance and WCAG relative luminance rather than deceptive raw RGB heuristics.
          </p>
        </div>
      </section>

      <div className="text-center pt-4">
        <Link to="/color-guessing-game">
          <Button variant="primary" size="lg">
            Start Playing ColorGuess
          </Button>
        </Link>
      </div>
    </div>
  );
};
