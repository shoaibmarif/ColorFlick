import React from 'react';
import { Link } from 'react-router-dom';
import { GameMode, Difficulty } from '../../types/game';
import {
  Palette,
  Eye,
  Sparkles,
  Target,
  Zap,
  Keyboard,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface GameModeDescriptionProps {
  mode: GameMode;
  difficulty?: Difficulty;
}

export const GameModeDescription: React.FC<GameModeDescriptionProps> = ({ mode, difficulty = 'medium' }) => {
  if (mode === 'exact-color') {
    return (
      <section
        aria-labelledby="exact-color-heading"
        className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6"
      >
        {/* Header */}
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

        {/* How It Works & Core Objective */}
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

        {/* Difficulty Breakdown */}
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

        {/* Pro Tips & Keyboard Shortcuts */}
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

  // Fallback for other modes
  return (
    <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-3">
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
