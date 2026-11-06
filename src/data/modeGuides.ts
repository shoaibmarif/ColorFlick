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
    intro: 'Find the one swatch that is exactly the same color as the target.',
    howTo: [
      'Look at the large target swatch at the top.',
      'Pick the matching swatch below it — click, tap, or press its number key.',
      'Only one swatch is an exact match; the others are close but visibly different.',
    ],
    scoring: 'A correct pick scores points; a wrong pick scores nothing and resets your streak.',
    tips: [
      'Compare lightness first, then hue — most misses are a shade too light or too dark.',
      'Look at the edge where two swatches meet; small differences are easier to see side by side.',
    ],
    usesChoiceCount: 'exact',
    learnMore: { to: '/color-theory-guide', label: 'Color theory guide' },
  },
  'rgb-guess': {
    title: 'RGB mixer',
    intro: 'Recreate the target by mixing red, green and blue light.',
    howTo: [
      'Drag the red, green and blue sliders (0–255) until your color matches.',
      'Submit when you are happy — you get one try per round.',
    ],
    scoring: `Your guess counts as correct within ${pct}% of the target. Closer guesses earn more points.`,
    tips: [
      'Get the brightest channel right first, then adjust the other two.',
      'Equal amounts of all three channels always make a gray.',
    ],
    learnMore: { to: '/understanding-rgb', label: 'RGB explained' },
  },
  'hex-guess': {
    title: 'HEX code',
    intro: 'Look at a color and type its hex code.',
    howTo: [
      'Type a 3- or 6-digit hex code, such as #3B6 or #3366BB.',
      'Press Enter to submit.',
    ],
    scoring: `Your guess counts as correct within ${pct}% of the target. Closer guesses earn more points.`,
    tips: [
      'Each pair of digits is one channel: #RRGGBB. 00 is none, FF is full.',
      'Start with a rough shorthand like #48C, then refine.',
    ],
    learnMore: { to: '/understanding-hex-colors', label: 'Hex codes explained' },
  },
  'color-picker': {
    title: 'Color picker',
    intro: 'Recreate the target color with a color picker.',
    howTo: [
      'Pick a hue, then drag in the square to set saturation and brightness.',
      'Submit when your swatch matches the target.',
    ],
    scoring: `Counts as correct at ${pass}% similarity or higher. Points scale with how close you get.`,
    tips: ['Squint: it helps you judge overall lightness without being distracted by hue.'],
    learnMore: { to: '/color-distance', label: 'How similarity is measured' },
  },
  'color-match': {
    title: 'HSL matcher',
    intro: 'Match the target by adjusting hue, saturation and lightness.',
    howTo: [
      'Set the hue first (which color), then saturation (how vivid), then lightness.',
      'Submit when your swatch matches the target.',
    ],
    scoring: `Counts as correct at ${pass}% similarity or higher. Points scale with how close you get.`,
    tips: ['Changing one slider at a time makes it much easier to see what each one does.'],
    learnMore: { to: '/understanding-hsl', label: 'HSL explained' },
  },
  'color-name': {
    title: 'Color name',
    intro: 'Choose the name that best describes the color.',
    howTo: ['Read the four names and pick the one that matches the swatch.'],
    scoring: 'A correct pick scores points; a wrong pick resets your streak.',
    tips: ['Wrong answers come from different color families, so think “which family?” first.'],
    learnMore: { to: '/color-codes', label: 'Web color names' },
  },
  'warm-cool': {
    title: 'Warm or cool',
    intro: 'Decide whether a color is warm, cool or neutral.',
    howTo: [
      'Warm: reds, oranges, yellows and warm pinks.',
      'Cool: greens, cyans, blues and violets.',
      'Neutral: grays, near-black, near-white, and hues right on the warm/cool border.',
    ],
    scoring: 'A correct pick scores points. After each answer you’ll see why the color belongs where it does.',
    tips: ['Very pale or very dark colors count as neutral even if they have a slight tint.'],
    learnMore: { to: '/color-theory-guide', label: 'Warm and cool colors' },
  },
  'light-dark': {
    title: 'Light or dark',
    intro: 'Decide whether a color is light or dark.',
    howTo: [
      'Answer “Light” or “Dark” for each swatch.',
      'The answer uses WCAG relative luminance — the same measure used to check text contrast.',
    ],
    scoring: 'A correct pick scores points. After each answer you’ll see the color’s luminance.',
    tips: ['Yellows and greens look lighter than blues at the same “lightness” — your eye is most sensitive to green.'],
    learnMore: { to: '/color-contrast-checker', label: 'Contrast checker' },
  },
  'closest-color': {
    title: 'Closest color',
    intro: 'None of the swatches match exactly — pick the one that looks closest.',
    howTo: [
      'Compare each swatch with the target.',
      'Exactly one is clearly nearer than the rest.',
    ],
    scoring: 'A correct pick scores points; a wrong pick resets your streak.',
    tips: ['Rule out the obvious misses first, then compare the remaining two.'],
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
  `A speed bonus of up to ${SCORING.maxSpeedBonus} points — full marks within ${SCORING.fullSpeedMs / 1000} second, nothing after ${SCORING.zeroSpeedMs / 1000} seconds.`,
  `A streak bonus of ${SCORING.streakBonusPerLevel} points for each correct answer in a row, up to ${SCORING.maxStreakBonus}.`,
  `In slider and typing modes the total is scaled by how close you were (never below ${SCORING.minAccuracyMultiplier * 100}%).`,
];
