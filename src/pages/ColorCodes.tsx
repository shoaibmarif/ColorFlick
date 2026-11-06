import React, { useState } from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { CURATED_NAMED_COLORS } from '../data/colorNames';
import { hexToRgb, rgbToHsl } from '../utils/colorConversion';
import { getOptimalTextColor } from '../utils/contrast';
import { Check, Copy, Search } from 'lucide-react';

export const ColorCodesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const filtered = CURATED_NAMED_COLORS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.hex.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <SeoMeta canonicalPath="/color-codes" />

      <PageHeader
        title="Web color codes"
        intro="Every named CSS color with its HEX, RGB and HSL values. Search by name or code, and click a swatch to copy its hex."
      />

      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-zinc-400" aria-hidden="true" />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Try “teal”, “red” or “#FF”"
          aria-label="Search colors"
          className="h-10 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.map((c) => {
          const rgb = hexToRgb(c.hex);
          const hsl = rgb ? rgbToHsl(rgb) : null;
          const textColor = getOptimalTextColor(c.hex);
          const isCopied = copiedHex === c.hex;

          return (
            <div
              key={c.name}
              className="p-3 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-card flex items-center gap-3.5"
            >
              {/* Swatch */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center font-mono text-xs font-semibold shadow-inner ring-1 ring-black/10 flex-shrink-0 cursor-pointer transition-transform active:scale-95"
                style={{ backgroundColor: c.hex, color: textColor }}
                onClick={() => handleCopy(c.hex)}
                title="Copy hex code"
              >
                {isCopied ? <Check className="w-4 h-4" /> : c.hex}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-zinc-900 dark:text-white truncate">
                    {c.name}
                  </h3>
                  <span className="text-xs font-semibold text-zinc-400">
                    {c.category}
                  </span>
                </div>

                <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400 space-y-0.5 mt-1">
                  {rgb && (
                    <p>
                      RGB({rgb.r}, {rgb.g}, {rgb.b})
                    </p>
                  )}
                  {hsl && (
                    <p>
                      HSL({hsl.h}°, {hsl.s}%, {hsl.l}%)
                    </p>
                  )}
                </div>
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={() => handleCopy(c.hex)}
                aria-label={`Copy hex code for ${c.name}`}
                className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
