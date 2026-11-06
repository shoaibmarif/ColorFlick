import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { ROUTES, RouteMeta } from '../src/seo/routes';
import { buildHead, headToHtml, gameJsonLd } from '../src/seo/head';
import { SITE, absoluteUrl } from '../src/seo/site';
import { FAQ_ITEMS } from '../src/data/faqData';

const HEAD_MARK = '<!--seo-head-->';
const BODY_MARK = '<!--seo-body-->';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const GAME_PATHS = new Set([
  '/color-guessing-game',
  '/daily-color-challenge',
  '/rgb-color-game',
  '/hex-color-game',
  '/color-picker-game',
  '/color-matching-game',
  '/color-theory-game',
  '/color-game-timed',
  '/color-game-practice',
  '/color-game-for-beginners',
]);

const NAV_LINKS = [
  '/color-guessing-game',
  '/daily-color-challenge',
  '/color-converter',
  '/color-contrast-checker',
  '/color-theory-guide',
  '/faq',
];

/**
 * Lightweight static content shown before the app boots (and to crawlers that
 * don't run JavaScript). React replaces it on mount.
 */
const staticBody = (route: RouteMeta) => {
  const links = NAV_LINKS.filter((p) => p !== route.path)
    .map((p) => ROUTES.find((r) => r.path === p)!)
    .map((r) => `<li><a href="${r.path}">${esc(r.label)}</a></li>`)
    .join('');
  return `<div style="max-width:42rem;margin:0 auto;padding:6rem 1rem;font-family:Poppins,system-ui,sans-serif;color:#3f3f46">
      <p style="font-weight:600;color:#18181b"><a href="/" style="color:inherit;text-decoration:none">${SITE.name}</a></p>
      <h1 style="font-size:2rem;line-height:1.2;color:#18181b;margin:1rem 0">${esc(route.heading)}</h1>
      <p style="line-height:1.6">${esc(route.description)}</p>
      <ul style="margin-top:1.5rem;line-height:1.9">${links}</ul>
    </div>`;
};

const faqJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});

const renderPage = (template: string, route: RouteMeta) => {
  const extra = GAME_PATHS.has(route.path)
    ? [gameJsonLd(route.path, route.title, route.description)]
    : route.path === '/faq'
    ? [faqJsonLd()]
    : [];
  return template
    .replace(HEAD_MARK, headToHtml(buildHead(route, extra)))
    .replace(BODY_MARK, staticBody(route));
};

const render404 = (template: string) =>
  template
    .replace(
      HEAD_MARK,
      `<title>Page not found | ${SITE.name}</title>\n    <meta name="robots" content="noindex, follow" />`
    )
    .replace(BODY_MARK, '');

const sitemap = (lastmod: string) => {
  const urls = ROUTES.filter((r) => !r.noindex)
    .map(
      (r) =>
        `  <url>\n    <loc>${absoluteUrl(r.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

const robots = () =>
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`;

export function seoPlugin(): Plugin {
  let outDir = '';
  return {
    name: 'colorflick-seo',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        // In dev, inject the home page head so the page has sane tags.
        if (ctx.server) {
          const home = ROUTES.find((r) => r.path === '/')!;
          return html.replace(HEAD_MARK, headToHtml(buildHead(home))).replace(BODY_MARK, '');
        }
        return html;
      },
    },
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      if (!outDir) return;
      const indexPath = path.join(outDir, 'index.html');
      if (!fs.existsSync(indexPath)) return;
      const template = fs.readFileSync(indexPath, 'utf8');
      if (!template.includes(HEAD_MARK)) return; // already processed

      const write = (file: string, content: string) => {
        const full = path.join(outDir, file);
        fs.mkdirSync(path.dirname(full), { recursive: true });
        fs.writeFileSync(full, content);
      };

      for (const route of ROUTES) {
        write(route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`, renderPage(template, route));
      }

      const lastmod = new Date().toISOString().slice(0, 10);
      write('404.html', render404(template));
      write('sitemap.xml', sitemap(lastmod));
      write('robots.txt', robots());
    },
  };
}
