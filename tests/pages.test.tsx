// @vitest-environment jsdom
import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ROUTES } from '../src/seo/routes';
import { App } from '../src/App';

beforeAll(() => {
  // jsdom lacks these browser APIs.
  window.matchMedia ??= ((q: string) => ({
    matches: false,
    media: q,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    onchange: null,
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
  window.scrollTo = () => {};
  Element.prototype.scrollIntoView = () => {};
});

afterEach(cleanup);

describe('every page renders', () => {
  for (const route of ROUTES) {
    it(`${route.path} renders its heading and SEO tags`, async () => {
      window.history.pushState({}, '', route.path);
      render(<App />);
      const h1 = await screen.findByRole('heading', { level: 1 }, { timeout: 5000 });
      expect(h1.textContent?.length).toBeGreaterThan(0);
      // <SeoMeta> sets the title from the route registry.
      await new Promise((r) => setTimeout(r, 0));
      expect(document.title).toContain(route.title.split(' — ')[0].split(' | ')[0]);
      expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toMatch(
        new RegExp(`${route.path === '/' ? '/$' : route.path.replace(/\//g, '\\/') + '$'}`)
      );
    });
  }

  it('unknown URLs show the 404 page with noindex', async () => {
    window.history.pushState({}, '', '/definitely-not-a-page');
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: /doesn’t exist/ })).toBeTruthy();
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain('noindex');
  });
});
