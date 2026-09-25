import React, { useState } from 'react';
import { RGB } from '../../types/color';
import { rgbToHex } from '../../utils/colorConversion';
import { RotateCcw, Check } from 'lucide-react';

interface RgbControlsProps {
  onSubmit: (rgb: RGB) => void;
  disabled?: boolean;
}

export const RgbControls: React.FC<RgbControlsProps> = ({ onSubmit, disabled = false }) => {
  const [rgb, setRgb] = useState<RGB>({ r: 128, g: 128, b: 128 });

  const handleChange = (channel: keyof RGB, value: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(value)));
    setRgb((prev) => ({ ...prev, [channel]: clamped }));
  };

  const handleReset = () => {
    setRgb({ r: 128, g: 128, b: 128 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rgb);
  };

  const currentHex = rgbToHex(rgb);

  const channels: { key: keyof RGB; label: string; accentClass: string; barColor: string }[] = [
    { key: 'r', label: 'Red', accentClass: 'accent-rose-500', barColor: '#ef4444' },
    { key: 'g', label: 'Green', accentClass: 'accent-emerald-500', barColor: '#10b981' },
    { key: 'b', label: 'Blue', accentClass: 'accent-sky-500', barColor: '#0ea5e9' },
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4 bg-white/70 dark:bg-slate-800/70 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-sm">
      {/* Live Preview Bar */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl shadow-inner border border-black/10 ring-1 ring-black/5"
            style={{ backgroundColor: currentHex }}
            title={`Your Current Color: ${currentHex}`}
          />
          <div>
            <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Your Mix
            </span>
            <div className="font-mono text-sm font-bold text-slate-900 dark:text-white">
              {currentHex}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          disabled={disabled}
          className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="Reset to 128, 128, 128"
          aria-label="Reset RGB values"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Sliders & Numerical Inputs */}
      <div className="space-y-3">
        {channels.map(({ key, label, accentClass, barColor }) => (
          <div key={key} className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span style={{ color: barColor }} className="font-bold">
                {label} (0–255)
              </span>
              <input
                type="number"
                min={0}
                max={255}
                value={rgb[key]}
                onChange={(e) => handleChange(key, Number(e.target.value))}
                disabled={disabled}
                aria-label={`${label} channel value`}
                className="w-16 px-2 py-0.5 text-right font-mono font-bold text-sm bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <input
              type="range"
              min={0}
              max={255}
              value={rgb[key]}
              onChange={(e) => handleChange(key, Number(e.target.value))}
              disabled={disabled}
              aria-label={`${label} slider`}
              className={`w-full h-2 rounded-lg cursor-pointer bg-slate-200 dark:bg-slate-700 ${accentClass}`}
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={disabled}
        className="w-full py-3 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-brand-400"
      >
        <Check className="w-5 h-5" />
        <span>Submit Guess</span>
      </button>
    </form>
  );
};
