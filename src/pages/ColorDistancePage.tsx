import React, { useState, useMemo } from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { hexToRgb, rgbToHex } from '../utils/colorConversion';
import { oklabDistance, rgbEuclideanDistance, calculateSimilarityPercentage } from '../utils/colorDistance';
import { Shuffle } from 'lucide-react';

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
      <SeoMeta canonicalPath="/color-distance" />

      <PageHeader title="Color difference calculator" intro="Compare two colors and see how different they actually look (OKLab ΔE) next to their raw RGB distance." />

      {/* Interactive Comparator Sandbox */}
      <section className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
        {/* Color 1 & Color 2 Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-3">
            <span className="text-xs font-semibold text-zinc-500">Color 1</span>
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
                className="w-full px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-xl font-mono text-sm font-semibold text-zinc-900 dark:text-white"
              />
            </div>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-3">
            <span className="text-xs font-semibold text-zinc-500">Color 2</span>
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
                className="w-full px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-xl font-mono text-sm font-semibold text-zinc-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Randomize button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleRandomize}
            className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            <span>Random pair</span>
          </button>
        </div>

        {/* Results Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          {/* Similarity */}
          <div className="p-5 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 text-center space-y-1">
            <span className="text-xs font-semibold text-zinc-400">Perceptual Similarity</span>
            <div className={`font-mono text-3xl font-semibold ${
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
            <span className="text-xs text-zinc-400">
              {similarity >= 95 ? 'Nearly Identical' : similarity >= 80 ? 'Close Match' : similarity >= 50 ? 'Noticeable Shift' : 'Completely Distinct'}
            </span>
          </div>

          {/* OKLab Distance */}
          <div className="p-5 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 text-center space-y-1">
            <span className="text-xs font-semibold text-zinc-400">OKLab difference (ΔE)</span>
            <div className="font-mono text-3xl font-semibold text-zinc-900 dark:text-white">
              {oklabDist.toFixed(4)}
            </div>
            <span className="text-xs text-zinc-400">How different they look. 0 is identical.</span>
          </div>

          {/* Raw RGB Euclidean */}
          <div className="p-5 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 text-center space-y-1">
            <span className="text-xs font-semibold text-zinc-400">Plain RGB distance</span>
            <div className="font-mono text-3xl font-semibold text-zinc-500 dark:text-zinc-400">
              {rgbDist.toFixed(1)}
            </div>
            <span className="text-xs text-zinc-400">Straight-line gap in RGB, from 0 to 441</span>
          </div>
        </div>
      </section>

      <article className="prose-page">
        <h2>Why plain RGB distance gets it wrong</h2>
        <p>
          The simple way to compare two colors is to treat red, green and blue as coordinates and
          measure the straight-line gap between them. It's easy to calculate, but it doesn't match what
          you see. Our eyes are much more sensitive to changes in green than in blue, so a shift of 30 in
          the green channel is obvious while the same shift in blue can be hard to spot. RGB distance
          scores them the same.
        </p>
        <p>
          Try it above: pick two blues that look nearly identical, then two greens with the same RGB
          distance. The OKLab number will tell the real story.
        </p>

        <h2>What OKLab does differently</h2>
        <p>
          OKLab is a color space designed in 2020 by Björn Ottosson so that equal distances look roughly
          equally different, whatever the color. It separates lightness from the color itself, then
          stretches and squeezes the space to match human vision.
        </p>

        <h2>Reading the number</h2>
        <ul>
          <li><strong>Under 0.02:</strong> most people can't tell the two apart.</li>
          <li><strong>0.02 to 0.05:</strong> a subtle difference, visible side by side.</li>
          <li><strong>0.05 to 0.15:</strong> clearly different shades of a similar color.</li>
          <li><strong>Above 0.15:</strong> obviously different colors.</li>
        </ul>
        <p>
          ColorFlick uses these same steps. On Expert, the wrong swatches sit just above that 0.02 line,
          which is why it's so hard. They're still never below it, though, so every round can be won.
        </p>
      </article>
    </div>
  );
};
