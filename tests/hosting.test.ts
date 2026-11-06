import { describe, it, expect } from 'vitest';
import { REDIRECTS, ROUTES } from '../src/seo/routes';
import vercel from '../vercel.json';

describe('vercel.json', () => {
  it('has a permanent redirect for every retired URL in src/seo/routes.ts', () => {
    const fromConfig = Object.fromEntries(
      vercel.redirects.map((r: { source: string; destination: string }) => [r.source, r.destination])
    );
    expect(fromConfig).toEqual(REDIRECTS);
    for (const r of vercel.redirects) expect(r.permanent).toBe(true);
  });

  it('never redirects a live page', () => {
    const live = new Set(ROUTES.map((r) => r.path));
    for (const from of Object.keys(REDIRECTS)) expect(live.has(from)).toBe(false);
    for (const to of Object.values(REDIRECTS)) expect(live.has(to)).toBe(true);
  });
});
