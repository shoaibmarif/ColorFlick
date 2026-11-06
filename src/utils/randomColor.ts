import { RGB, OKLab } from '../types/color';
import { Difficulty, RoundChoice } from '../types/game';
import { hslToRgb, rgbToHex, rgbToOklab, oklabToRgb } from './colorConversion';
import { CURATED_NAMED_COLORS } from '../data/colorNames';

export type RngFn = () => number;

/**
 * Uses Web Crypto API when available for cryptographically secure float in [0, 1).
 * Falls back to Math.random() in older or SSR environments.
 */
export function secureRandom(): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] / (0xffffffff + 1);
  }
  return Math.random();
}

/**
 * Generates a random integer in [min, max] using either secure randomness or custom PRNG.
 */
export function randomInt(min: number, max: number, rng: RngFn = secureRandom): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

/**
 * Generates a random vibrant RGB color.
 */
export function generateRandomRgb(rng: RngFn = secureRandom): RGB {
  // Use HSL generation with reasonable saturation and lightness to ensure attractive colors
  const h = Math.floor(rng() * 360);
  const s = randomInt(40, 95, rng);
  const l = randomInt(25, 75, rng);
  return hslToRgb({ h, s, l });
}

/**
 * Smallest OKLab difference most people can reliably see on a typical screen
 * (a "just noticeable difference"). No two swatches in a round may be closer
 * than this, otherwise a round becomes a coin flip.
 */
export const JND = 0.02;

/**
 * Single source of truth for difficulty. The game, the mode descriptions and
 * the How-to-play page all read from here, so the numbers can't drift apart.
 *
 * Distances are OKLab ΔE (0 = identical, ~1 = black vs white).
 */
export interface DifficultyConfig {
  /** Total swatches shown in "Exact color" mode (including the answer). */
  choiceCount: number;
  /** Total swatches shown in "Closest color" mode. */
  closestChoiceCount: number;
  /** Every wrong swatch is at least this far from the target… */
  minDelta: number;
  /** …and at most this far (except Easy, which uses unrelated colors). */
  maxDelta: number;
  /** Every pair of wrong swatches is at least this far apart. */
  minPairDelta: number;
  /** "Closest color": distance band for the correct answer… */
  closestBand: [number, number];
  /** …and how much further every other swatch must be. */
  closestMargin: number;
  /** Plain-language summary used in the UI. */
  summary: string;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    choiceCount: 3,
    closestChoiceCount: 3,
    minDelta: 0.25,
    maxDelta: 0.9,
    minPairDelta: 0.15,
    closestBand: [0.04, 0.1],
    closestMargin: 0.2,
    summary: 'Three colors that are easy to tell apart.',
  },
  medium: {
    choiceCount: 6,
    closestChoiceCount: 4,
    minDelta: 0.1,
    maxDelta: 0.2,
    minPairDelta: 0.06,
    closestBand: [0.04, 0.1],
    closestMargin: 0.12,
    summary: 'Six colors from the same family.',
  },
  hard: {
    choiceCount: 8,
    closestChoiceCount: 5,
    minDelta: 0.05,
    maxDelta: 0.1,
    minPairDelta: 0.035,
    closestBand: [0.035, 0.09],
    closestMargin: 0.07,
    summary: 'Eight close shades. You’ll need to look carefully.',
  },
  expert: {
    choiceCount: 9,
    closestChoiceCount: 5,
    minDelta: 0.03,
    maxDelta: 0.055,
    minPairDelta: 0.025,
    closestBand: [0.03, 0.07],
    closestMargin: 0.04,
    summary: 'Nine shades that are almost identical. Good luck.',
  },
};

const labDistance = (a: OKLab, b: OKLab) =>
  Math.sqrt((a.L - b.L) ** 2 + (a.a - b.a) ** 2 + (a.b - b.b) ** 2);

/** Random point on a shell of radius [rMin, rMax] around `center` in OKLab. */
function sampleShell(center: OKLab, rMin: number, rMax: number, rng: RngFn): OKLab {
  // Uniform direction on the unit sphere.
  const z = rng() * 2 - 1;
  const theta = rng() * Math.PI * 2;
  const r = Math.sqrt(1 - z * z);
  const d = rMin + rng() * (rMax - rMin);
  return {
    L: center.L + d * z,
    a: center.a + d * r * Math.cos(theta),
    b: center.b + d * r * Math.sin(theta),
  };
}

interface PickOptions {
  count: number;
  /** Generates a candidate color. */
  candidate: (rng: RngFn) => RGB;
  /** Accepts/rejects by distance to the target. */
  acceptTarget: (deltaToTarget: number) => boolean;
  minPairDelta: number;
  /** Colors every pick must also stay away from (e.g. the target). */
  avoid: OKLab[];
  rng: RngFn;
}

/**
 * Picks `count` colors that satisfy the target constraint and are at least
 * `minPairDelta` apart from each other and from `avoid`. If the space is too
 * crowded it gradually relaxes the pair spacing, but never below the JND, so
 * the requested number of colors is always returned and they are always
 * visibly different.
 */
