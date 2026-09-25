export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is a color guessing game?',
    answer:
      'A color guessing game is an interactive browser-based puzzle where players are challenged to identify, match, or predict color values. Players test their visual perception and color theory knowledge across multiple modes including Exact Color matching, RGB channel mixing, HEX code guessing, and color temperature classification.',
  },
  {
    question: 'How do I play?',
    answer:
      'In each round, a central target color swatch is displayed. Depending on the selected mode, choose the matching swatch from multiple cards, adjust the Red, Green, and Blue sliders to recreate it, or enter its 3-digit or 6-digit hex code. Correct answers award points and build streaks.',
  },
  {
    question: 'What is RGB?',
    answer:
      'RGB stands for Red, Green, and Blue, which are the primary colors of additive light used by computer displays and phone screens. Each channel has an 8-bit integer value ranging from 0 (no light) to 255 (full intensity), combining to produce over 16.7 million distinct colors.',
  },
  {
    question: 'What is HEX?',
    answer:
      'HEX is a hexadecimal (base-16) representation of an RGB color. It consists of a hash sign followed by six characters (#RRGGBB), where each pair of characters represents the intensity of Red, Green, and Blue respectively from 00 (0) to FF (255). Shorthand 3-digit hex codes (like #FFF) double each digit (#FFFFFF).',
  },
  {
    question: 'How does the color matching mode work?',
    answer:
      'In Exact Color mode, you are presented with a target color and 3 to 12 candidate swatches depending on difficulty. Candidate distractors are mathematically chosen within strict perceptual distance boundaries to ensure challenges are fair and never ambiguous.',
  },
  {
    question: 'How is color distance calculated?',
    answer:
      'Color distance is calculated in the OKLab color space, developed by Björn Ottosson in 2020. Unlike raw RGB Euclidean distance, OKLab accounts for human eye sensitivity to green wavelengths versus blue wavelengths, producing a uniform perceptual difference measure (Delta E).',
  },
  {
    question: 'Can I play on mobile?',
    answer:
      'Yes! ColorGuess is designed mobile-first. Large responsive touch cards, swipeable controls, and an installable Progressive Web App (PWA) manifest allow full standalone gameplay on iOS and Android devices without horizontal scroll.',
  },
  {
    question: 'Does the game require an account?',
    answer:
      'No. The application is 100% frontend-only and requires no account registration, login credentials, or email address. You can begin playing immediately upon opening the page.',
  },
  {
    question: 'Are my scores stored online?',
    answer:
      'No. Scores, round history, personal bests, and unlocked achievements are saved exclusively in your browser\'s private localStorage on your local device. We run no database or tracking servers.',
  },
  {
    question: 'What is the Daily Color Challenge?',
    answer:
      'The Daily Color Challenge is a deterministic 10-round puzzle seeded with the calendar date (YYYY-MM-DD). Every player in the world receives the exact same color questions. Refreshing the browser preserves your score and prevents multiple attempts on the same day.',
  },
  {
    question: 'How is the score calculated?',
    answer:
      'Scores consist of 100 Base Points for a correct answer, plus a Difficulty Bonus (+0 for Easy, +50 for Medium, +100 for Hard, +180 for Expert), a Speed Bonus of up to +100 points for responses under 5 seconds, and a Streak Bonus of +15 points per active streak level.',
  },
  {
    question: 'Does the game support color accessibility?',
    answer:
      'Yes. The game strictly avoids color-only indicators by pairing all states with distinct icons (checkmarks, crosses), readable text labels, keyboard shortcuts, and ARIA live screen reader announcements. An optional Enhanced Accessibility setting adds micro-patterns and high-contrast borders.',
  },
  {
    question: 'Can color display vary between devices?',
    answer:
      'Yes. Slight visual differences can occur across hardware due to varying display gamuts (sRGB vs Display P3), screen brightness, ambient lighting, Night Shift / True Tone settings, and device calibration.',
  },
];
