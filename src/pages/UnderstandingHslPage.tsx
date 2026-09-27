import React, { useState } from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { hslToRgb, rgbToHex } from '../utils/colorConversion';
import { Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UnderstandingHslPage: React.FC = () => {
  const [h, setH] = useState(210);
  const [s, setS] = useState(85);
  const [l, setL] = useState(50);

  const hex = rgbToHex(hslToRgb({ h, s, l }));

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <SeoMeta
        title="Understanding HSL Colors - Hue, Saturation & Lightness Explained"
        description="Learn how HSL cylindrical coordinates make color palettes intuitive for designers. Explore Hue 0–360°, Saturation 0–100%, and Lightness 0–100%."
        canonicalPath="/understanding-hsl"
      />

      {/* Header */}
      <section className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 rounded-full text-xs font-bold border border-purple-200 dark:border-purple-800">
          <Palette className="w-3.5 h-3.5" />
          <span>Designer-Friendly Color Space</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Understanding <span className="text-purple-600 dark:text-purple-400">HSL Colors</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Hue, Saturation, and Lightness: The cylindrical model built for human intuitive reasoning.
        </p>
      </section>

      {/* Interactive HSL Sandbox */}
      <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div
            className="w-32 h-32 rounded-2xl shadow-inner border border-black/10 ring-1 ring-black/5 flex-shrink-0"
            style={{ backgroundColor: hex }}
          />
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <span className="text-xs uppercase font-bold text-slate-400">Selected HSL Coordinate</span>
            <div className="font-mono text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              hsl({h}, {s}%, {l}%)
            </div>
            <span className="font-mono text-sm text-brand-600 dark:text-brand-400 font-bold block">
              Hexadecimal: {hex}
            </span>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          {/* Hue */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <span>Hue Angle (0°–360° on the color circle)</span>
              <span className="font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-900 rounded font-bold">
                {h}°
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={h}
              onChange={(e) => setH(Number(e.target.value))}
              className="w-full h-3 rounded-lg cursor-pointer"
              style={{
                background:
                  'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
              }}
            />
          </div>

          {/* Saturation */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <span>Saturation (0% Grayscale to 100% Pure Vibrancy)</span>
              <span className="font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-900 rounded font-bold">
                {s}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={s}
              onChange={(e) => setS(Number(e.target.value))}
              className="w-full h-3 rounded-lg cursor-pointer"
              style={{
                background: `linear-gradient(to right, hsl(${h}, 0%, ${l}%), hsl(${h}, 100%, ${l}%))`,
              }}
            />
          </div>

          {/* Lightness */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <span>Lightness (0% Pure Black to 100% Pure White)</span>
              <span className="font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-900 rounded font-bold">
                {l}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={l}
              onChange={(e) => setL(Number(e.target.value))}
              className="w-full h-3 rounded-lg cursor-pointer"
              style={{
                background: `linear-gradient(to right, #000000, hsl(${h}, ${s}%, 50%), #ffffff)`,
              }}
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            to="/color-matching-game"
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            Play HSL Color Matching Challenge →
          </Link>
        </div>
      </section>

      {/* Educational Article Content */}
      <section className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 space-y-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">
          Why Modern UI Designers Prefer HSL
        </h2>
        <p>
          While RGB reflects how monitor light-emitting diodes function at a hardware layer, human beings never think of yellow as "255 units of red and 255 units of green without blue."
        </p>
        <p>
          Instead, humans think: "What color is it?" (<strong>Hue</strong>), "How rich or muted is it?" (<strong>Saturation</strong>), and "How bright or dim is it?" (<strong>Lightness</strong>).
        </p>
        <p>
          HSL makes creating coherent design systems straightforward. To create hover states, active states, or dark mode themes, designers simply adjust lightness while leaving hue and saturation untouched!
        </p>
      </section>
    </div>
  );
};
