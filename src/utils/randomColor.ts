import { RGB } from '../types/color';
import { Difficulty, RoundChoice } from '../types/game';
import { hslToRgb, rgbToHex, rgbToHsl, hexToRgb } from './colorConversion';
import { oklabDistance } from './colorDistance';
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
 * Difficulty distance thresholds in OKLab color space:
 * - minDistance: Minimum perceptual difference so choices aren't duplicates
 * - maxDistance: Maximum perceptual difference to keep choices challenging
 * - choiceCount: Number of choices presented
 */
interface DifficultyConfig {
  choiceCount: number;
  minDelta: number;
  maxDelta: number;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    choiceCount: 4,
    minDelta: 0.22,
    maxDelta: 0.50,
  },
  medium: {
    choiceCount: 6,
    minDelta: 0.12,
    maxDelta: 0.25,
  },
  hard: {
    choiceCount: 8,
    minDelta: 0.06,
    maxDelta: 0.14,
  },
  expert: {
    choiceCount: 9,
    minDelta: 0.025,
    maxDelta: 0.06,
  },
};

/**
 * Generates distractors for "Exact Color" matching mode.
 */
export function generateExactColorChoices(
  targetRgb: RGB,
  difficulty: Difficulty,
  rng: RngFn = Math.random
): RoundChoice[] {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const targetHex = rgbToHex(targetRgb);
  const targetHsl = rgbToHsl(targetRgb);

  const choices: RoundChoice[] = [
    {
      id: `target-${targetHex}`,
      hex: targetHex,
      isCorrect: true,
      distanceToTarget: 0,
    },
  ];

  const usedHexes = new Set<string>([targetHex]);
  let attempts = 0;

  while (choices.length < config.choiceCount && attempts < 200) {
    attempts++;

    let candidateRgb: RGB;

    if (difficulty === 'expert') {
      // Very slight variation in hue, saturation, or lightness
      const hDelta = (rng() * 2 - 1) * 8;
      const sDelta = (rng() * 2 - 1) * 8;
      const lDelta = (rng() * 2 - 1) * 6;
      const newH = (targetHsl.h + hDelta + 360) % 360;
      const newS = Math.max(10, Math.min(100, targetHsl.s + sDelta));
      const newL = Math.max(15, Math.min(85, targetHsl.l + lDelta));
      candidateRgb = hslToRgb({ h: newH, s: newS, l: newL });
    } else if (difficulty === 'hard') {
      const hDelta = (rng() * 2 - 1) * 20;
      const sDelta = (rng() * 2 - 1) * 15;
      const lDelta = (rng() * 2 - 1) * 12;
      const newH = (targetHsl.h + hDelta + 360) % 360;
      const newS = Math.max(10, Math.min(100, targetHsl.s + sDelta));
      const newL = Math.max(15, Math.min(85, targetHsl.l + lDelta));
      candidateRgb = hslToRgb({ h: newH, s: newS, l: newL });
    } else if (difficulty === 'medium') {
      const hDelta = (rng() * 2 - 1) * 45;
      const sDelta = (rng() * 2 - 1) * 25;
      const lDelta = (rng() * 2 - 1) * 20;
      const newH = (targetHsl.h + hDelta + 360) % 360;
      const newS = Math.max(15, Math.min(95, targetHsl.s + sDelta));
      const newL = Math.max(20, Math.min(80, targetHsl.l + lDelta));
      candidateRgb = hslToRgb({ h: newH, s: newS, l: newL });
    } else {
      // Easy: Generate clearly distinct colors
      candidateRgb = generateRandomRgb(rng);
    }

    const hex = rgbToHex(candidateRgb);
    if (usedHexes.has(hex)) continue;

    const delta = oklabDistance(targetRgb, candidateRgb);

    // Verify delta falls within difficulty bounds
    if (delta < config.minDelta || delta > config.maxDelta + 0.1) {
      if (difficulty !== 'easy' || delta < config.minDelta) {
        continue;
      }
    }

    // Ensure it's also sufficiently distant from already chosen distractors
    const tooCloseToOther = choices.some((c) => {
      const existingRgb = hexToRgb(c.hex);
      return existingRgb ? oklabDistance(candidateRgb, existingRgb) < config.minDelta * 0.4 : false;
    });
    if (tooCloseToOther && choices.length > 2) {
      // allow some flexibility if attempts are high
      if (attempts < 100) continue;
    }

    usedHexes.add(hex);
    choices.push({
      id: `choice-${hex}-${choices.length}`,
      hex,
      isCorrect: false,
      distanceToTarget: delta,
    });
  }

  // Shuffle choices deterministically if custom rng is provided
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  return choices;
}

/**
 * Generates questions for "Closest Color" mode:
 * Exactly one distractor is demonstrably closest to the target.
 */
export function generateClosestColorChoices(
  targetRgb: RGB,
  difficulty: Difficulty,
  rng: RngFn = Math.random
): RoundChoice[] {
  const count = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  const targetHsl = rgbToHsl(targetRgb);

  // Candidate 1: The closest one
  const closeDeltaH = (rng() * 2 - 1) * (difficulty === 'expert' ? 6 : 14);
  const closeRgb = hslToRgb({
    h: (targetHsl.h + closeDeltaH + 360) % 360,
    s: Math.max(20, Math.min(90, targetHsl.s + (rng() * 2 - 1) * 8)),
    l: Math.max(25, Math.min(75, targetHsl.l + (rng() * 2 - 1) * 6)),
  });
  const closestDist = oklabDistance(targetRgb, closeRgb);

  const choices: RoundChoice[] = [
    {
      id: 'closest-true',
      hex: rgbToHex(closeRgb),
      isCorrect: true,
      distanceToTarget: closestDist,
    },
  ];

  // Candidates 2..N: Clearly further away
  const usedHex = new Set<string>([choices[0].hex, rgbToHex(targetRgb)]);
  let attempts = 0;

  while (choices.length < count && attempts < 100) {
    attempts++;
    const farDeltaH = (rng() * 2 - 1) * 60 + (rng() > 0.5 ? 40 : -40);
    const candidateRgb = hslToRgb({
      h: (targetHsl.h + farDeltaH + 360) % 360,
      s: randomInt(30, 90, rng),
      l: randomInt(25, 75, rng),
    });
    const dist = oklabDistance(targetRgb, candidateRgb);

    // Must be noticeably further than the closest color
    const margin = difficulty === 'expert' ? 0.03 : 0.08;
    if (dist <= closestDist + margin) continue;

    const hex = rgbToHex(candidateRgb);
    if (usedHex.has(hex)) continue;

    usedHex.add(hex);
    choices.push({
      id: `far-${choices.length}`,
      hex,
      isCorrect: false,
      distanceToTarget: dist,
    });
  }

  // Shuffle
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  return choices;
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
