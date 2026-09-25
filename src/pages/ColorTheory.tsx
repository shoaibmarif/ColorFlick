import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { Link } from 'react-router-dom';
import { SunMedium, Compass, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ColorTheoryPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <SeoMeta
        title="Color Theory Guide - Hue, Saturation, Lightness & OKLab"
        description="Master color theory concepts: HSL vs RGB, warm and cool classifications, WCAG relative luminance, and perceptual uniformity in OKLab."
        canonicalPath="/color-theory"
      />

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Color Theory & Digital Perception
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Understand how colors behave in the human eye, on digital displays, and in mathematical models.
        </p>
      </div>

      {/* Section 1: The Three Dimensions of Color */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
          The Three Dimensions: Hue, Saturation & Lightness
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          While computers represent color as mixtures of Red, Green, and Blue light, human perception naturally distinguishes colors along three distinct psychological axes:
        </p>

        <div className="space-y-3 pt-2 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-700/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              1. Hue (0° – 360°)
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              The pure pigment or color family on the 360-degree color wheel. 0° is pure red, 120° is green, and 240° is blue.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-700/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              2. Saturation (0% – 100%)
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              The purity or vividness of the color. 0% is completely washed out grayscale; 100% is vibrant and intensely chromatic.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-700/40 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              3. Lightness (0% – 100%)
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              The perceived brightness. 0% lightness is absolute black, while 100% is pure white, regardless of hue.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Warm vs Cool */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <SunMedium className="w-5 h-5 text-amber-500" />
          <span>Warm vs. Cool Colors</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Color temperature evokes psychological and physiological sensations. In color theory, colors are categorized into warm and cool groups:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-2">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm">
              Warm Colors (0°–80° & 315°–360°)
            </h3>
            <p className="text-amber-800 dark:text-amber-300">
              Reds, oranges, sunny yellows, and warm magentas. Associated with fire, sunlight, warmth, and active energy.
            </p>
          </div>

          <div className="p-4 bg-sky-50 dark:bg-sky-950/30 rounded-2xl border border-sky-200 dark:border-sky-800 space-y-2">
            <h3 className="font-bold text-sky-900 dark:text-sky-200 text-sm">
              Cool Colors (80°–315°)
            </h3>
            <p className="text-sky-800 dark:text-sky-300">
              Greens, teals, cyans, deep blues, and violets. Associated with water, ice, foliage, tranquility, and calmness.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          <em>Note:</em> In our Warm/Cool game mode, ambiguous transitional hues (such as chartreuse ~75°–85°) are programmatically filtered out to ensure completely fair, unambiguous challenges.
        </p>
      </section>

      {/* Section 3: Why OKLab? */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-brand-600" />
          <span>Why OKLab Color Space?</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Standard RGB color distance is computed using Euclidean distance √((ΔR)² + (ΔG)² + (ΔB)²). However, raw RGB distances do not correspond to how human retinas perceive differences:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-700/40 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-2">
          <p>
            Human cone cells (L, M, S) are disproportionately sensitive to changes in green and yellow wavelengths compared to blue wavelengths.
          </p>
          <p>
            The <strong>OKLab color space</strong> (developed by Björn Ottosson in 2020) maps colors into a perceptually uniform coordinate system ($L, a, b$). In OKLab, a Euclidean distance of 0.05 between two blues appears identically distinct to the human eye as 0.05 between two greens.
          </p>
        </div>
      </section>

      <div className="flex justify-between items-center pt-4">
        <Link to="/rgb-vs-hex" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
          ← RGB vs HEX Guide
        </Link>
        <Link to="/color-guessing-game">
          <Button variant="primary" size="md" className="gap-2">
            <span>Play Game</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
