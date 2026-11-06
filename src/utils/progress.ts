import { hexToRgb, rgbToHsl } from './colorConversion';
import { RoundResult } from '../types/game';

export type ColorFamily =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'neutral';

export const FAMILY_INFO: Record<ColorFamily, { label: string; swatch: string }> = {
  red: { label: 'Reds', swatch: '#E5484D' },
  orange: { label: 'Oranges', swatch: '#F76B15' },
  yellow: { label: 'Yellows', swatch: '#FFC53D' },
  green: { label: 'Greens', swatch: '#30A46C' },
  teal: { label: 'Teals & cyans', swatch: '#12A594' },
  blue: { label: 'Blues', swatch: '#3B66F5' },
  purple: { label: 'Purples', swatch: '#8E4EC6' },
  pink: { label: 'Pinks', swatch: '#D6409F' },
  neutral: { label: 'Grays & neutrals', swatch: '#8B8D98' },
};

/** Buckets a color into a broad, human-named family by hue. */
export function colorFamily(hex: string): ColorFamily {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'neutral';
  const { h, s, l } = rgbToHsl(rgb);
  if (s < 12 || l < 8 || l > 94) return 'neutral';
  if (h < 15 || h >= 345) return 'red';
  if (h < 45) return 'orange';
  if (h < 70) return 'yellow';
  if (h < 165) return 'green';
  if (h < 195) return 'teal';
  if (h < 255) return 'blue';
  if (h < 290) return 'purple';
  return 'pink';
}

export interface FamilyAccuracy {
  family: ColorFamily;
  rounds: number;
  correct: number;
  accuracy: number; // 0-100
}

/**
 * Accuracy per color family, weakest first. Families with fewer than
 * `minRounds` rounds are left out - too little data to say anything.
 */
export function accuracyByFamily(rounds: Pick<RoundResult, 'targetHex' | 'isCorrect'>[], minRounds = 3): FamilyAccuracy[] {
  const acc = new Map<ColorFamily, { rounds: number; correct: number }>();
  for (const r of rounds) {
    const f = colorFamily(r.targetHex);
    const cur = acc.get(f) ?? { rounds: 0, correct: 0 };
    cur.rounds += 1;
    cur.correct += r.isCorrect ? 1 : 0;
    acc.set(f, cur);
  }
  return [...acc.entries()]
    .filter(([, v]) => v.rounds >= minRounds)
    .map(([family, v]) => ({ family, ...v, accuracy: Math.round((v.correct / v.rounds) * 100) }))
    .sort((a, b) => a.accuracy - b.accuracy || b.rounds - a.rounds);
}
