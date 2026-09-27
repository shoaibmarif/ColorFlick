import React, { useState } from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { GameBoard } from '../components/game/GameBoard';
import { ModeSelector, MODES } from '../components/game/ModeSelector';
import { DifficultySelector } from '../components/game/DifficultySelector';
import { GameMode, GameFormat, Difficulty } from '../types/game';
import { useSettings } from '../hooks/useSettings';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, BookOpen, ArrowRight, Wrench, ShieldCheck, Zap, Compass, Palette } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
  const { settings } = useSettings();
  const [activeMode, setActiveMode] = useState<GameMode>('exact-color');
  const [activeFormat, setActiveFormat] = useState<GameFormat>('standard');
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty>('medium');
  const [previewColor, setPreviewColor] = useState<string>('#8B5CF6');

  const heroColors = [
    { hex: '#F43F5E', name: 'Neon Rose', mode: 'exact-color' as GameMode },
    { hex: '#8B5CF6', name: 'Electric Violet', mode: 'rgb-guess' as GameMode },
    { hex: '#0EA5E9', name: 'Cyber Cyan', mode: 'hex-guess' as GameMode },
    { hex: '#10B981', name: 'Emerald Ray', mode: 'color-match' as GameMode },
    { hex: '#F59E0B', name: 'Solar Amber', mode: 'closest-color' as GameMode },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://colorguess.game/#website',
        url: 'https://colorguess.game/',
        name: 'Color Guessing Game Platform',
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
    <div className="space-y-10 sm:space-y-14">
      <SeoMeta
        title="Color Guessing Game - Free Online Color Quiz & Spectrum Challenge"
        description="Test your color recognition skills with a free online color guessing game featuring RGB, HEX, color matching, timed challenges, daily challenges, and statistics."
        canonicalPath="/"
        structuredData={jsonLd}
      />

      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-2 sm:pt-4 px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-500/10 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 rounded-full text-xs font-black border border-brand-500/30 backdrop-blur-md shadow-xs animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-spin" />
          <span className="tracking-wide">CHROMA LABS • PRECISION COLOR ENGINE</span>
        </div>

        <h1 className="text-3xl xs:text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
          Master the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-brand-500 to-sky-400 drop-shadow-xs">
            Spectrum
          </span>
          .<br />
          Test Your Color Vision.
        </h1>

        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-medium leading-relaxed">
          From perceptual OKLab distance and WCAG luminance to raw RGB slider tuning and HEX code-breaking. Zero ads, zero accounts, 100% browser-native.
        </p>

        {/* Interactive Hero Swatch Micro-Bar */}
        <div className="pt-2 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2.5 p-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md">
            {heroColors.map((hc) => (
              <button
                key={hc.hex}
                type="button"
                onClick={() => {
                  setPreviewColor(hc.hex);
                  setActiveMode(hc.mode);
                }}
                className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm ${
                  previewColor === hc.hex ? 'ring-2 ring-black dark:ring-white scale-110' : 'opacity-85 hover:opacity-100'
                }`}
                style={{ backgroundColor: hc.hex }}
                aria-label={`Test ${hc.name} (${hc.hex})`}
                title={`${hc.name} - ${hc.hex}`}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono font-semibold text-slate-400">
            Active Palette Preview: <strong className="text-slate-700 dark:text-slate-200">{previewColor}</strong>
          </span>
        </div>

        {/* Core Pillars Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 max-w-2xl mx-auto text-left">
          <div className="p-2.5 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <div className="text-[11px] leading-tight">
              <span className="font-extrabold block text-slate-900 dark:text-white">9 Game Modes</span>
              <span className="text-slate-500">Perceptual & Code</span>
            </div>
          </div>
          <div className="p-2.5 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-500 flex-shrink-0" />
            <div className="text-[11px] leading-tight">
              <span className="font-extrabold block text-slate-900 dark:text-white">OKLab ΔE Space</span>
              <span className="text-slate-500">Human-Eye Accurate</span>
            </div>
          </div>
          <div className="p-2.5 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <div className="text-[11px] leading-tight">
              <span className="font-extrabold block text-slate-900 dark:text-white">Daily Seeded</span>
              <span className="text-slate-500">Universal Puzzle</span>
            </div>
          </div>
          <div className="p-2.5 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <div className="text-[11px] leading-tight">
              <span className="font-extrabold block text-slate-900 dark:text-white">WCAG Compliant</span>
              <span className="text-slate-500">Colorblind Friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Game Arena Shell */}
      <section className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-3.5 xs:p-5 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-2xl max-w-3xl mx-auto space-y-5 ring-1 ring-black/5 dark:ring-white/5">
        {/* Arena Controls Bar: Mode selector & Difficulty */}
        <div className="space-y-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
                CHROMA ARENA
              </h2>
            </div>
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

      {/* Daily Challenge Spotlight Banner */}
      <section className="max-w-3xl mx-auto bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-brand-500/10 rounded-3xl p-5 sm:p-7 border border-amber-500/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-amber-500/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 flex-shrink-0">
            <Calendar className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Universal Seeded Puzzle
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono">
                TODAY
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Daily Color Challenge
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              10 seeded rounds generated fresh at midnight. Compete on equal footing with players worldwide.
            </p>
          </div>
        </div>
        <Link to="/daily-color-challenge" className="w-full sm:w-auto">
          <Button variant="primary" size="md" className="w-full whitespace-nowrap gap-2 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 shadow-md shadow-amber-600/20">
            <span>Play Daily Challenge</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>

      {/* 9 Game Modes Interactive Showcase Grid */}
      <section className="max-w-4xl mx-auto space-y-6 pt-4">
        <div className="text-center space-y-1.5 px-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Nine Ways to Challenge Your Vision
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            From intuitive perceptual discrimination to developer-level HEX and RGB calculations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {MODES.map((m) => (
            <div
              key={m.id}
              onClick={() => {
                setActiveMode(m.id);
                window.scrollTo({ top: 220, behavior: 'smooth' });
              }}
              className="p-5 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-brand-500 dark:hover:border-brand-400 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-xs">
                  {m.icon}
                </div>
                <h3 className="font-black text-sm text-slate-900 dark:text-white mb-1">
                  {m.label}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-brand-600 dark:text-brand-400">
                <span>Play Mode</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Color Tools Launcher */}
      <section className="max-w-4xl mx-auto bg-slate-100/80 dark:bg-slate-900/60 rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-600 text-white rounded-2xl shadow-md">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Built-in Professional Color Tools
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive utilities built directly into the platform with zero server dependencies.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <Link
            to="/color-converter"
            className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-colors group"
          >
            <Palette className="w-5 h-5 text-brand-500 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-sm text-slate-900 dark:text-white mb-1">
              Color Converter
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Convert HEX, RGB, and HSL bi-directionally with tints, shades, and complement preview.
            </p>
          </Link>

          <Link
            to="/color-contrast-checker"
            className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-colors group"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-sm text-slate-900 dark:text-white mb-1">
              WCAG Contrast Checker
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Validate AA & AAA compliance for normal text, large text, and interactive UI components.
            </p>
          </Link>

          <Link
            to="/color-distance"
            className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 transition-colors group"
          >
            <Compass className="w-5 h-5 text-sky-500 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-sm text-slate-900 dark:text-white mb-1">
              OKLab Distance Lab
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Compare perceptual OKLab ΔE distance against naive Euclidean RGB math in real-time.
            </p>
          </Link>
        </div>
      </section>

      {/* Color Mathematics & Theory Explanations */}
      <section className="max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/60 rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-600 text-white rounded-2xl shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Color Mathematics & Perceptual Uniformity
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Why our scoring and color matching algorithms are mathematically honest.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <h4 className="font-black text-slate-900 dark:text-white">
              OKLab Distance (ΔE)
            </h4>
            <p className="leading-relaxed">
              Standard RGB Euclidean distance fails human vision because retinas have dense concentrations of green M-cones. We calculate perceptual differences in <strong>OKLab color space</strong> for accurate fairness.
            </p>
          </div>

          <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <h4 className="font-black text-slate-900 dark:text-white">
              WCAG Relative Luminance
            </h4>
            <p className="leading-relaxed">
              Light or dark classification evaluates colors according to the <strong>W3C WCAG 2.1 standard formula</strong> ($0.2126R + 0.7152G + 0.0722B$ with linear gamma expansion), ensuring scientific repeatability.
            </p>
          </div>

          <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <h4 className="font-black text-slate-900 dark:text-white">
              Accessibility First
            </h4>
            <p className="leading-relaxed">
              We adhere strictly to WCAG color accessibility principles. Status indicators never rely purely on red/green hues, incorporating text labels, distinct icons, and configurable micro-patterns.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-500 font-medium">Deepen your color science knowledge:</span>
          <div className="flex gap-4">
            <Link to="/color-theory-guide" className="text-brand-600 dark:text-brand-400 font-black hover:underline">
              Color Theory Guide →
            </Link>
            <Link to="/rgb-vs-hex" className="text-brand-600 dark:text-brand-400 font-black hover:underline">
              RGB vs HEX Breakdown →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick FAQ Accordion */}
      <section className="max-w-3xl mx-auto space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">Quick answers about how Chroma runs on your device.</p>
        </div>

        <div className="space-y-3">
          <details className="group p-4 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800 cursor-pointer shadow-xs">
            <summary className="font-black text-sm text-slate-800 dark:text-slate-200 list-none flex justify-between items-center select-none">
              <span>What is a Color Guessing Game?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A Color Guessing Game is an interactive quiz that tests your visual acuity and color theory knowledge. Players are presented with a target color swatch and must identify its match, predict its RGB or HEX codes, or categorize its temperature and luminance.
            </p>
          </details>

          <details className="group p-4 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800 cursor-pointer shadow-xs">
            <summary className="font-black text-sm text-slate-800 dark:text-slate-200 list-none flex justify-between items-center select-none">
              <span>Does the platform store my personal information?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No. Chroma runs 100% in your browser. All statistics, streaks, and achievements are saved strictly in your device's <code>localStorage</code>. No personal accounts, tracking cookies, or server backends are used.
            </p>
          </details>

          <details className="group p-4 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800 cursor-pointer shadow-xs">
            <summary className="font-black text-sm text-slate-800 dark:text-slate-200 list-none flex justify-between items-center select-none">
              <span>How does the Daily Color Challenge work?</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The Daily Challenge uses a deterministic pseudo-random number generator seeded with the current calendar date (YYYY-MM-DD). Every player across the globe receives the exact same 10 color questions. Refreshing the browser preserves your result and prevents score exploitation.
            </p>
          </details>
        </div>

        <div className="text-center pt-2">
          <Link to="/faq" className="text-xs font-black text-brand-600 dark:text-brand-400 hover:underline">
            Read all 14 FAQs and technical answers →
          </Link>
        </div>
      </section>
    </div>
  );
};
