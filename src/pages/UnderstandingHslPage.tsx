import React, { useState } from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { hslToRgb, rgbToHex } from '../utils/colorConversion';

import { Link } from 'react-router-dom';

export const UnderstandingHslPage: React.FC = () => {
  const [h, setH] = useState(210);
  const [s, setS] = useState(85);
  const [l, setL] = useState(50);

  const hex = rgbToHex(hslToRgb({ h, s, l }));

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <SeoMeta canonicalPath="/understanding-hsl" />

      <PageHeader title="HSL colors, explained" intro="Hue, saturation and lightness — the color model that matches how people think about color." />

      {/* Interactive HSL Sandbox */}
      <section className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-700">
          <div
            className="w-32 h-32 rounded-2xl shadow-inner border border-black/10 ring-1 ring-black/5 flex-shrink-0"
            style={{ backgroundColor: hex }}
          />
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <span className="text-xs font-semibold text-zinc-400">Selected HSL Coordinate</span>
            <div className="font-mono text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white">
              hsl({h}, {s}%, {l}%)
            </div>
            <span className="font-mono text-sm text-brand-600 dark:text-brand-400 font-semibold block">
              Hexadecimal: {hex}
            </span>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          {/* Hue */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span>Hue Angle (0°–360° on the color circle)</span>
              <span className="font-mono px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 rounded font-semibold">
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
            <div className="flex justify-between items-center text-xs font-semibold">
              <span>Saturation (0% Grayscale to 100% Pure Vibrancy)</span>
              <span className="font-mono px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 rounded font-semibold">
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
            <div className="flex justify-between items-center text-xs font-semibold">
              <span>Lightness (0% Pure Black to 100% Pure White)</span>
              <span className="font-mono px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 rounded font-semibold">
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
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            Play HSL Color Matching Challenge →
          </Link>
        </div>
      </section>

      {/* Educational Article Content */}
      <section className="bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 space-y-5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
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
