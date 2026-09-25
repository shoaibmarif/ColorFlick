import React from 'react';
import { getOptimalTextColor } from '../../utils/contrast';
import { hexToRgb } from '../../utils/colorConversion';

interface TargetColorProps {
  hex: string;
  showCode: boolean;
  codeFormat?: 'hex' | 'rgb' | 'name';
  colorName?: string;
  helperText?: string;
  roundStatus: 'guessing' | 'answered' | 'completed';
}

export const TargetColor: React.FC<TargetColorProps> = ({
  hex,
  showCode,
  codeFormat = 'hex',
  colorName,
  helperText = 'Target Color',
  roundStatus,
}) => {
  const textColor = getOptimalTextColor(hex);
  const rgb = hexToRgb(hex);

  let displayedCode = hex;
  if (codeFormat === 'rgb' && rgb) {
    displayedCode = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  } else if (codeFormat === 'name' && colorName) {
    displayedCode = colorName;
  }

  return (
    <div className="w-full max-w-md mx-auto my-3">
      <div className="flex items-center justify-between mb-1.5 px-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <span>{helperText}</span>
        {roundStatus === 'answered' && (
          <span className="font-mono text-[11px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-700 dark:text-slate-300">
            {hex}
          </span>
        )}
      </div>

      <div
        className="relative w-full h-36 sm:h-44 rounded-3xl shadow-xl flex flex-col items-center justify-center transition-all duration-300 ring-2 ring-black/5 dark:ring-white/10"
        style={{ backgroundColor: hex }}
        aria-label={`Target color ${hex}`}
      >
        {showCode && (
          <div
            className="px-4 py-1.5 rounded-full font-mono text-sm sm:text-base font-bold tracking-wider backdrop-blur-md bg-black/20 shadow-sm transition-all"
            style={{ color: textColor }}
          >
            {displayedCode}
          </div>
        )}

        {/* Accessible subtle pulse glow on round start */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
          style={{
            boxShadow: `0 12px 30px -8px ${hex}66`,
          }}
        />
      </div>
    </div>
  );
};
