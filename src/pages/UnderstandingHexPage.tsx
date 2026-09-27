import React, { useState } from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { hexToRgb, normalizeHex } from '../utils/colorConversion';
import { Hash } from 'lucide-react';
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
      <SeoMeta
        title="Understanding Hex Color Codes - CSS Hexadecimal Notation Explained"
        description="Master hexadecimal color codes for web design and CSS. Learn base-16 math, shorthand #RGB notation, 8-digit alpha transparency, and channel breakdown."
        canonicalPath="/understanding-hex-colors"
      />

      {/* Header */}
      <section className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-full text-xs font-bold border border-amber-200 dark:border-amber-800">
          <Hash className="w-3.5 h-3.5" />
          <span>Web Design Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Understanding <span className="text-amber-600 dark:text-amber-400">HEX Color Codes</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          How 6 hexadecimal characters define 16.7 million digital colors in HTML and CSS.
        </p>
      </section>

      {/* Interactive HEX Dissecting Card */}
      <section className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div
            className="w-28 h-28 rounded-2xl shadow-inner border border-black/10 ring-1 ring-black/5 flex-shrink-0"
            style={{ backgroundColor: valid }}
          />
          <div className="space-y-2 flex-1 w-full text-center sm:text-left">
            <span className="text-xs uppercase font-bold text-slate-400">Type or Pick HEX</span>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-full max-w-xs px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl font-mono text-xl font-black text-slate-900 dark:text-white"
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
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Byte-by-Byte Translation
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-rose-50/60 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900 space-y-1">
              <span className="text-[11px] font-bold text-rose-600 uppercase">Red Byte (RR)</span>
              <div className="font-mono text-2xl font-black text-rose-700 dark:text-rose-300">
                #{rHex}
              </div>
              <p className="text-xs text-slate-500">
                Decimal: <strong>{rgb.r}</strong> / 255
              </p>
            </div>

            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-900 space-y-1">
              <span className="text-[11px] font-bold text-emerald-600 uppercase">Green Byte (GG)</span>
              <div className="font-mono text-2xl font-black text-emerald-700 dark:text-emerald-300">
                #{gHex}
              </div>
              <p className="text-xs text-slate-500">
                Decimal: <strong>{rgb.g}</strong> / 255
              </p>
            </div>

            <div className="p-4 bg-sky-50/60 dark:bg-sky-950/30 rounded-2xl border border-sky-200 dark:border-sky-900 space-y-1">
              <span className="text-[11px] font-bold text-sky-600 uppercase">Blue Byte (BB)</span>
              <div className="font-mono text-2xl font-black text-sky-700 dark:text-sky-300">
                #{bHex}
              </div>
              <p className="text-xs text-slate-500">
                Decimal: <strong>{rgb.b}</strong> / 255
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            to="/hex-color-game"
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            Play HEX Guessing Game →
          </Link>
        </div>
      </section>

      {/* Guide Content */}
      <section className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 space-y-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">
          Base-16 Mathematics
        </h2>
        <p>
          Standard decimal numbers use digits $0$ through $9$ (base 10). Hexadecimal uses base 16, utilizing letters $A$ through $F$ for values $10$ through $15$:
        </p>
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs">
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A (10), B (11), C (12), D (13), E (14), F (15)
        </div>
        <p>
          Each pair of hex characters calculates its decimal channel via:
        </p>
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-bold">
          Value = (First Digit × 16) + (Second Digit × 1)
        </div>
        <p>
          For example, <code className="font-mono">#FF</code> evaluates to $(15 \times 16) + 15 = 255$.
        </p>
      </section>
    </div>
  );
};
