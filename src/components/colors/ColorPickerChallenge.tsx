import React, { useState, useMemo } from 'react';
import { RGB } from '../../types/color';
import { hexToRgb, rgbToHex, rgbToHsl } from '../../utils/colorConversion';
import { calculateSimilarityPercentage } from '../../utils/colorDistance';
import { RotateCcw, Shuffle, Check, Eye } from 'lucide-react';

interface ColorPickerChallengeProps {
  targetRgb: RGB;
  onSubmit: (guessedRgb: RGB, similarity: number) => void;
  disabled?: boolean;
}

export const ColorPickerChallenge: React.FC<ColorPickerChallengeProps> = ({
  targetRgb,
  onSubmit,
  disabled = false,
}) => {
  const [playerHex, setPlayerHex] = useState<string>('#808080');

  const playerRgb = useMemo<RGB>(() => {
    return hexToRgb(playerHex) || { r: 128, g: 128, b: 128 };
  }, [playerHex]);

  const playerHsl = useMemo(() => {
    return rgbToHsl(playerRgb);
  }, [playerRgb]);

  const liveSimilarity = useMemo(() => {
    return calculateSimilarityPercentage(targetRgb, playerRgb);
  }, [targetRgb, playerRgb]);

  const handleReset = () => {
    setPlayerHex('#808080');
  };

  const handleRandomize = () => {
    const randomByte = () => Math.floor(Math.random() * 256);
    const randRgb: RGB = { r: randomByte(), g: randomByte(), b: randomByte() };
    setPlayerHex(rgbToHex(randRgb));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    const sim = calculateSimilarityPercentage(targetRgb, playerRgb);
    onSubmit(playerRgb, sim);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-5 bg-white/80 dark:bg-zinc-800/80 p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-md">
      {/* Side-by-Side Swatches Comparison */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Target Card */}
        <div className="flex flex-col items-center space-y-2 p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            Target
          </span>
          <div
            className="w-full h-24 sm:h-28 rounded-xl shadow-inner border border-black/10 ring-1 ring-black/5"
            style={{ backgroundColor: rgbToHex(targetRgb) }}
            aria-label="Target color swatch"
          />
          <span className="text-xs font-mono text-zinc-400 italic">
            Code shown after you guess
          </span>
        </div>

        {/* Player Pick Card */}
        <div className="flex flex-col items-center space-y-2 p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700">
          <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
            Your color
          </span>
          <div
            className="w-full h-24 sm:h-28 rounded-xl shadow-inner border border-black/10 ring-1 ring-black/5 relative flex items-center justify-center cursor-pointer group"
            style={{ backgroundColor: playerHex }}
            title="Open color picker"
          >
            <input
              type="color"
              value={playerHex}
              onChange={(e) => setPlayerHex(e.target.value.toUpperCase())}
              disabled={disabled}
              aria-label="Color picker"
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer disabled:cursor-not-allowed"
            />
            <div className="px-2.5 py-1 bg-black/40 text-white rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>Tap to pick</span>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-200">
            {playerHex}
          </span>
        </div>
      </div>

      {/* Live Similarity Meter */}
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
            className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 transition-all duration-150"
            style={{ width: `${liveSimilarity}%` }}
          />
        </div>
      </div>

      {/* Color Code Breakdown Table */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-700/60">
          <span className="text-xs font-semibold text-zinc-400 block">HEX</span>
          <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-100">
            {playerHex}
          </span>
        </div>
        <div className="p-2 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-700/60">
          <span className="text-xs font-semibold text-zinc-400 block">RGB</span>
          <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-100">
            {playerRgb.r}, {playerRgb.g}, {playerRgb.b}
          </span>
        </div>
        <div className="p-2 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-700/60">
          <span className="text-xs font-semibold text-zinc-400 block">HSL</span>
          <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-100">
            {playerHsl.h}°, {playerHsl.s}%, {playerHsl.l}%
          </span>
        </div>
      </div>

      {/* Action Buttons: Pick, Reset, Randomize, Submit */}
      <div className="space-y-2.5 pt-1">
        <label className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer transition-colors border border-zinc-300 dark:border-zinc-600">
          <input
            type="color"
            value={playerHex}
            onChange={(e) => setPlayerHex(e.target.value.toUpperCase())}
            disabled={disabled}
            className="w-5 h-5 rounded cursor-pointer border-0 p-0"
          />
          <span>Open color picker</span>
        </label>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleReset}
            disabled={disabled}
            className="flex-1 py-2.5 px-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={handleRandomize}
            disabled={disabled}
            className="flex-1 py-2.5 px-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Randomize</span>
          </button>
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="w-full py-3 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-brand-400"
        >
          <Check className="w-5 h-5" />
          <span>Submit guess</span>
        </button>
      </div>
    </form>
  );
};
