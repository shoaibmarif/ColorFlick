import { GameMode, Difficulty } from '../types/game';
import { DIFFICULTY_CONFIGS } from '../utils/randomColor';
import { SCORING, DIFFICULTY_BONUSES } from '../utils/scoring';

export interface ModeGuide {
  title: string;
  /** One-sentence summary under the title. */
  intro: string;
  /** How a round works. */
  howTo: string[];
  /** What counts as correct / how it's scored. */
  scoring: string;
  /** Short practical tips. */
  tips: string[];
  /** Whether difficulty changes the number of swatches shown. */
  usesChoiceCount?: 'exact' | 'closest';
  /** Further reading. */
  learnMore?: { to: string; label: string };
}

const pct = SCORING.codeGuessTolerancePct;
const pass = SCORING.sliderPassSimilarityPct;

export const MODE_GUIDES: Record<GameMode, ModeGuide> = {
  'exact-color': {
    title: 'Color guessing game',
    intro: 'One of the swatches is exactly the same color as the target. Find it.',
    howTo: [
      'Look at the large target swatch at the top.',
      'Pick the one that matches. Click it, tap it, or press its number key.',
      'Only one is an exact match. The rest are close, but you can see the difference if you look carefully.',
    ],
    scoring: 'Get it right to score. Get it wrong and your streak starts again from zero.',
    tips: [
      'Check lightness before hue. Most wrong picks are just a touch too light or too dark.',
      'Compare swatches that sit next to each other. Tiny differences are much easier to spot side by side.',
    ],
    usesChoiceCount: 'exact',
    learnMore: { to: '/color-theory-guide', label: 'Color theory guide' },
  },
  'rgb-guess': {
    title: 'RGB mixer',
    intro: 'Mix red, green and blue until your color matches the target.',
    howTo: [
      'Drag the three sliders (each goes from 0 to 255).',
      'Submit when you’re happy with it. You only get one try per round.',
    ],
    scoring: `Your guess counts as correct within ${pct}% of the target. Closer guesses earn more points.`,
    tips: [
      'Find the strongest channel first, then fine-tune the other two.',
      'If all three sliders are equal, you’ll always get a gray.',
    ],
    learnMore: { to: '/understanding-rgb', label: 'RGB explained' },
  },
  'hex-guess': {
    title: 'HEX code',
    intro: 'Look at the color and type its hex code. Close counts.',
    howTo: [
      'Type a 3- or 6-digit hex code, such as #3B6 or #3366BB.',
      'Press Enter when you’re ready.',
    ],
    scoring: `Your guess counts as correct within ${pct}% of the target. Closer guesses earn more points.`,
    tips: [
      'The code is three pairs: red, green, blue. 00 means none, FF means full.',
      'Start with a rough three-digit guess like #48C, then adjust.',
    ],
    learnMore: { to: '/understanding-hex-colors', label: 'Hex codes explained' },
  },
  'color-picker': {
    title: 'Color picker',
    intro: 'Use the color picker to recreate the target as closely as you can.',
    howTo: [
      'Choose the hue first, then drag inside the square to set how strong and how bright it is.',
      'Submit when your swatch matches the target.',
    ],
    scoring: `Counts as correct at ${pass}% similarity or higher. Points scale with how close you get.`,
    tips: ['Try squinting. It makes lightness easier to judge.'],
    learnMore: { to: '/color-distance', label: 'How similarity is measured' },
  },
  'color-match': {
    title: 'HSL matcher',
    intro: 'Match the target using hue, saturation and lightness sliders.',
    howTo: [
      'Set the hue first (which color), then saturation (how strong), then lightness.',
      'Submit when your swatch matches the target.',
    ],
    scoring: `Counts as correct at ${pass}% similarity or higher. Points scale with how close you get.`,
    tips: ['Move one slider at a time. It’s much easier to see what each one is doing.'],
    learnMore: { to: '/understanding-hsl', label: 'HSL explained' },
  },
  'color-name': {
    title: 'Color name',
    intro: 'Pick the name that fits the color.',
    howTo: ['You get four names. Choose the one that describes the swatch.'],
    scoring: 'Get it right to score. A wrong answer resets your streak.',
    tips: ['The wrong names come from other color families, so start by asking yourself which family it’s in.'],
    learnMore: { to: '/color-codes', label: 'Web color names' },
  },
  'warm-cool': {
    title: 'Warm or cool',
    intro: 'Is the color warm, cool or neutral?',
    howTo: [
      'Warm: reds, oranges, yellows and warm pinks.',
      'Cool: greens, cyans, blues and violets.',
      'Neutral: grays, near-blacks, near-whites, and hues right on the border.',
    ],
    scoring: 'A correct pick scores points. After each answer you’ll see why the color belongs where it does.',
    tips: ['Very pale or very dark colors count as neutral, even with a slight tint.'],
    learnMore: { to: '/color-theory-guide', label: 'Warm and cool colors' },
  },
  'light-dark': {
    title: 'Light or dark',
    intro: 'Is the color light or dark?',
    howTo: [
      'Answer Light or Dark for each swatch.',
      'We decide using relative luminance, the same brightness measure used to check text contrast.',
    ],
    scoring: 'A correct pick scores points. After each answer you’ll see the color’s luminance.',
    tips: ['Yellows and greens look brighter than blues, even when the numbers say otherwise. Your eyes are most sensitive to green.'],
    learnMore: { to: '/color-contrast-checker', label: 'Contrast checker' },
  },
  'closest-color': {
    title: 'Closest color',
    intro: 'None of the swatches match exactly. Pick the one that looks closest.',
    howTo: [
      'Compare each swatch with the target.',
      'One is always clearly nearer than the others.',
    ],
    scoring: 'Get it right to score. A wrong answer resets your streak.',
    tips: ['Rule out the obvious misses first, then compare what’s left.'],
    usesChoiceCount: 'closest',
    learnMore: { to: '/color-distance', label: 'How color distance works' },
  },
};

export const DIFFICULTY_ORDER: Difficulty[] = ['easy', 'medium', 'hard', 'expert'];

export const difficultyLabel = (d: Difficulty) => d[0].toUpperCase() + d.slice(1);

/** e.g. "6 swatches" for a mode/difficulty, read from the generator config. */
export const choiceCountFor = (guide: ModeGuide, d: Difficulty): number | null => {
  if (guide.usesChoiceCount === 'exact') return DIFFICULTY_CONFIGS[d].choiceCount;
  if (guide.usesChoiceCount === 'closest') return DIFFICULTY_CONFIGS[d].closestChoiceCount;
  return null;
};

export const SCORING_SUMMARY = [
  `${SCORING.base} points for every correct answer.`,
  `A difficulty bonus: ${(['easy', 'medium', 'hard', 'expert'] as Difficulty[]).map((d) => `${d[0].toUpperCase()}${d.slice(1)} +${DIFFICULTY_BONUSES[d]}`).join(', ')}.`,
  `A speed bonus of up to ${SCORING.maxSpeedBonus} points: full marks within ${SCORING.fullSpeedMs / 1000} second, nothing after ${SCORING.zeroSpeedMs / 1000} seconds.`,
  `A streak bonus of ${SCORING.streakBonusPerLevel} points for each correct answer in a row, up to ${SCORING.maxStreakBonus}.`,
  `In slider and typing modes the total is scaled by how close you were (never below ${SCORING.minAccuracyMultiplier * 100}%).`,
];
