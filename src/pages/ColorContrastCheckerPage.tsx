import React, { useState, useMemo } from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { hexToRgb } from '../utils/colorConversion';
import { calculateContrastRatio } from '../utils/contrast';
import { Check, X, ArrowLeftRight, BookOpen } from 'lucide-react';

export const ColorContrastCheckerPage: React.FC = () => {
  const [fgHex, setFgHex] = useState<string>('#FFFFFF');
  const [bgHex, setBgHex] = useState<string>('#4F46E5');

  const fgRgb = useMemo(() => hexToRgb(fgHex) || { r: 255, g: 255, b: 255 }, [fgHex]);
  const bgRgb = useMemo(() => hexToRgb(bgHex) || { r: 79, g: 70, b: 229 }, [bgHex]);

  const ratio = useMemo(() => {
    return calculateContrastRatio(fgRgb, bgRgb);
  }, [fgRgb, bgRgb]);

  const passes = useMemo(() => {
    return {
      aaNormal: ratio >= 4.5,
      aaaNormal: ratio >= 7.0,
      aaLarge: ratio >= 3.0,
      aaaLarge: ratio >= 4.5,
      uiComponents: ratio >= 3.0,
    };
  }, [ratio]);

  const handleSwap = () => {
    const temp = fgHex;
    setFgHex(bgHex);
    setBgHex(temp);
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <SeoMeta canonicalPath="/color-contrast-checker" />

      <PageHeader title="Color contrast checker" intro="Check whether a text and background color pair is readable enough to meet WCAG 2.1 AA and AAA." />

      {/* Main Interactive Tool Card */}
      <section className="bg-white dark:bg-zinc-800/90 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm space-y-6">
        {/* Color Selectors & Swap Button */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center relative">
          {/* Foreground Input */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-2">
            <span className="text-xs font-semibold text-zinc-500">Text / Foreground</span>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={fgHex}
                onChange={(e) => setFgHex(e.target.value.toUpperCase())}
                className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0 shadow-inner flex-shrink-0"
                aria-label="Foreground color picker"
              />
              <input
                type="text"
                value={fgHex}
                onChange={(e) => setFgHex(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-xl font-mono text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Background Input */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-2">
            <span className="text-xs font-semibold text-zinc-500">Background</span>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bgHex}
                onChange={(e) => setBgHex(e.target.value.toUpperCase())}
                className="w-12 h-12 rounded-xl cursor-pointer border-0 p-0 shadow-inner flex-shrink-0"
                aria-label="Background color picker"
              />
              <input
                type="text"
                value={bgHex}
                onChange={(e) => setBgHex(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-xl font-mono text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Swap Button in center */}
          <div className="sm:col-span-2 flex justify-center -my-2">
            <button
              type="button"
              onClick={handleSwap}
              className="px-3.5 py-1.5 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-card transition-colors"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Swap Colors</span>
            </button>
          </div>
        </div>

        {/* Contrast Ratio Display */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 text-center space-y-1">
          <span className="text-xs font-semibold text-zinc-400">Contrast Ratio</span>
          <div className="font-mono text-4xl sm:text-5xl font-semibold text-zinc-900 dark:text-white">
            {ratio.toFixed(2)} : 1
          </div>
          <span className="text-xs font-semibold text-zinc-500">
            {ratio >= 7.0
              ? '✨ Excellent Contrast (Passes AAA)'
              : ratio >= 4.5
              ? '👍 Good Contrast (Passes AA)'
              : ratio >= 3.0
              ? '⚠️ Moderate Contrast (Passes AA Large Only)'
              : '❌ Poor Contrast (Fails Legibility Requirements)'}
          </span>
        </div>

        {/* Live Simulation Preview Card */}
        <div
          className="p-6 rounded-2xl shadow-inner border border-black/10 ring-1 ring-black/5 space-y-3 transition-colors duration-150"
          style={{ backgroundColor: bgHex, color: fgHex }}
        >
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight" style={{ color: fgHex }}>
            Large Headline (18pt / 24px+)
          </h3>
          <p className="text-sm font-normal leading-relaxed opacity-95" style={{ color: fgHex }}>
            This is standard body copy text. Ensuring high contrast makes digital interfaces readable for people with varying visual acuity, color blindness, or when using mobile screens outdoors in direct sunlight.
          </p>
          <div className="pt-2 flex gap-3">
            <span
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border"
              style={{ borderColor: fgHex, color: fgHex }}
            >
              UI Button Component
            </span>
          </div>
        </div>

        {/* WCAG Compliance Scorecard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          {/* Normal Text */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 space-y-2">
            <span className="text-xs font-semibold text-zinc-400 block">Normal Text (&lt; 18pt)</span>
            <div className="space-y-1.5 text-xs font-semibold">
              <div className="flex items-center justify-between">
                <span>WCAG AA (4.5:1)</span>
                <span className={`px-2 py-0.5 rounded-md text-xs flex items-center gap-1 ${
                  passes.aaNormal ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {passes.aaNormal ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  {passes.aaNormal ? 'Pass' : 'Fail'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>WCAG AAA (7.0:1)</span>
                <span className={`px-2 py-0.5 rounded-md text-xs flex items-center gap-1 ${
                  passes.aaaNormal ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {passes.aaaNormal ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  {passes.aaaNormal ? 'Pass' : 'Fail'}
                </span>
              </div>
            </div>
          </div>

          {/* Large Text */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 space-y-2">
            <span className="text-xs font-semibold text-zinc-400 block">Large Text (&ge; 18pt / 14pt bold)</span>
            <div className="space-y-1.5 text-xs font-semibold">
              <div className="flex items-center justify-between">
                <span>WCAG AA (3.0:1)</span>
                <span className={`px-2 py-0.5 rounded-md text-xs flex items-center gap-1 ${
                  passes.aaLarge ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {passes.aaLarge ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  {passes.aaLarge ? 'Pass' : 'Fail'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>WCAG AAA (4.5:1)</span>
                <span className={`px-2 py-0.5 rounded-md text-xs flex items-center gap-1 ${
                  passes.aaaLarge ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {passes.aaaLarge ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  {passes.aaaLarge ? 'Pass' : 'Fail'}
                </span>
              </div>
            </div>
          </div>

          {/* UI Components */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 space-y-2">
            <span className="text-xs font-semibold text-zinc-400 block">UI & Graphical Elements</span>
            <div className="space-y-1.5 text-xs font-semibold">
              <div className="flex items-center justify-between">
                <span>WCAG AA (3.0:1)</span>
                <span className={`px-2 py-0.5 rounded-md text-xs flex items-center gap-1 ${
                  passes.uiComponents ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {passes.uiComponents ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  {passes.uiComponents ? 'Pass' : 'Fail'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-normal pt-1">
                Applies to form input borders, focus indicators, and icons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Background */}
      <section className="bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-700 space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-base">
          <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2>The Relative Luminance Contrast Formula</h2>
        </div>
        <p>
          According to the World Wide Web Consortium (W3C) WCAG 2.1 specification, contrast ratio is calculated as:
        </p>
        <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 font-mono text-center text-xs font-semibold">
          (L1 + 0.05) / (L2 + 0.05)
        </div>
        <p>
          Where <strong>L1</strong> is the relative luminance of the lighter color, and <strong>L2</strong> is the relative luminance of the darker color. The addition of 0.05 accounts for ambient flare light in typical reading environments.
        </p>
      </section>
    </div>
  );
};
