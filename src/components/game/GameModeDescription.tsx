import React from 'react';
import { Link } from 'react-router-dom';
import { GameMode, Difficulty, GameFormat } from '../../types/game';
import {
  Palette,
  Eye,
  Sliders,
  Hash,
  Pipette,
  Sparkles,
  SunMedium,
  Target,
  Zap,
  Keyboard,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Timer,
  GraduationCap,
  Scale,
  Compass,
} from 'lucide-react';

interface GameModeDescriptionProps {
  mode: GameMode;
  difficulty?: Difficulty;
  format?: GameFormat;
}

export const GameModeDescription: React.FC<GameModeDescriptionProps> = ({
  mode,
  difficulty = 'medium',
  format = 'standard',
}) => {
  // Format specific callout banner
  const renderFormatBanner = () => {
    if (format === 'timed') {
      return (
        <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200/80 dark:border-sky-800 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0">
            <Timer className="w-4 h-4" />
          </div>
          <div className="text-xs text-sky-900 dark:text-sky-200 leading-relaxed">
            <strong className="font-extrabold block text-sky-700 dark:text-sky-300">Timed Sprint Format Active:</strong>
            Answer as many questions as possible before the clock hits zero. Maintain streaks for massive score multipliers!
          </div>
        </div>
      );
    }
    if (format === 'practice') {
      return (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/80 dark:border-emerald-800 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            <strong className="font-extrabold block text-emerald-700 dark:text-emerald-300">Practice Mode Active:</strong>
            Relaxed, untimed environment designed for training your digital color perception with in-depth feedback.
          </div>
        </div>
      );
    }
    return null;
  };

  // 1. Exact Color Match
  if (mode === 'exact-color') {
    return (
      <section
        aria-labelledby="exact-color-heading"
        className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6"
      >
        {renderFormatBanner()}

        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <Palette className="w-5 h-5" />
              </div>
              <h2 id="exact-color-heading" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Exact Color Match Guide
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Test and sharpen your visual color discrimination by spotting the exact identical swatch among procedural distractors.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800">
            <Eye className="w-3.5 h-3.5" />
            <span>Visual Acuity</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-500" />
              <span>Objective & Rules</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Examine the large <strong>Target Swatch</strong> displayed at the top. Below it is a grid of numbered candidate swatches. Exactly <strong>one</strong> swatch is an identical hexadecimal and RGB match. All other choices are algorithmic distractors generated at tight perceptual offsets.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Scoring & Speed Multipliers</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Every correct answer awards base difficulty points plus a <strong>speed bonus</strong> (answering in under 2 seconds yields maximum multiplier). Building continuous streaks activates a streak multiplier up to <strong>3.0×</strong>!
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
            How Difficulty Affects Color Distance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[
              {
                tier: 'Easy',
                delta: 'ΔE > 25 (High Contrast)',
                desc: 'Colors belong to distinct hues or values. 3 choices for rapid, comfortable play.',
                active: difficulty === 'easy',
                color: 'border-emerald-300/80 dark:border-emerald-700/80 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300',
              },
              {
                tier: 'Medium',
                delta: 'ΔE ≈ 12–20 (Moderate)',
                desc: 'Colors share similar color families with subtle tone differences across 6 choices.',
                active: difficulty === 'medium',
                color: 'border-sky-300/80 dark:border-sky-700/80 bg-sky-50/50 dark:bg-sky-950/20 text-sky-800 dark:text-sky-300',
              },
              {
                tier: 'Hard',
                delta: 'ΔE ≈ 6–12 (Subtle)',
                desc: 'Distractors are closely matched in hue and lightness. Demands sharp eye focus.',
                active: difficulty === 'hard',
                color: 'border-amber-300/80 dark:border-amber-700/80 bg-amber-50/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300',
              },
              {
                tier: 'Expert',
                delta: 'ΔE < 6 (Near-Threshold)',
                desc: 'Micro-variations near human perceptual limit. Crafted for artists and designers.',
                active: difficulty === 'expert',
                color: 'border-rose-300/80 dark:border-rose-700/80 bg-rose-50/50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300',
              },
            ].map((d) => (
              <div
                key={d.tier}
                className={`p-3 rounded-2xl border transition-all ${
                  d.active
                    ? `${d.color} ring-2 ring-brand-500/20 shadow-xs font-medium`
                    : 'border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                    {d.tier}
                  </span>
                  {d.active && (
                    <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-brand-500 text-white">
                      Current
                    </span>
                  )}
                </div>
                <span className="block font-mono text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                  {d.delta}
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-brand-500/5 via-sky-500/5 to-purple-500/5 dark:from-brand-950/30 dark:via-sky-950/20 dark:to-purple-950/20 rounded-2xl border border-brand-200/50 dark:border-brand-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 shrink-0">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                Keyboard Shortcuts Enabled
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Press numeric keys <kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 font-mono text-[10px] border border-slate-300 dark:border-slate-700 shadow-2xs font-bold text-slate-700 dark:text-slate-300">1</kbd> through <kbd className="px-1 py-0.5 rounded bg-white dark:bg-slate-800 font-mono text-[10px] border border-slate-300 dark:border-slate-700 shadow-2xs font-bold text-slate-700 dark:text-slate-300">6</kbd> to pick swatches instantly without mouse movement.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-xs">
            <Link
              to="/color-theory-guide"
              className="inline-flex items-center gap-1 font-bold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Color Guide</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // 2. RGB Guess
  if (mode === 'rgb-guess') {
    return (
      <section
        aria-labelledby="rgb-guess-heading"
        className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6"
      >
        {renderFormatBanner()}

        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Sliders className="w-5 h-5" />
              </div>
              <h2 id="rgb-guess-heading" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Understanding RGB Color Guessing
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Master the additive digital light model by tuning Red, Green, and Blue channels from 0 to 255 to recreate the target swatch.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800">
            <Sliders className="w-3.5 h-3.5" />
            <span>Additive Color</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Red Channel (0–255)</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Controls long-wavelength light. High red produces warm tones, crimsons, corals, and magentas when combined with blue.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Green Channel (0–255)</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Contributes over 71% of perceived relative luminance. Raising green drastically boosts brightness and produces lime and yellow.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <span>Blue Channel (0–255)</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Controls short-wavelength light. Produces deep indigos, navies, and vibrant cyans when blended with green light.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>Pro Estimation Strategy</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            First judge whether the color is light or dark to establish a baseline range. If the color is desaturated (grayish), keep all three sliders close to each other. If it has a strong hue, identify the dominant channel first, then fine-tune the other two to balance tint and saturation.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <Link
            to="/understanding-rgb"
            className="inline-flex items-center gap-1.5 font-bold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read Complete Digital RGB Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/rgb-to-hex"
            className="inline-flex items-center gap-1.5 font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>RGB ⇄ HEX Converter</span>
          </Link>
        </div>
      </section>
    );
  }

  // 3. HEX Guess
  if (mode === 'hex-guess') {
    return (
      <section
        aria-labelledby="hex-guess-heading"
        className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6"
      >
        {renderFormatBanner()}

        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <Hash className="w-5 h-5" />
              </div>
              <h2 id="hex-guess-heading" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Deciphering Hexadecimal Web Colors
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Learn how web designers and CSS developers predict 6-digit <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-sky-600 dark:text-sky-400">#RRGGBB</code> codes.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800">
            <Hash className="w-3.5 h-3.5" />
            <span>Base-16 Math</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
              The Hexadecimal Scale (0–F)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Hex uses 16 digits: <code className="font-mono font-bold">0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F</code>.
              Here <code className="font-mono">00</code> represents 0 intensity and <code className="font-mono">FF</code> represents 255 (maximum channel output).
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
              3-Digit Shorthand Supported
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              You can submit 3-digit shorthand like <code className="font-mono">#F80</code> which automatically normalizes to <code className="font-mono">#FF8800</code>. Case-insensitive and lenient on the hash symbol.
            </p>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-sky-500/5 to-brand-500/5 rounded-2xl border border-sky-200/60 dark:border-sky-900/60 space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-sky-800 dark:text-sky-300">
            Rapid Hex Recognition Cheatsheet
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] pt-1">
            <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-rose-500">#FF0000</span> = Pure Red
            </div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-emerald-500">#00FF00</span> = Pure Green
            </div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-sky-500">#0000FF</span> = Pure Blue
            </div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-amber-500">#FFFF00</span> = Yellow
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <Link
            to="/understanding-hex-colors"
            className="inline-flex items-center gap-1.5 font-bold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read Understanding HEX Colors Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/hex-to-rgb"
            className="inline-flex items-center gap-1.5 font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>HEX to RGB Tool</span>
          </Link>
        </div>
      </section>
    );
  }

  // 4. Color Matching / HSL
  if (mode === 'color-match') {
    return (
      <section
        aria-labelledby="color-match-heading"
        className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6"
      >
        {renderFormatBanner()}

        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 id="color-match-heading" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                HSL Color Matching Masterclass
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Match target colors intuitively using cylindrical Hue, Saturation, and Lightness controls with real-time similarity feedback.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cylindrical Model</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Hue (0°–360°)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Angular position on the 360-degree color wheel: 0° is red, 120° is green, and 240° is blue.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-pink-600 dark:text-pink-400">
              Saturation (0%–100%)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Purity and intensity of color. 0% is completely muted monochrome gray; 100% is full vivid saturation.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Lightness (0%–100%)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Total illumination. 0% is pitch black, 50% is the pure tonal hue, and 100% is pure white.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <Link
            to="/understanding-hsl"
            className="inline-flex items-center gap-1.5 font-bold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read Understanding HSL Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/color-converter"
            className="inline-flex items-center gap-1.5 font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Universal Converter</span>
          </Link>
        </div>
      </section>
    );
  }

  // 5. Warm vs Cool
  if (mode === 'warm-cool') {
    return (
      <section
        aria-labelledby="warm-cool-heading"
        className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6"
      >
        {renderFormatBanner()}

        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <SunMedium className="w-5 h-5" />
              </div>
              <h2 id="warm-cool-heading" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Warm vs Cool Temperature Challenge
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Explore color psychology and chromatic temperature classification by identifying whether swatches are warm, cool, or neutral.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800">
            <SunMedium className="w-3.5 h-3.5" />
            <span>Color Psychology</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200/60 dark:border-rose-900/60 space-y-1.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-400">
              Warm Hues
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Reds, oranges, ambers, and warm yellows. Associated with fire, daylight, and physical warmth. High emotional energy.
            </p>
          </div>

          <div className="p-4 bg-sky-50/50 dark:bg-sky-950/20 rounded-2xl border border-sky-200/60 dark:border-sky-900/60 space-y-1.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-sky-700 dark:text-sky-400">
              Cool Hues
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Blues, teals, cyans, and deep greens. Associated with water, ice, sky, and calm tranquility. Visually recedes into space.
            </p>
          </div>

          <div className="p-4 bg-slate-100/70 dark:bg-slate-800/70 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Neutral Colors
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Pure grays, blacks, whites, and low-saturation transitional shades where neither warm nor cool tones clearly dominate.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <Link
            to="/color-theory-guide"
            className="inline-flex items-center gap-1.5 font-bold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read Complete Color Theory Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/color-contrast-checker"
            className="inline-flex items-center gap-1.5 font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Contrast Checker</span>
          </Link>
        </div>
      </section>
    );
  }

  // 6. Color Picker
  if (mode === 'color-picker') {
    return (
      <section
        aria-labelledby="color-picker-heading"
        className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6"
      >
        {renderFormatBanner()}

        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Pipette className="w-5 h-5" />
              </div>
              <h2 id="color-picker-heading" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Color Picker Recreation Challenge
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Manually recreate the target color using an interactive 2D color canvas and hue slider, scored by perceptual similarity.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800">
            <Pipette className="w-3.5 h-3.5" />
            <span>Manual Palette</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Interactive Color Field
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Click and drag across the 2D gradient to simultaneously calibrate saturation (horizontal X-axis) and brightness (vertical Y-axis).
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Real-Time OKLab Similarity
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              As you manipulate the controls, the live similarity percentage tracks your accuracy. Reach 95%+ for expert bonus points!
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <Link
            to="/color-distance"
            className="inline-flex items-center gap-1.5 font-bold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Explore OKLab Perceptual Distance Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    );
  }

  // 7. Closest Color
  if (mode === 'closest-color') {
    return (
      <section
        aria-labelledby="closest-color-heading"
        className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6"
      >
        {renderFormatBanner()}

        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Compass className="w-5 h-5" />
              </div>
              <h2 id="closest-color-heading" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Closest Color Perceptual Challenge
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Identify which candidate swatch is mathematically closest in perceptual distance to the target using OKLab Delta-E metrics.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
            <Compass className="w-3.5 h-3.5" />
            <span>Delta-E (ΔE)</span>
          </span>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Why Standard RGB Euclidean Distance Fails
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Human vision is non-linear and much more sensitive to changes in green than blue. A simple RGB formula often fails to predict which color looks closest to a human observer. This mode calculates perceptual closeness in the uniform OKLab space to mirror true human photoreceptor responses.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <Link
            to="/color-distance"
            className="inline-flex items-center gap-1.5 font-bold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
          >
            <Scale className="w-4 h-4" />
            <span>Launch Interactive Color Distance Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    );
  }

  // 8. Light vs Dark
  if (mode === 'light-dark') {
    return (
      <section
        aria-labelledby="light-dark-heading"
        className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6"
      >
        {renderFormatBanner()}

        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 id="light-dark-heading" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Light vs Dark Relative Luminance
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Test your eye on relative luminance calculations according to official W3C WCAG 2.1 accessibility specifications.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>WCAG 2.1 Formula</span>
          </span>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            The Mathematical Formula for Relative Luminance (Y)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Luminance is calculated as <code className="font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">Y = 0.2126*R + 0.7152*G + 0.0722*B</code> after sRGB gamma linearization. Colors with Y &gt; 0.5 are classified as Light, and Y &le; 0.5 as Dark.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <Link
            to="/color-contrast-checker"
            className="inline-flex items-center gap-1.5 font-bold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Open WCAG Contrast Ratio Checker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    );
  }

  // 9. Color Name
  if (mode === 'color-name') {
    return (
      <section
        aria-labelledby="color-name-heading"
        className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6"
      >
        {renderFormatBanner()}

        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <Palette className="w-5 h-5" />
              </div>
              <h2 id="color-name-heading" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Color Name Vocabulary Challenge
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Connect visual swatches with standard CSS3, X11, and historical pigment color names.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800">
            <Palette className="w-3.5 h-3.5" />
            <span>Nomenclature</span>
          </span>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Curated Color Name Dataset
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Expand your vocabulary beyond primary shades to include descriptive names like <em>Chartreuse</em>, <em>Cerulean</em>, <em>Ochre</em>, <em>Sienna</em>, and <em>Vermilion</em>. Distractors are drawn from adjacent color families to test exact shade knowledge.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <Link
            to="/color-codes"
            className="inline-flex items-center gap-1.5 font-bold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Common Color Codes Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    );
  }

  // Fallback for other modes
  return (
    <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-3">
      {renderFormatBanner()}
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-brand-500" />
        <h2 className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
          About {mode.replace('-', ' ')}
        </h2>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        Challenge your color expertise across RGB, HEX, HSL, and perceptual color models. Review feedback on every round to train your digital color perception.
      </p>
    </section>
  );
};
