import React, { useState, useMemo } from 'react';
import { RGB, HSL } from '../../types/color';
import { hslToRgb, rgbToHex } from '../../utils/colorConversion';
import { calculateSimilarityPercentage } from '../../utils/colorDistance';
import { Check, RotateCcw } from 'lucide-react';

interface ColorMatchingChallengeProps {
  targetRgb: RGB;
  onSubmit: (guessedRgb: RGB, similarity: number) => void;
  disabled?: boolean;
}

export const ColorMatchingChallenge: React.FC<ColorMatchingChallengeProps> = ({
  targetRgb,
  onSubmit,
  disabled = false,
}) => {
  const [hsl, setHsl] = useState<HSL>({ h: 180, s: 50, l: 50 });

  const playerRgb = useMemo(() => hslToRgb(hsl), [hsl]);
  const playerHex = useMemo(() => rgbToHex(playerRgb), [playerRgb]);
  const targetHex = useMemo(() => rgbToHex(targetRgb), [targetRgb]);

  const liveSimilarity = useMemo(() => {
    return calculateSimilarityPercentage(targetRgb, playerRgb);
  }, [targetRgb, playerRgb]);

  const handleReset = () => {
    setHsl({ h: 180, s: 50, l: 50 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    const sim = calculateSimilarityPercentage(targetRgb, playerRgb);
    onSubmit(playerRgb, sim);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-5 bg-white/80 dark:bg-zinc-800/80 p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-md">
      {/* Target vs Your Color Visual Split */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Target Color Block */}
        <div className="flex flex-col items-center space-y-2 p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            Target
          </span>
          <div
            className="w-full h-28 sm:h-32 rounded-xl shadow-inner border border-black/10 ring-1 ring-black/5"
            style={{ backgroundColor: targetHex }}
            aria-label="Target color display"
          />
          <span className="text-xs font-mono text-zinc-400 italic">
            Values shown after you guess
          </span>
        </div>

        {/* Player Color Block */}
        <div className="flex flex-col items-center space-y-2 p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700">
          <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
            Your color
          </span>
          <div
            className="w-full h-28 sm:h-32 rounded-xl shadow-inner border border-black/10 ring-1 ring-black/5 transition-colors duration-75"
            style={{ backgroundColor: playerHex }}
            aria-label="Your tuned color display"
          />
          <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-200">
            {playerHex}
          </span>
        </div>
      </div>

      {/* Live Similarity Bar */}
      <div className="space-y-1.5 p-3.5 bg-zinc-100 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-700/60">
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-zinc-600 dark:text-zinc-400">How close you are</span>
          <span className={`font-mono text-sm font-semibold ${
            liveSimilarity >= 90
              ? 'text-emerald-500'
              : liveSimilarity >= 75
              ? 'text-brand-500'
              : liveSimilarity >= 50
              ? 'text-amber-500'
              : 'text-rose-500'
          }`}>
            {liveSimilarity.toFixed(1)}%
          </span>
        </div>
        <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 transition-all duration-100"
            style={{ width: `${liveSimilarity}%` }}
          />
        </div>
      </div>

      {/* HSL Sliders */}
      <div className="space-y-3.5">
        {/* Hue Slider (0 - 360) */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-zinc-700 dark:text-zinc-200">Hue</span>
            <span className="font-mono text-xs bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700">
              {hsl.h}°
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={360}
            value={hsl.h}
            onChange={(e) => setHsl((prev) => ({ ...prev, h: Number(e.target.value) }))}
            disabled={disabled}
            aria-label="Hue slider"
            className="w-full h-3 rounded-lg cursor-pointer"
            style={{
              background:
                'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
            }}
          />
        </div>

        {/* Saturation Slider (0 - 100%) */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-zinc-700 dark:text-zinc-200">Saturation</span>
            <span className="font-mono text-xs bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700">
              {hsl.s}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={hsl.s}
            onChange={(e) => setHsl((prev) => ({ ...prev, s: Number(e.target.value) }))}
            disabled={disabled}
            aria-label="Saturation slider"
            className="w-full h-3 rounded-lg cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(${hsl.h}, 0%, ${hsl.l}%), hsl(${hsl.h}, 100%, ${hsl.l}%))`,
            }}
          />
        </div>

        {/* Lightness Slider (0 - 100%) */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-zinc-700 dark:text-zinc-200">Lightness</span>
            <span className="font-mono text-xs bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700">
              {hsl.l}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={hsl.l}
            onChange={(e) => setHsl((prev) => ({ ...prev, l: Number(e.target.value) }))}
            disabled={disabled}
            aria-label="Lightness slider"
            className="w-full h-3 rounded-lg cursor-pointer"
            style={{
              background: `linear-gradient(to right, #000000, hsl(${hsl.h}, ${hsl.s}%, 50%), #ffffff)`,
            }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={handleReset}
          disabled={disabled}
          className="py-3 px-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          title="Reset sliders"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>

        <button
          type="submit"
          disabled={disabled}
          className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-brand-400"
        >
          <Check className="w-5 h-5" />
          <span>Submit guess</span>
        </button>
      </div>
    </form>
  );
};
