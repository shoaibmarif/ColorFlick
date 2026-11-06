import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { Palette, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ColorTheoryGuidePage: React.FC = () => {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <SeoMeta canonicalPath="/color-theory-guide" />

      <PageHeader title="Color theory guide" intro="The color wheel, the classic color harmonies, and how warm and cool colors behave." />

      {/* Harmonious Palettes Grid */}
      <section className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-brand-600" />
          <span>Geometric Color Harmonies</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
          {/* Complementary */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">
              1. Complementary (180° Opposite)
            </h3>
            <div className="flex h-8 rounded-xl overflow-hidden shadow-card">
              <div className="flex-1 bg-blue-600" />
              <div className="flex-1 bg-amber-500" />
            </div>
            <p>
              Colors directly opposite each other on the 360° color wheel. High contrast, high impact, and excellent for call-to-action buttons.
            </p>
          </div>

          {/* Analogous */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">
              2. Analogous (Adjacent ±30°)
            </h3>
            <div className="flex h-8 rounded-xl overflow-hidden shadow-card">
              <div className="flex-1 bg-emerald-500" />
              <div className="flex-1 bg-teal-500" />
              <div className="flex-1 bg-cyan-500" />
            </div>
            <p>
              Colors adjacent on the wheel. They create serene, comfortable visuals often found in nature, landscapes, and soothing digital dashboards.
            </p>
          </div>

          {/* Triadic */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">
              3. Triadic (120° Equilateral Triangle)
            </h3>
            <div className="flex h-8 rounded-xl overflow-hidden shadow-card">
              <div className="flex-1 bg-rose-500" />
              <div className="flex-1 bg-emerald-500" />
              <div className="flex-1 bg-blue-500" />
            </div>
            <p>
              Three evenly spaced hues forming a triangle. Vibrant and balanced even when pale or desaturated versions of the hues are selected.
            </p>
          </div>

          {/* Monochromatic */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">
              4. Monochromatic (Varied Lightness)
            </h3>
            <div className="flex h-8 rounded-xl overflow-hidden shadow-card">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            <span>Test Your Knowledge in Color Theory Game</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Temperature & Luminance */}
      <section className="bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 space-y-5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
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
            <strong>Neutral Colors:</strong> Grays, desaturated shades (saturation of 14% or less), near-blacks, near-whites, or borderline transition angles.
          </li>
        </ul>
      </section>
    </div>
  );
};
