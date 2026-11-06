/**
 * Single source of truth for brand + deployment details.
 * Change SITE_URL here if the production domain changes; every canonical URL,
 * sitemap entry, Open Graph tag and structured-data block derives from it.
 */
export const SITE = {
  name: 'ColorFlick',
  url: 'https://colorflick.vercel.app',
  tagline: 'The free color guessing game',
  defaultDescription:
    'ColorFlick is a free color guessing game. Match swatches, guess HEX and RGB codes, mix colors with sliders and play a new daily challenge. No sign-up, no ads.',
  locale: 'en_US',
  themeColor: '#18181b',
  ogImage: '/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'ColorFlick — a free color guessing game with daily challenges',
  author: {
    name: 'Shoaib Arif',
    url: 'https://shoaibarif.vercel.app/',
    github: 'https://github.com/shoaibmarif',
    linkedin: 'https://www.linkedin.com/in/shoaibmarif/',
    email: 'shoaibmuhammadarif@gmail.com',
  },
  repo: 'https://github.com/shoaibmarif/colorflick',
  issues: 'https://github.com/shoaibmarif/colorflick/issues',
} as const;

export const absoluteUrl = (path: string): string =>
  path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`;
