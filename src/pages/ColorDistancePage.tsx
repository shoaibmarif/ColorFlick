import React, { useState, useMemo } from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { hexToRgb, rgbToHex } from '../utils/colorConversion';
import { oklabDistance, rgbEuclideanDistance, calculateSimilarityPercentage } from '../utils/colorDistance';
import { Compass, BookOpen, Shuffle } from 'lucide-react';

export const ColorDistancePage: React.FC = () => {
  const [color1Hex, setColor1Hex] = useState<string>('#3B82F6');
  const [color2Hex, setColor2Hex] = useState<string>('#1D4ED8');

  const c1Rgb = useMemo(() => hexToRgb(color1Hex) || { r: 59, g: 130, b: 246 }, [color1Hex]);
  const c2Rgb = useMemo(() => hexToRgb(color2Hex) || { r: 29, g: 78, b: 216 }, [color2Hex]);

  const oklabDist = useMemo(() => oklabDistance(c1Rgb, c2Rgb), [c1Rgb, c2Rgb]);
  const rgbDist = useMemo(() => rgbEuclideanDistance(c1Rgb, c2Rgb), [c1Rgb, c2Rgb]);
  const similarity = useMemo(() => calculateSimilarityPercentage(c1Rgb, c2Rgb), [c1Rgb, c2Rgb]);

  const handleRandomize = () => {
    const randomByte = () => Math.floor(Math.random() * 256);
    setColor1Hex(rgbToHex({ r: randomByte(), g: randomByte(), b: randomByte() }));
    setColor2Hex(rgbToHex({ r: randomByte(), g: randomByte(), b: randomByte() }));
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <SeoMeta
        title="Perceptual Color Distance & OKLab Delta E Calculator"
        description="Calculate perceptual color distance between any two colors using the OKLab color model. Learn why raw RGB Euclidean distance fails human visual fairness."
        canonicalPath="/color-distance"
      />

      {/* Header */}
      <section className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 rounded-full text-xs font-bold border border-sky-200 dark:border-sky-800">
          <Compass className="w-3.5 h-3.5" />
          <span>Perceptual Vision Mathematics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Perceptual <span className="text-sky-600 dark:text-sky-400">Color Distance</span> (OKLab ΔE)
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Compare two colors to measure how differently human eyes perceive them versus raw mathematical channels.
        </p>
      </section>

      {/* Interactive Comparator Sandbox */}
      <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
        {/* Color 1 & Color 2 Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="text-xs font-bold uppercase text-slate-500">Color 1</span>
            <div
              className="w-full h-24 rounded-xl shadow-inner border border-black/10 ring-1 ring-black/5"
              style={{ backgroundColor: color1Hex }}
            />
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color1Hex}
                onChange={(e) => setColor1Hex(e.target.value.toUpperCase())}
                className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0 flex-shrink-0"
              />
              <input
                type="text"
                value={color1Hex}
                onChange={(e) => setColor1Hex(e.target.value)}
                className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl font-mono text-sm font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="text-xs font-bold uppercase text-slate-500">Color 2</span>
            <div
              className="w-full h-24 rounded-xl shadow-inner border border-black/10 ring-1 ring-black/5"
              style={{ backgroundColor: color2Hex }}
            />
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color2Hex}
                onChange={(e) => setColor2Hex(e.target.value.toUpperCase())}
                className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0 flex-shrink-0"
              />
              <input
                type="text"
                value={color2Hex}
                onChange={(e) => setColor2Hex(e.target.value)}
                className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl font-mono text-sm font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Randomize button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleRandomize}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            <span>Generate Random Pair</span>
          </button>
        </div>

        {/* Results Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          {/* Similarity */}
          <div className="p-5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-1">
            <span className="text-[11px] font-bold uppercase text-slate-400">Perceptual Similarity</span>
            <div className={`font-mono text-3xl font-black ${
              similarity >= 90
                ? 'text-emerald-500'
                : similarity >= 70
                ? 'text-sky-500'
                : similarity >= 40
                ? 'text-amber-500'
                : 'text-rose-500'
            }`}>
              {similarity}%
            </div>
            <span className="text-[11px] text-slate-400">
              {similarity >= 95 ? 'Nearly Identical' : similarity >= 80 ? 'Close Match' : similarity >= 50 ? 'Noticeable Shift' : 'Completely Distinct'}
            </span>
          </div>

          {/* OKLab Distance */}
          <div className="p-5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-1">
            <span className="text-[11px] font-bold uppercase text-slate-400">OKLab ΔE Distance</span>
            <div className="font-mono text-3xl font-black text-slate-900 dark:text-white">
              {oklabDist.toFixed(4)}
            </div>
            <span className="text-[11px] text-slate-400">Human eye perceptual scale [0 ~ 1.15]</span>
          </div>

          {/* Raw RGB Euclidean */}
          <div className="p-5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-1">
            <span className="text-[11px] font-bold uppercase text-slate-400">Raw RGB Distance</span>
            <div className="font-mono text-3xl font-black text-slate-500 dark:text-slate-400">
              {rgbDist.toFixed(1)}
            </div>
            <span className="text-[11px] text-slate-400">Euclidean distance in 3D RGB cube [0–441]</span>
          </div>
        </div>
      </section>

      {/* Explanatory Guide */}
      <section className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-base">
          <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <h2>Why Raw RGB Distance Fails Visual Fairness</h2>
        </div>
        <p>
          In a computer's memory, RGB colors are stored as 3 independent coordinates between 0 and 255. If you calculate Euclidean distance:
        </p>
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-bold">
          Distance = √[ (R1 - R2)² + (G1 - G2)² + (B1 - B2)² ]
        </div>
        <p>
          This assumes human eyes weigh red, green, and blue photons equally. In reality, human cone photoreceptors are dramatically more sensitive to green wavelengths (~555nm) than blue wavelengths. A shift of 30 units in green is immediately obvious to a player, while a shift of 30 units in blue is barely perceptible.
        </p>
        <p>
          The <strong>OKLab color space</strong> applies non-linear cone response transforms (LMS cone matrices) so that equal mathematical distances match equal human perceptual steps.
        </p>
      </section>
    </div>
  );
};
