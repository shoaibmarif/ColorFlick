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
    <div className="w-full max-w-md mx-auto my-3 sm:my-4 px-1">
      {/* Target Color Meta / Helper Banner */}
      <div className="flex items-center justify-between mb-2 px-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: hex }} />
          <span>{helperText}</span>
        </span>
        {roundStatus === 'answered' ? (
          <span className="font-mono text-xs bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-2.5 py-0.5 rounded-full font-extrabold shadow-sm animate-pop">
            {hex}
          </span>
        ) : (
          <span className="text-[10px] font-mono tracking-widest text-slate-400">
            TARGET SWATCH
          </span>
        )}
      </div>

      {/* Luxury Tactile Color Swatch */}
      <div
        className="relative w-full h-36 xs:h-40 sm:h-48 rounded-3xl flex flex-col items-center justify-center transition-all duration-300 ring-1 ring-black/10 dark:ring-white/15 overflow-hidden select-none"
        style={{
          backgroundColor: hex,
          boxShadow: `0 20px 40px -12px ${hex}88, 0 8px 18px -6px ${hex}44`,
        }}
        aria-label={`Target color ${hex}`}
      >
        {/* Specular Glare / Acrylic Glass Highlight */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/20 via-transparent to-black/10 rounded-3xl" />
        <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none bg-gradient-to-b from-white/25 to-transparent rounded-t-3xl" />

        {/* Displayed Code or Name (When Enabled) */}
        {showCode && (
          <div
            className="relative z-10 px-4 py-1.5 rounded-full font-mono text-xs sm:text-sm md:text-base font-extrabold tracking-wider backdrop-blur-md bg-black/35 shadow-lg border border-white/20 transition-all duration-200"
            style={{ color: textColor }}
          >
            {displayedCode}
          </div>
        )}

        {/* Subtle Bottom Ambient Notch */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
          <div className="w-12 h-1 rounded-full bg-white/30 backdrop-blur-xs" />
        </div>
      </div>
    </div>
  );
};
