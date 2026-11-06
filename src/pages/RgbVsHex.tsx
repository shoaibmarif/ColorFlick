import React from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { Link } from 'react-router-dom';
import { Hash, Sliders, ArrowRight } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';

export const RgbVsHexPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <SeoMeta canonicalPath="/rgb-vs-hex" />

      <PageHeader title="RGB vs HEX" intro="Two notations for the same 16.7 million screen colors, and how to convert between them." />

      {/* Side-by-side Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-500 font-semibold text-base">
            <Sliders className="w-5 h-5" />
            <span>RGB (Decimal)</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            RGB expresses color as three decimal numbers from <code>0</code> to <code>255</code> representing Red, Green, and Blue intensity.
          </p>
          <div className="font-mono text-xs p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
            rgb(59, 130, 246)
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold text-base">
            <Hash className="w-5 h-5" />
            <span>HEX (Base-16)</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            HEX encodes the exact same three 8-bit bytes into base-16 characters (<code>0-9</code> and <code>A-F</code>).
          </p>
          <div className="font-mono text-xs p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
            #3B82F6
          </div>
        </div>
      </div>

      {/* Hexadecimal Base-16 Explanation */}
      <section className="bg-white dark:bg-zinc-800 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          How Hexadecimal Encoding Works
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Standard decimal numbers use base-10 (0 through 9). Hexadecimal uses base-16:
        </p>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-700/40 rounded-2xl font-mono text-xs text-center overflow-x-auto">
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A(10), B(11), C(12), D(13), E(14), F(15)
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-300">
          Each channel has 8 bits (2⁸ = 256 values). Because 16 × 16 = 256, exactly two hex digits can represent any number from 0 to 255. For instance:
        </p>
        <ul className="text-xs space-y-1.5 list-disc pl-5 text-zinc-600 dark:text-zinc-300">
          <li><code>00</code> in hex = 0 in decimal (0% channel light)</li>
          <li><code>80</code> in hex = 8 × 16 + 0 = 128 in decimal (~50% channel light)</li>
          <li><code>FF</code> in hex = 15 × 16 + 15 = 255 in decimal (100% channel light)</li>
        </ul>
      </section>

      {/* Shorthand Hex */}
      <section className="bg-white dark:bg-zinc-800 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          The 3-Digit Shorthand Rule
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          In CSS and web standards, whenever both digits of every channel are identical, you can write a 3-digit shorthand hex code. The browser doubles each digit:
        </p>
        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-700/40 rounded-xl">
            <code>#FFF</code> expands to <code>#FFFFFF</code> (White)
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-700/40 rounded-xl">
            <code>#000</code> expands to <code>#000000</code> (Black)
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-700/40 rounded-xl">
            <code>#F00</code> expands to <code>#FF0000</code> (Red)
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-700/40 rounded-xl">
            <code>#08C</code> expands to <code>#0088CC</code> (Cyan)
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="flex justify-between items-center pt-4">
        <Link to="/color-codes" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
          Color Codes Reference →
        </Link>
        <ButtonLink to="/hex-color-game" variant="primary" size="md" className="gap-2">
            <span>Play HEX Mode</span>
            <ArrowRight className="w-4 h-4" />
          </ButtonLink>
      </div>
    </div>
  );
};
