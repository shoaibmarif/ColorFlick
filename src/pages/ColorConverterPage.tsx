import React, { useState, useMemo } from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { getRouteMeta } from '../seo/routes';
import { RGB, HSL, HSV, OKLab } from '../types/color';
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  rgbToOklab,
  normalizeHex,
} from '../utils/colorConversion';
import { Copy, Check, BookOpen } from 'lucide-react';

interface ColorConverterPageProps {
  initialFormat?: 'rgb' | 'hex' | 'all';
}

export const ColorConverterPage: React.FC<ColorConverterPageProps> = ({ initialFormat = 'all' }) => {
  const [hexInput, setHexInput] = useState<string>('#4F46E5');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Normalize input or fallback
  const validHex = useMemo(() => normalizeHex(hexInput) || '#4F46E5', [hexInput]);
  const rgb = useMemo<RGB>(() => hexToRgb(validHex) || { r: 79, g: 70, b: 229 }, [validHex]);
  const hsl = useMemo<HSL>(() => rgbToHsl(rgb), [rgb]);
  const hsv = useMemo<HSV>(() => rgbToHsv(rgb), [rgb]);
  const oklab = useMemo<OKLab>(() => rgbToOklab(rgb), [rgb]);

  const copyToClipboard = (key: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    });
  };

  const complementaryHex = useMemo(() => {
    const compHsl = { ...hsl, h: (hsl.h + 180) % 360 };
    return rgbToHex(hslToRgb(compHsl));
  }, [hsl]);

  const canonical =
    initialFormat === 'rgb' ? '/rgb-to-hex' : initialFormat === 'hex' ? '/hex-to-rgb' : '/color-converter';

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <SeoMeta canonicalPath={canonical} />

      <PageHeader title={getRouteMeta(canonical)?.heading ?? 'Color converter'} intro="Enter a HEX, RGB or HSL value to convert it, then preview tints, shades and its complement." />

      {/* Converter Sandbox Card */}
      <section className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
        {/* Main Swatch & Quick Pick */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-700">
          <div
            className="w-28 h-28 rounded-2xl shadow-inner border border-black/10 ring-1 ring-black/5 relative group cursor-pointer flex-shrink-0"
            style={{ backgroundColor: validHex }}
            title="Click to pick color"
          >
            <input
              type="color"
              value={validHex}
              onChange={(e) => setHexInput(e.target.value.toUpperCase())}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              aria-label="Color input"
            />
          </div>

          <div className="space-y-2 flex-1 w-full text-center sm:text-left">
            <label className="text-xs font-semibold text-zinc-500">
              Input Color (HEX, 3 or 6 digits)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                placeholder="#4F46E5"
                className="w-full max-w-xs px-4 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-xl font-mono text-base font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <input
                type="color"
                value={validHex}
                onChange={(e) => setHexInput(e.target.value.toUpperCase())}
                className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0 flex-shrink-0"
                title="Open color palette"
              />
            </div>
            <p className="text-xs text-zinc-400">
              Try typing shorthand (e.g., <code className="font-mono text-brand-600 dark:text-brand-400">#F00</code>), full 6-digit, or use the native color picker.
            </p>
          </div>
        </div>

        {/* Multi-Format Output Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* HEX Box */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-zinc-400 block">HEX Format</span>
              <span className="font-mono text-base font-semibold text-zinc-900 dark:text-white">
                {validHex}
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard('hex', validHex)}
              className="p-2 text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl transition-colors"
              title="Copy HEX"
            >
              {copiedKey === 'hex' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* RGB Box */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-zinc-400 block">RGB Format</span>
              <span className="font-mono text-base font-semibold text-zinc-900 dark:text-white">
                rgb({rgb.r}, {rgb.g}, {rgb.b})
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard('rgb', `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
              className="p-2 text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl transition-colors"
              title="Copy RGB"
            >
              {copiedKey === 'rgb' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* HSL Box */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-zinc-400 block">HSL Format</span>
              <span className="font-mono text-base font-semibold text-zinc-900 dark:text-white">
                hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard('hsl', `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
              className="p-2 text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl transition-colors"
              title="Copy HSL"
            >
              {copiedKey === 'hsl' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* HSV Box */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-zinc-400 block">HSV / HSB</span>
              <span className="font-mono text-base font-semibold text-zinc-900 dark:text-white">
                hsv({hsv.h}, {hsv.s}%, {hsv.v}%)
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard('hsv', `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`)}
              className="p-2 text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl transition-colors"
              title="Copy HSV"
            >
              {copiedKey === 'hsv' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* OKLab Box */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-between sm:col-span-2">
            <div>
              <span className="text-xs font-semibold text-zinc-400 block">
                OKLab (Perceptually Uniform L, a, b)
              </span>
              <span className="font-mono text-sm sm:text-base font-semibold text-zinc-900 dark:text-white">
                oklab({oklab.L.toFixed(3)}, {oklab.a.toFixed(3)}, {oklab.b.toFixed(3)})
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                copyToClipboard(
                  'oklab',
                  `oklab(${oklab.L.toFixed(3)} ${oklab.a.toFixed(3)} ${oklab.b.toFixed(3)})`
                )
              }
              className="p-2 text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl transition-colors"
              title="Copy OKLab"
            >
              {copiedKey === 'oklab' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Harmonies & Shades Preview */}
        <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-700/60">
          <h3 className="text-xs font-semibold text-zinc-500">
            Harmonies & Tints
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1.5 text-center">
              <span className="text-xs font-semibold text-zinc-400">Complementary</span>
              <div
                className="w-full h-10 rounded-lg shadow-inner cursor-pointer"
                style={{ backgroundColor: complementaryHex }}
                onClick={() => setHexInput(complementaryHex)}
                title="Click to load complementary color"
              />
              <span className="font-mono font-semibold text-xs">{complementaryHex}</span>
            </div>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1.5 text-center">
              <span className="text-xs font-semibold text-zinc-400">Lighter Tint (+20% L)</span>
              <div
                className="w-full h-10 rounded-lg shadow-inner"
                style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, ${Math.min(100, hsl.l + 20)}%)` }}
              />
              <span className="font-mono font-semibold text-xs">
                {rgbToHex(hslToRgb({ ...hsl, l: Math.min(100, hsl.l + 20) }))}
              </span>
            </div>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1.5 text-center">
              <span className="text-xs font-semibold text-zinc-400">Darker Shade (-20% L)</span>
              <div
                className="w-full h-10 rounded-lg shadow-inner"
                style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, ${Math.max(0, hsl.l - 20)}%)` }}
              />
              <span className="font-mono font-semibold text-xs">
                {rgbToHex(hslToRgb({ ...hsl, l: Math.max(0, hsl.l - 20) }))}
              </span>
            </div>

            <div className="p-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-1.5 text-center">
              <span className="text-xs font-semibold text-zinc-400">Desaturated (-50% S)</span>
              <div
                className="w-full h-10 rounded-lg shadow-inner"
                style={{ backgroundColor: `hsl(${hsl.h}, ${Math.max(0, hsl.s - 50)}%, ${hsl.l}%)` }}
              />
              <span className="font-mono font-semibold text-xs">
                {rgbToHex(hslToRgb({ ...hsl, s: Math.max(0, hsl.s - 50) }))}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Article Section */}
      <section className="bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-base">
          <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2>How Color Conversion Mathematics Works</h2>
        </div>
        <p>
          Digital screens produce color by mixing red, green and blue light. Each color space serves a distinct conceptual purpose:
        </p>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            <strong>HEX (Hexadecimal):</strong> A base-16 shorthand representation of the 8-bit RGB channels (00 to FF, which is 0 to 255 in decimal).
          </li>
          <li>
            <strong>RGB (Red, Green, Blue):</strong> The primary additive hardware color model for display monitors and mobile screens.
          </li>
          <li>
            <strong>HSL (Hue, Saturation, Lightness):</strong> A cylindrical coordinate model created to align with intuitive human descriptions of color purity and tone.
          </li>
          <li>
            <strong>OKLab:</strong> A color space designed by Björn Ottosson in 2020 to be perceptually uniform, meaning Euclidean distance in OKLab corresponds directly to how human eyes perceive color difference.
          </li>
        </ul>
      </section>
    </div>
  );
};
