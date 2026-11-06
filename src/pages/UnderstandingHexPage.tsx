import React, { useState } from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { hexToRgb, normalizeHex } from '../utils/colorConversion';

import { Link } from 'react-router-dom';

export const UnderstandingHexPage: React.FC = () => {
  const [hex, setHex] = useState('#2563EB');

  const valid = normalizeHex(hex) || '#2563EB';
  const rgb = hexToRgb(valid) || { r: 37, g: 99, b: 235 };

  const rHex = valid.slice(1, 3);
  const gHex = valid.slice(3, 5);
  const bHex = valid.slice(5, 7);

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <SeoMeta canonicalPath="/understanding-hex-colors" />

      <PageHeader title="Hex color codes, explained" intro="How six characters describe a screen color, and how to read them at a glance." />

      {/* Interactive HEX Dissecting Card */}
      <section className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-700">
          <div
            className="w-28 h-28 rounded-2xl shadow-inner border border-black/10 ring-1 ring-black/5 flex-shrink-0"
            style={{ backgroundColor: valid }}
          />
          <div className="space-y-2 flex-1 w-full text-center sm:text-left">
            <span className="text-xs font-semibold text-zinc-400">Type or Pick HEX</span>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-full max-w-xs px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-xl font-mono text-xl font-semibold text-zinc-900 dark:text-white"
              />
              <input
                type="color"
                value={valid}
                onChange={(e) => setHex(e.target.value.toUpperCase())}
                className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0 flex-shrink-0"
              />
            </div>
          </div>
        </div>

        {/* 3-Channel Breakdown Matrix */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-zinc-500">
            Byte-by-Byte Translation
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-rose-50/60 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900 space-y-1">
              <span className="text-xs font-semibold text-rose-600">Red Byte (RR)</span>
              <div className="font-mono text-2xl font-semibold text-rose-700 dark:text-rose-300">
                #{rHex}
              </div>
              <p className="text-xs text-zinc-500">
                Decimal: <strong>{rgb.r}</strong> / 255
              </p>
            </div>

            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-900 space-y-1">
              <span className="text-xs font-semibold text-emerald-600">Green Byte (GG)</span>
              <div className="font-mono text-2xl font-semibold text-emerald-700 dark:text-emerald-300">
                #{gHex}
              </div>
              <p className="text-xs text-zinc-500">
                Decimal: <strong>{rgb.g}</strong> / 255
              </p>
            </div>

            <div className="p-4 bg-sky-50/60 dark:bg-sky-950/30 rounded-2xl border border-sky-200 dark:border-sky-900 space-y-1">
              <span className="text-xs font-semibold text-sky-600">Blue Byte (BB)</span>
              <div className="font-mono text-2xl font-semibold text-sky-700 dark:text-sky-300">
                #{bHex}
              </div>
              <p className="text-xs text-zinc-500">
                Decimal: <strong>{rgb.b}</strong> / 255
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            to="/hex-color-game"
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            Play HEX Guessing Game →
          </Link>
        </div>
      </section>

      {/* Guide Content */}
      <section className="bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 space-y-5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Base-16 Mathematics
        </h2>
        <p>
          Standard decimal numbers use digits 0 through 9 (base 10). Hexadecimal uses base 16, adding the letters A through F for the values 10 through 15:
        </p>
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 font-mono text-center text-xs">
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A (10), B (11), C (12), D (13), E (14), F (15)
        </div>
        <p>
          Each pair of hex characters calculates its decimal channel via:
        </p>
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 font-mono text-center text-xs font-semibold">
          Value = (First Digit × 16) + (Second Digit × 1)
        </div>
        <p>
          For example, <code className="font-mono">#FF</code> evaluates to (15 × 16) + 15 = 255.
        </p>
      </section>
    </div>
  );
};
