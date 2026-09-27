import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { Palette, ShieldCheck, Zap, Sparkles, Globe, ExternalLink, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z" />
  </svg>
);

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

      {/* Creator Spotlight */}
      <section className="bg-gradient-to-tr from-brand-500/10 via-sky-500/10 to-amber-500/10 p-6 sm:p-8 rounded-3xl border border-brand-500/20 backdrop-blur-md space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/25">
            <Code className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 dark:text-brand-400 block">
              Architect & Developer
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Shoaib Arif
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Full-stack software engineer and frontend craftsman passionate about accessible web platforms, performance engineering, and interactive tools.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://shoaibarif.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl text-xs transition-colors shadow-sm"
          >
            <Globe className="w-4 h-4" />
            <span>Portfolio Website</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          <a
            href="https://github.com/shoaibmarif"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white font-extrabold rounded-xl text-xs transition-colors shadow-sm"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Profile</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          <a
            href="https://www.linkedin.com/in/shoaibmarif/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white font-extrabold rounded-xl text-xs transition-colors shadow-sm"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn Profile</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
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
