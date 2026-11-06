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
    <div className="mx-auto my-4 w-full max-w-md">
      <div className="mb-2 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <span>{helperText}</span>
        {roundStatus === 'answered' && (
          <span className="rounded-md bg-zinc-900 px-2 py-0.5 font-mono text-xs text-white animate-pop dark:bg-white dark:text-zinc-900">
            {hex}
          </span>
        )}
      </div>

      {/* Flat swatch: no gloss or tinted shadow, so the color is shown exactly. */}
      <div
        className="relative flex h-36 w-full select-none items-center justify-center rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10 sm:h-48"
        style={{ backgroundColor: hex }}
        role="img"
        aria-label={`Target color${showCode ? ` ${displayedCode}` : ''}`}
      >
        {showCode && (
          <span className="rounded-md px-3 py-1 font-mono text-sm font-medium" style={{ color: textColor }}>
            {displayedCode}
          </span>
        )}
      </div>
    </div>
  );
};
