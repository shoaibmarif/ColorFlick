/**
 * SEO metadata for every indexable page.
 *
 * Used in two places:
 *  - at runtime by <SeoMeta> to set <title>, description, canonical, OG tags
 *  - at build time by the prerender plugin in vite.config.ts, which writes a
 *    static HTML file per route (correct <head> for crawlers and link
 *    previews) and generates sitemap.xml.
 *
 * Keep titles under ~60 characters and descriptions around 140-160.
 */
export type ChangeFreq = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RouteMeta {
  path: string;
  /** Page title without the brand suffix (added automatically). */
  title: string;
  description: string;
  /** Short label used in breadcrumbs. */
  label: string;
  /** Visible H1 used in the static (pre-JS) HTML. */
  heading: string;
  changefreq: ChangeFreq;
  priority: number;
  /** Excluded from sitemap and marked noindex (e.g. personal stats). */
  noindex?: boolean;
  /** Parent path for breadcrumbs. Defaults to home. */
  parent?: string;
}

const r = (m: RouteMeta) => m;

export const ROUTES: RouteMeta[] = [
  r({
    path: '/',
    title: 'ColorFlick - Free Color Guessing Game & Daily Color Challenge',
    description:
      'Test your eye for color. Match swatches, guess HEX and RGB codes, mix colors with sliders and play a new puzzle every day. Free, and no sign-up.',
    label: 'Home',
    heading: 'A color guessing game for sharp eyes',
    changefreq: 'daily',
    priority: 1.0,
  }),

  // ── Games ────────────────────────────────────────────────────────────────
  r({
    path: '/color-guessing-game',
    title: 'Color Guessing Game - Find the Matching Swatch',
    description:
      'Play a free color guessing game online. Spot the swatch that exactly matches the target across four difficulty levels, with instant feedback and streaks.',
    label: 'Color guessing game',
    heading: 'Color guessing game',
    changefreq: 'weekly',
    priority: 0.9,
    parent: '/',
  }),
  r({
    path: '/daily-color-challenge',
    title: 'Daily Color Challenge - A New Color Puzzle Every Day',
    description:
      'Ten new color rounds every day, identical for every player. Play today’s daily color challenge, keep your streak alive and share your score.',
    label: 'Daily challenge',
    heading: 'Daily color challenge',
    changefreq: 'daily',
    priority: 0.9,
    parent: '/',
  }),
  r({
    path: '/rgb-color-game',
    title: 'RGB Color Game - Mix Red, Green and Blue to Match',
    description:
      'Recreate the target color by dragging red, green and blue sliders from 0 to 255. A hands-on way to learn additive RGB color mixing.',
    label: 'RGB color game',
    heading: 'RGB color game',
    changefreq: 'weekly',
    priority: 0.85,
    parent: '/color-guessing-game',
  }),
  r({
    path: '/hex-color-game',
    title: 'HEX Color Game - Guess the Hex Code of a Color',
    description:
      'Look at a swatch and type its hex code. Practise reading CSS colors like #3B82F6 and get scored on how close your guess is.',
    label: 'HEX color game',
    heading: 'HEX color game',
    changefreq: 'weekly',
    priority: 0.85,
    parent: '/color-guessing-game',
  }),
  r({
    path: '/color-picker-game',
    title: 'Color Picker Game - Recreate the Color by Eye',
    description:
      'Use a color picker to recreate the target color from memory and see how close you got, measured with the perceptual OKLab color space.',
    label: 'Color picker game',
    heading: 'Color picker game',
    changefreq: 'weekly',
    priority: 0.85,
    parent: '/color-guessing-game',
  }),
  r({
    path: '/color-matching-game',
    title: 'Color Matching Game - Match Colors with HSL Sliders',
    description:
      'Adjust hue, saturation and lightness until your swatch matches the target. A relaxed color matching game that teaches how HSL works.',
    label: 'Color matching game',
    heading: 'Color matching game',
    changefreq: 'weekly',
    priority: 0.85,
    parent: '/color-guessing-game',
  }),
  r({
    path: '/color-theory-game',
    title: 'Color Theory Game - Warm, Cool or Neutral?',
    description:
      'Sort colors into warm, cool and neutral. A quick color theory quiz for designers, artists and students learning color temperature.',
    label: 'Color theory game',
    heading: 'Color theory game',
    changefreq: 'weekly',
    priority: 0.8,
    parent: '/color-guessing-game',
  }),
  r({
    path: '/color-game-timed',
    title: 'Timed Color Game - How Many Colors in 60 Seconds?',
    description:
      'Answer as many color questions as you can before the clock runs out. Choose 30, 60 or 120 seconds and chase your best score.',
    label: 'Timed mode',
    heading: 'Timed color game',
    changefreq: 'weekly',
    priority: 0.8,
    parent: '/color-guessing-game',
  }),
  r({
    path: '/color-game-practice',
    title: 'Color Game Practice Mode - Untimed, With Hints',
    description:
      'Practise color recognition with no timer and no pressure. Hints and explanations help you understand every answer.',
    label: 'Practice mode',
    heading: 'Practice mode',
    changefreq: 'weekly',
    priority: 0.75,
    parent: '/color-guessing-game',
  }),
  r({
    path: '/color-game-for-beginners',
    title: 'Easy Color Game for Beginners and Kids',
    description:
      'A beginner-friendly color game with three clearly different choices per round. A gentle way to start training your eye for color.',
    label: 'Beginner mode',
    heading: 'Color game for beginners',
    changefreq: 'weekly',
    priority: 0.75,
    parent: '/color-guessing-game',
  }),
  ...(['easy', 'medium', 'hard', 'expert'] as const).map((d) =>
    r({
      path: `/color-guessing-game/${d}`,
      title: `Color Guessing Game - ${d[0].toUpperCase()}${d.slice(1)} Difficulty`,
      description: {
        easy: 'Easy color guessing: three choices with clearly different hues. Ideal for warming up or playing with kids.',
        medium: 'Medium color guessing: six choices from the same color family. The standard ColorFlick challenge.',
        hard: 'Hard color guessing: close shades that differ only slightly in hue or lightness. For people with a sharp eye.',
        expert: 'Expert color guessing: near-identical swatches at the edge of human perception. Designers welcome.',
      }[d],
      label: `${d[0].toUpperCase()}${d.slice(1)}`,
      heading: `Color guessing game: ${d} difficulty`,
      changefreq: 'monthly' as const,
      priority: 0.6,
      parent: '/color-guessing-game',
    })
  ),

  // ── Tools ────────────────────────────────────────────────────────────────
  r({
    path: '/color-converter',
    title: 'Color Converter - HEX, RGB and HSL',
    description:
      'Convert colors between HEX, RGB and HSL instantly. Preview tints, shades and the complementary color, then copy any value in one click.',
    label: 'Color converter',
    heading: 'Color converter',
    changefreq: 'monthly',
    priority: 0.85,
    parent: '/',
  }),
  r({
    path: '/rgb-to-hex',
    title: 'RGB to HEX Converter',
    description:
      'Convert RGB values (0-255) to a hex color code instantly. Free online RGB to HEX converter with live preview and one-click copy.',
    label: 'RGB to HEX',
    heading: 'RGB to HEX converter',
    changefreq: 'monthly',
    priority: 0.85,
    parent: '/color-converter',
  }),
  r({
    path: '/hex-to-rgb',
    title: 'HEX to RGB Converter',
    description:
      'Convert any 3- or 6-digit hex color code to RGB and HSL. Free online HEX to RGB converter with live preview and one-click copy.',
    label: 'HEX to RGB',
    heading: 'HEX to RGB converter',
    changefreq: 'monthly',
    priority: 0.85,
    parent: '/color-converter',
  }),
  r({
    path: '/color-contrast-checker',
    title: 'Color Contrast Checker - WCAG AA & AAA',
    description:
      'Check the contrast ratio between text and background colors against WCAG 2.1 AA and AAA for normal text, large text and UI components.',
    label: 'Contrast checker',
    heading: 'Color contrast checker',
    changefreq: 'monthly',
    priority: 0.85,
    parent: '/',
  }),
  r({
    path: '/color-distance',
    title: 'Color Difference Calculator (OKLab ΔE)',
    description:
      'Measure how different two colors look to the human eye using OKLab ΔE, and see why simple RGB distance gets it wrong.',
    label: 'Color distance',
    heading: 'Color difference calculator',
    changefreq: 'monthly',
    priority: 0.75,
    parent: '/',
  }),
  r({
    path: '/color-codes',
    title: 'Web Color Codes - Named CSS Colors with HEX, RGB, HSL',
    description:
      'A searchable list of named CSS colors with their HEX, RGB and HSL values. Click any value to copy it.',
    label: 'Color codes',
    heading: 'Web color codes',
    changefreq: 'monthly',
    priority: 0.75,
    parent: '/',
  }),

  // ── Learn ────────────────────────────────────────────────────────────────
  r({
    path: '/how-to-play',
    title: 'How to Play - Rules, Scoring and Shortcuts',
    description:
      'How ColorFlick works: the game modes, how points and streak bonuses are calculated, difficulty levels and keyboard shortcuts.',
    label: 'How to play',
    heading: 'How to play ColorFlick',
    changefreq: 'monthly',
    priority: 0.7,
    parent: '/',
  }),
  r({
    path: '/color-theory-guide',
    title: 'Color Theory Guide - Color Wheel, Harmonies and Temperature',
    description:
      'A practical introduction to color theory: the color wheel, complementary and analogous harmonies, warm and cool colors, and lightness.',
    label: 'Color theory guide',
    heading: 'Color theory guide',
    changefreq: 'monthly',
    priority: 0.75,
    parent: '/',
  }),
  r({
    path: '/color-theory',
    title: 'Color Science Basics: How We Really See Color',
    description:
      'Why yellow looks brighter than blue, how screen brightness is measured, and why comparing colors by their RGB numbers can mislead you.',
    label: 'Color science basics',
    heading: 'Color science basics',
    changefreq: 'monthly',
    priority: 0.65,
    parent: '/color-theory-guide',
  }),
  r({
    path: '/understanding-rgb',
    title: 'RGB Color Model Explained',
    description:
      'How red, green and blue light combine to make 16.7 million screen colors, what the 0-255 values mean, and how to read rgb() in CSS.',
    label: 'Understanding RGB',
    heading: 'The RGB color model, explained',
    changefreq: 'monthly',
    priority: 0.7,
    parent: '/color-theory-guide',
  }),
  r({
    path: '/understanding-hex-colors',
    title: 'Hex Color Codes Explained',
    description:
      'How hexadecimal color codes work: base-16 digits, the #RRGGBB format, 3-digit shorthand and 8-digit codes with transparency.',
    label: 'Understanding HEX',
    heading: 'Hex color codes, explained',
    changefreq: 'monthly',
    priority: 0.7,
    parent: '/color-theory-guide',
  }),
  r({
    path: '/understanding-hsl',
    title: 'HSL Colors Explained - Hue, Saturation, Lightness',
    description:
      'Why designers like HSL: hue from 0-360°, saturation and lightness from 0-100%, and how to build palettes by changing one value at a time.',
    label: 'Understanding HSL',
    heading: 'HSL colors, explained',
    changefreq: 'monthly',
    priority: 0.7,
    parent: '/color-theory-guide',
  }),
  r({
    path: '/rgb-vs-hex',
    title: 'RGB vs HEX - What’s the Difference?',
    description:
      'RGB and HEX describe the same colors in different notation. Learn how they map to each other and when to use which in CSS.',
    label: 'RGB vs HEX',
    heading: 'RGB vs HEX',
    changefreq: 'monthly',
    priority: 0.65,
    parent: '/color-theory-guide',
  }),
  r({
    path: '/faq',
    title: 'FAQ - Color Guessing Game Questions Answered',
    description:
      'Answers to common questions about ColorFlick: game rules, scoring, the daily challenge, privacy, accessibility and color science.',
    label: 'FAQ',
    heading: 'Frequently asked questions',
    changefreq: 'monthly',
    priority: 0.7,
    parent: '/',
  }),

  // ── Site ─────────────────────────────────────────────────────────────────
  r({
    path: '/statistics',
    title: 'Your Statistics and Achievements',
    description:
      'Your ColorFlick accuracy, best streaks, response times and unlocked achievements. Stored only on this device.',
    label: 'Statistics',
    heading: 'Your statistics',
    changefreq: 'monthly',
    priority: 0.3,
    noindex: true,
    parent: '/',
  }),
  r({
    path: '/about',
    title: 'About ColorFlick',
    description:
      'Why ColorFlick exists, how it measures color difference, and who builds it. A small, privacy-friendly color game that runs in your browser.',
    label: 'About',
    heading: 'About ColorFlick',
    changefreq: 'yearly',
    priority: 0.5,
    parent: '/',
  }),
  r({
    path: '/contact',
    title: 'Contact',
    description: 'Report a bug, suggest a feature or just say hello. Email, LinkedIn and GitHub links for ColorFlick.',
    label: 'Contact',
    heading: 'Contact',
    changefreq: 'yearly',
    priority: 0.4,
    parent: '/',
  }),
  r({
    path: '/privacy',
    title: 'Privacy Policy',
    description:
      'ColorFlick has no accounts and no game server. Your scores stay in your browser. Read what we collect (very little) and why.',
    label: 'Privacy',
    heading: 'Privacy policy',
    changefreq: 'yearly',
    priority: 0.3,
    parent: '/',
  }),
  r({
    path: '/terms',
    title: 'Terms and Conditions',
    description: 'The terms that apply when you use ColorFlick.',
    label: 'Terms',
    heading: 'Terms and conditions',
    changefreq: 'yearly',
    priority: 0.3,
    parent: '/',
  }),
];

