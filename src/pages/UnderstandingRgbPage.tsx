import React, { useState } from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { rgbToHex } from '../utils/colorConversion';
import { Sliders, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UnderstandingRgbPage: React.FC = () => {
  const [r, setR] = useState(255);
  const [g, setG] = useState(80);
  const [b, setB] = useState(120);

  const hex = rgbToHex({ r, g, b });

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <SeoMeta
        title="Understanding RGB Colors - Additive Color Theory & Channel Mechanics"
        description="Comprehensive guide to the RGB additive color model. Learn how red, green, and blue light channels combine across 0–255 to create 16.7 million digital colors."
        canonicalPath="/understanding-rgb"
      />

      {/* Header */}
      <section className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 rounded-full text-xs font-bold border border-rose-200 dark:border-rose-800">
          <Layers className="w-3.5 h-3.5" />
          <span>Hardware Color Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Understanding <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-emerald-500 to-sky-500">RGB Colors</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          The foundational physics and computing principles behind additive color mixing on screens.
        </p>
      </section>

      {/* Interactive RGB Channel Mixer Sandbox */}
      <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-brand-600" />
          <span>Interactive RGB Channel Mixer</span>
        </h2>

        {/* Live Swatch Preview */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div
            className="w-32 h-32 rounded-2xl shadow-inner border border-black/10 ring-1 ring-black/5 flex-shrink-0"
            style={{ backgroundColor: hex }}
          />
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <span className="text-xs uppercase font-bold text-slate-400">Synthesized Photon Output</span>
            <div className="font-mono text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              rgb({r}, {g}, {b})
            </div>
            <span className="font-mono text-sm text-brand-600 dark:text-brand-400 font-bold block">
              Hexadecimal: {hex}
            </span>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          {/* Red */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-rose-500 font-extrabold">Red Channel (0–255)</span>
              <span className="font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-900 rounded font-bold">
                {r} ({((r / 255) * 100).toFixed(0)}%)
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={255}
              value={r}
              onChange={(e) => setR(Number(e.target.value))}
              className="w-full h-2.5 rounded-lg accent-rose-500 bg-slate-200 dark:bg-slate-700 cursor-pointer"
            />
          </div>

          {/* Green */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-emerald-500 font-extrabold">Green Channel (0–255)</span>
              <span className="font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-900 rounded font-bold">
                {g} ({((g / 255) * 100).toFixed(0)}%)
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={255}
              value={g}
              onChange={(e) => setG(Number(e.target.value))}
              className="w-full h-2.5 rounded-lg accent-emerald-500 bg-slate-200 dark:bg-slate-700 cursor-pointer"
            />
          </div>

          {/* Blue */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-sky-500 font-extrabold">Blue Channel (0–255)</span>
              <span className="font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-900 rounded font-bold">
                {b} ({((b / 255) * 100).toFixed(0)}%)
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={255}
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              className="w-full h-2.5 rounded-lg accent-sky-500 bg-slate-200 dark:bg-slate-700 cursor-pointer"
            />
          </div>
        </div>

        {/* Action Link to Game */}
        <div className="pt-2 flex justify-end">
          <Link
            to="/rgb-color-game"
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            Practice RGB Guessing Challenge →
          </Link>
        </div>
      </section>

      {/* Educational Article Content */}
      <section className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 space-y-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">
          The Physics of Additive Color
        </h2>
        <p>
          Unlike paint or ink (which rely on subtractive pigment mixing where colors absorb light), electronic displays use <strong>additive color mixing</strong>. When all three primary light beams are turned completely off (<code className="font-mono">0, 0, 0</code>), you perceive pure black. When all three are cranked to full intensity (<code className="font-mono">255, 255, 255</code>), you perceive pure white light.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Why 0 to 255?
        </h3>
        <p>
          Each color channel in TrueColor displays is allocated 1 byte (8 bits) of memory. Since $2^8 = 256$, possible integer values range from $0$ to $255$. Combining 3 channels yields:
        </p>
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-bold">
          256 × 256 × 256 = 16,777,216 distinct colors (24-bit TrueColor)
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Key Channel Combinations to Remember
        </h3>
        <ul className="space-y-1.5 list-disc list-inside">
          <li><strong>Red + Green</strong> = Yellow (<code className="font-mono">rgb(255, 255, 0)</code>)</li>
          <li><strong>Green + Blue</strong> = Cyan (<code className="font-mono">rgb(0, 255, 255)</code>)</li>
          <li><strong>Red + Blue</strong> = Magenta (<code className="font-mono">rgb(255, 0, 255)</code>)</li>
          <li><strong>Equal Channels</strong> = Neutral Grayscale (<code className="font-mono">rgb(128, 128, 128)</code>)</li>
        </ul>
      </section>
    </div>
  );
};
