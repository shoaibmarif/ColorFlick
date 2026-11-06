export interface NavItem {
  to: string;
  label: string;
  desc?: string;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'play',
    label: 'Play',
    items: [
      { to: '/color-guessing-game', label: 'Color guessing game', desc: 'Find the swatch that matches' },
      { to: '/rgb-color-game', label: 'RGB mixer', desc: 'Match with red, green and blue sliders' },
      { to: '/hex-color-game', label: 'HEX code', desc: 'Guess the hex code of a color' },
      { to: '/color-matching-game', label: 'HSL matcher', desc: 'Hue, saturation and lightness' },
      { to: '/color-picker-game', label: 'Color picker', desc: 'Recreate a color by eye' },
      { to: '/color-theory-game', label: 'Warm or cool', desc: 'Sort colors by temperature' },
      { to: '/color-game-timed', label: 'Timed mode', desc: 'Beat the clock' },
      { to: '/color-game-for-beginners', label: 'Beginner mode', desc: 'Three clear choices' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      { to: '/color-converter', label: 'Color converter', desc: 'HEX, RGB and HSL' },
      { to: '/color-contrast-checker', label: 'Contrast checker', desc: 'WCAG AA and AAA' },
      { to: '/color-distance', label: 'Color difference', desc: 'Perceptual OKLab ΔE' },
      { to: '/color-codes', label: 'Web color codes', desc: 'Named CSS colors' },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    items: [
      { to: '/how-to-play', label: 'How to play', desc: 'Rules, scoring and shortcuts' },
      { to: '/color-theory-guide', label: 'Color theory guide', desc: 'Wheel, harmonies, temperature' },
      { to: '/understanding-rgb', label: 'RGB explained' },
      { to: '/understanding-hex-colors', label: 'HEX explained' },
      { to: '/understanding-hsl', label: 'HSL explained' },
      { to: '/faq', label: 'FAQ' },
    ],
  },
];

export const SITE_LINKS: NavItem[] = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
];