/**
 * Old or duplicate URLs that now permanently redirect to a canonical page.
 * These were near-identical copies of other pages, which splits ranking
 * signals and can be treated as doorway pages by search engines.
 */
export const REDIRECTS: Record<string, string> = {
  '/color-guessing-game-online': '/color-guessing-game',
  '/color-game': '/color-guessing-game',
  '/guess-the-color': '/color-guessing-game',
  '/color-challenge': '/color-guessing-game',
  '/color-quiz': '/color-guessing-game',
  '/color-test': '/color-guessing-game',
  '/rgb-color-guessing-game': '/rgb-color-game',
  '/hex-color-guessing-game': '/hex-color-game',
  '/color-match-game': '/color-matching-game',
  '/color-theory-quiz': '/color-theory-game',
  '/color-guessing-game-faq': '/faq',
};

const byPath = new Map(ROUTES.map((m) => [m.path, m]));

export const getRouteMeta = (path: string): RouteMeta | undefined => byPath.get(path);

/** Breadcrumb trail (home → … → page) for a path. */
export const getBreadcrumbs = (path: string): RouteMeta[] => {
  const trail: RouteMeta[] = [];
  let current = byPath.get(path);
  const seen = new Set<string>();
  while (current && !seen.has(current.path)) {
    seen.add(current.path);
    trail.unshift(current);
    current = current.parent ? byPath.get(current.parent) : undefined;
  }
  return trail;
};
