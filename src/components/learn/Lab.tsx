import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/** The interactive "try it" box at the top of each guide page. */
export const LabCard: React.FC<{ title: string; children: React.ReactNode; cta?: { to: string; label: string } }> = ({
  title,
  children,
  cta,
}) => (
  <section aria-label={title} className="card mb-12 p-5 shadow-card sm:p-6">
    <h2 className="eyebrow mb-4">{title}</h2>
    {children}
    {cta && (
      <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <Link to={cta.to} className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
          {cta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    )}
  </section>
);

/** A large color preview with its code(s) next to it. */
export const SwatchReadout: React.FC<{ color: string; lines: React.ReactNode[] }> = ({ color, lines }) => (
  <div className="flex items-center gap-5">
    <div
      className="h-24 w-24 shrink-0 rounded-xl ring-1 ring-inset ring-black/10 sm:h-28 sm:w-28"
      style={{ backgroundColor: color }}
      role="img"
      aria-label={`Color preview ${color}`}
    />
    <div className="min-w-0 space-y-1 font-mono">
      {lines.map((l, i) => (
        <div key={i} className={i === 0 ? 'text-xl font-semibold sm:text-2xl' : 'text-sm text-zinc-500 dark:text-zinc-400'}>
          {l}
        </div>
      ))}
    </div>
  </div>
);

interface SliderProps {
  label: string;
  value: number;
  min?: number;
  max: number;
  unit?: string;
  onChange: (v: number) => void;
  /** CSS background for the track, e.g. a gradient showing what the slider does. */
  track: string;
}

export const LabSlider: React.FC<SliderProps> = ({ label, value, min = 0, max, unit = '', onChange, track }) => (
  <label className="block">
    <span className="mb-1.5 flex items-center justify-between text-sm">
      <span className="font-medium">{label}</span>
      <span className="font-mono tabular-nums text-zinc-500 dark:text-zinc-400">
        {value}
        {unit}
      </span>
    </span>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="h-3 w-full rounded-full"
      style={{ background: track }}
    />
  </label>
);

/** Small labelled swatch strip used for palette examples. */
export const PaletteStrip: React.FC<{ colors: string[]; label: string }> = ({ colors, label }) => (
  <div className="flex h-10 overflow-hidden rounded-lg ring-1 ring-inset ring-black/10" role="img" aria-label={label}>
    {colors.map((c) => (
      <span key={c} className="flex-1" style={{ backgroundColor: c }} title={c} />
    ))}
  </div>
);
