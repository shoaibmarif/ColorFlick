import React from 'react';

/** The four logo colors as a small decorative stripe. */
export const BRAND_COLORS = ['#F25F4C', '#F5B83D', '#1FB58F', '#3B66F5'] as const;

export const ColorStripe: React.FC<{ className?: string; size?: 'sm' | 'md' }> = ({ className = '', size = 'sm' }) => (
  <div className={`flex gap-1 ${className}`} aria-hidden="true">
    {BRAND_COLORS.map((c) => (
      <span key={c} className={size === 'sm' ? 'h-1.5 w-6 rounded-full' : 'h-2.5 w-10 rounded-full'} style={{ backgroundColor: c }} />
    ))}
  </div>
);

/** Tailwind classes for a tinted icon tile, cycling through the brand colors. */
export const TINTS = [
  'bg-coral-100 text-coral-700 dark:bg-coral-900/40 dark:text-coral-200',
  'bg-sun-100 text-sun-800 dark:bg-sun-900/40 dark:text-sun-200',
  'bg-mint-100 text-mint-700 dark:bg-mint-900/40 dark:text-mint-200',
  'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200',
] as const;