function pickDistinct({ count, candidate, acceptTarget, minPairDelta, avoid, rng }: PickOptions) {
  const picked: { rgb: RGB; lab: OKLab; delta: number }[] = [];
  const target = avoid[0];
  let pairMin = minPairDelta;
  let attempts = 0;

  while (picked.length < count) {
    attempts++;
    if (attempts % 300 === 0) pairMin = Math.max(JND, pairMin * 0.85);
    if (attempts > 20000) break; // pathological safety valve

    // After many misses, fall back to random colors so we always finish.
    const rgb = attempts > 2000 && rng() < 0.5 ? generateRandomRgb(rng) : candidate(rng);
    const lab = rgbToOklab(rgb); // measure the *rounded, in-gamut* color
    const delta = labDistance(lab, target);
    if (!acceptTarget(delta)) continue;
    if (delta < JND) continue;
    if (avoid.some((o) => labDistance(o, lab) < JND)) continue;
    if (picked.some((p) => labDistance(p.lab, lab) < pairMin)) continue;
    picked.push({ rgb, lab, delta });
  }
  return picked;
}

function shuffle<T>(items: T[], rng: RngFn): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

/**
 * "Exact color" mode: the target plus distractors that are all visibly
 * different from the target and from each other.
 */
export function generateExactColorChoices(
  targetRgb: RGB,
  difficulty: Difficulty,
  rng: RngFn = Math.random
): RoundChoice[] {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const targetHex = rgbToHex(targetRgb);
  const targetLab = rgbToOklab(targetRgb);

  const distractors = pickDistinct({
    count: config.choiceCount - 1,
    candidate:
      difficulty === 'easy'
        ? (r) => generateRandomRgb(r)
        : (r) => oklabToRgb(sampleShell(targetLab, config.minDelta, config.maxDelta, r)),
    acceptTarget: (d) => d >= config.minDelta && d <= config.maxDelta,
    minPairDelta: config.minPairDelta,
    avoid: [targetLab],
    rng,
  });

  const choices: RoundChoice[] = [
    { id: `target-${targetHex}`, hex: targetHex, isCorrect: true, distanceToTarget: 0 },
    ...distractors.map((d, i) => ({
      id: `choice-${rgbToHex(d.rgb)}-${i}`,
      hex: rgbToHex(d.rgb),
      isCorrect: false,
      distanceToTarget: d.delta,
    })),
  ];

  return shuffle(choices, rng);
}

/**
 * "Closest color" mode: exactly one swatch is clearly nearest to the target.
 * The answer sits at roughly the difficulty's distance; every other swatch is
 * further away by a margin you can see.
 */
export function generateClosestColorChoices(
  targetRgb: RGB,
  difficulty: Difficulty,
  rng: RngFn = Math.random
): RoundChoice[] {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const targetLab = rgbToOklab(targetRgb);

  const [bandMin, bandMax] = config.closestBand;
  const [closest] = pickDistinct({
    count: 1,
    candidate: (r) => oklabToRgb(sampleShell(targetLab, bandMin, bandMax, r)),
    acceptTarget: (d) => d >= bandMin && d <= bandMax,
    minPairDelta: JND,
    avoid: [targetLab],
    rng,
  });

  const floor = closest.delta + config.closestMargin;
  const others = pickDistinct({
    count: config.closestChoiceCount - 1,
    // Mix nearby shells with fully random colors so out-of-gamut targets
    // (very dark/light/saturated) can still be filled.
    candidate: (r) =>
      r() < 0.6 ? oklabToRgb(sampleShell(targetLab, floor, floor + 0.25, r)) : generateRandomRgb(r),
    acceptTarget: (d) => d >= floor,
    minPairDelta: Math.max(config.minPairDelta, 0.05),
    avoid: [targetLab, closest.lab],
    rng,
  });

  const choices: RoundChoice[] = [
    { id: 'closest-true', hex: rgbToHex(closest.rgb), isCorrect: true, distanceToTarget: closest.delta },
    ...others.map((o, i) => ({
        id: `far-${i}`,
        hex: rgbToHex(o.rgb),
        isCorrect: false,
        distanceToTarget: o.delta,
      })),
  ];

  return shuffle(choices, rng);
}

/**
 * Generates options for "Color Name" mode:
 * Curated color database ensures fair, non-overlapping color options.
 */
export function generateColorNameChoices(
  targetHex: string,
  rng: RngFn = Math.random
): { targetColor: typeof CURATED_NAMED_COLORS[0]; choices: string[] } {
  // Find matching or closest target in curated list
  let target = CURATED_NAMED_COLORS.find(
    (c) => c.hex.toLowerCase() === targetHex.toLowerCase()
  );

  if (!target) {
    // Pick random from curated list if target was generic
    target = CURATED_NAMED_COLORS[Math.floor(rng() * CURATED_NAMED_COLORS.length)];
  }

  const choices = [target.name];
  const usedNames = new Set<string>([target.name]);

  // Distractors from other categories where possible to prevent confusion
  const otherColors = CURATED_NAMED_COLORS.filter(
    (c) => c.category !== target!.category && !usedNames.has(c.name)
  );

  while (choices.length < 4 && otherColors.length > 0) {
    const idx = Math.floor(rng() * otherColors.length);
    const chosen = otherColors.splice(idx, 1)[0];
    if (!usedNames.has(chosen.name)) {
      usedNames.add(chosen.name);
      choices.push(chosen.name);
    }
  }

  // Shuffle
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  return { targetColor: target, choices };
}
