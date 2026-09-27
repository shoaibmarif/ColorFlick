export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is a color guessing game?',
    answer:
      'A color guessing game is an interactive web-based platform that challenges players to identify, match, and reason about colors across multiple scientific modes. Players test their visual perception, RGB mixing intuition, HEX code recognition, temperature perception, and color theory knowledge.',
  },
  {
    question: 'How does RGB work?',
    answer:
      'RGB is the hardware additive color system of screens. Red, Green, and Blue light channels each range from 0 (completely off) to 255 (maximum photon intensity). Blending all three at 255 creates pure white light, while setting all three to 0 produces black, yielding 16,777,216 distinct TrueColor combinations.',
  },
  {
    question: 'What is HEX?',
    answer:
      'HEX is a base-16 hexadecimal representation of 8-bit RGB channels. Written as #RRGGBB, each 2-character pair ranges from 00 (0) to FF (255). Shorthand #RGB (like #4A9) expands automatically to #44AA99.',
  },
  {
    question: 'What is HSL?',
    answer:
      'HSL represents colors along cylindrical coordinates: Hue (an angle from 0° to 360° on the color wheel), Saturation (color purity from 0% gray to 100% full saturation), and Lightness (illumination from 0% pure black to 100% pure white). Designers prefer HSL because creating tints and shades is intuitive.',
  },
  {
    question: 'How does color similarity work?',
    answer:
      'Our similarity engine computes perceptual color distance in the OKLab color space (Ottosson, 2020) rather than naive RGB Euclidean math. OKLab models human retinal cone responses (LMS), accounting for the human eye’s heightened sensitivity to green wavelengths compared to blue.',
  },
  {
    question: 'How is the score calculated?',
    answer:
      'Points are awarded based on: Base Score (100 pts) × Difficulty Multiplier (Easy 1.0x, Medium 1.25x, Hard 1.5x, Expert 2.0x) + Speed Bonus (up to +100 pts for sub-second answers) + Streak Multiplier (up to 2.0x for consecutive correct answers). Exact matches earn a Perfect Match bonus.',
  },
  {
    question: 'Is the game free?',
    answer:
      'Yes, the game is 100% free with no paywalls, hidden microtransactions, or subscription tiers.',
  },
  {
    question: 'Does the game require an account?',
    answer:
      'No. The application is completely frontend-only and requires no account registration, login credentials, or personal email address. You can jump directly into playing.',
  },
  {
    question: 'Are my statistics stored online?',
    answer:
      'No. All stats, round history, personal records, and unlocked achievements are persisted strictly on your own device inside the browser\'s localStorage. Nothing is ever sent to or stored on an external server.',
  },
  {
    question: 'Can I play on mobile?',
    answer:
      'Yes! The interface is built mobile-first with touch-friendly 44px+ hit targets, adaptive vertical card stacks, fluid typography, and support for installable PWA mode on iOS and Android.',
  },
  {
    question: 'What is the daily color challenge?',
    answer:
      'The Daily Color Challenge generates a deterministic 10-round set of color puzzles each midnight using a seeded pseudo-random generator keyed to the current calendar date (YYYY-MM-DD). Every player worldwide gets the exact same questions each day.',
  },
  {
    question: 'How does the color picker challenge work?',
    answer:
      'In Color Picker mode, you view a target color and use an interactive color palette or RGB/HSL sliders to manually recreate that color. Live similarity feedback displays your precision, and target values are revealed only upon submission.',
  },
  {
    question: 'How accurate is color matching?',
    answer:
      'Visual color matching is calibrated to Delta E distances in OKLab color space. While screen calibration and ambient room lighting can slightly influence visual perception, the underlying mathematical comparisons are 100% reproducible and objective.',
  },
  {
    question: 'Can colorblind users play?',
    answer:
      'Yes! The game features dedicated Colorblind Assistance settings (supporting Protanopia, Deuteranopia, and Tritanopia simulations), High Contrast borders, letter/number labels (A, B, C, D), and distinct icons so gameplay never relies on color recognition alone.',
  },
];
