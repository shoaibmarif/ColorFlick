import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { BookOpen, Palette, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ColorTheoryGuidePage: React.FC = () => {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <SeoMeta
        title="Comprehensive Color Theory Guide - Harmonies, Temperature & Vision"
        description="Learn fundamental color theory: the 12-spoke color wheel, complementary and analogous harmonies, warm vs cool temperature psychology, and WCAG luminance."
        canonicalPath="/color-theory-guide"
      />

      {/* Header */}
      <section className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 rounded-full text-xs font-bold border border-brand-200 dark:border-brand-800">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Design Foundations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Comprehensive <span className="text-brand-600 dark:text-brand-400">Color Theory Guide</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          From the classical color wheel and geometric harmonies to perceptual spaces and digital contrast standards.
        </p>
      </section>

      {/* Harmonious Palettes Grid */}
      <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-brand-600" />
          <span>Geometric Color Harmonies</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {/* Complementary */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              1. Complementary (180° Opposite)
            </h3>
            <div className="flex h-8 rounded-xl overflow-hidden shadow-xs">
              <div className="flex-1 bg-blue-600" />
              <div className="flex-1 bg-amber-500" />
            </div>
            <p>
              Colors directly opposite each other on the 360° color wheel. High contrast, high impact, and excellent for call-to-action buttons.
            </p>
          </div>

          {/* Analogous */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              2. Analogous (Adjacent ±30°)
            </h3>
            <div className="flex h-8 rounded-xl overflow-hidden shadow-xs">
              <div className="flex-1 bg-emerald-500" />
              <div className="flex-1 bg-teal-500" />
              <div className="flex-1 bg-cyan-500" />
            </div>
            <p>
              Colors adjacent on the wheel. They create serene, comfortable visuals often found in nature, landscapes, and soothing digital dashboards.
            </p>
          </div>

          {/* Triadic */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              3. Triadic (120° Equilateral Triangle)
            </h3>
            <div className="flex h-8 rounded-xl overflow-hidden shadow-xs">
              <div className="flex-1 bg-rose-500" />
              <div className="flex-1 bg-emerald-500" />
              <div className="flex-1 bg-blue-500" />
            </div>
            <p>
              Three evenly spaced hues forming a triangle. Vibrant and balanced even when pale or desaturated versions of the hues are selected.
            </p>
          </div>

          {/* Monochromatic */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              4. Monochromatic (Varied Lightness)
            </h3>
            <div className="flex h-8 rounded-xl overflow-hidden shadow-xs">
              <div className="flex-1 bg-indigo-900" />
              <div className="flex-1 bg-indigo-600" />
              <div className="flex-1 bg-indigo-300" />
            </div>
            <p>
              Uses variations in lightness and saturation of a single base hue. Clean, professional, and foolproof for corporate user interfaces.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center flex-wrap gap-3">
          <Link
            to="/color-theory-game"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            <span>Test Your Knowledge in Color Theory Game</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Temperature & Luminance */}
      <section className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 space-y-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">
          Color Temperature: Warm, Cool, and Neutral
        </h2>
        <p>
          In psychological color theory, colors evoke physiological temperature sensations:
        </p>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            <strong>Warm Colors (0°–72° & 326°–360°):</strong> Reds, oranges, yellows, and warm magentas evoke sunlight, fire, passion, and energy.
          </li>
          <li>
            <strong>Cool Colors (86°–312°):</strong> Greens, cyans, blues, and violets evoke water, sky, foliage, and tranquility.
          </li>
          <li>
            <strong>Neutral Colors:</strong> Grays, desaturated shades ($S \le 14\%$), near-blacks, near-whites, or borderline transition angles.
          </li>
        </ul>
      </section>
    </div>
  );
};
