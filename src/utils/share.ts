import { SITE } from '../seo/site';
import { trackEvent } from './analytics';

export interface ShareResultOptions {
  modeName: string;
  score: number;
  accuracy: number;
  bestStreak: number;
  roundCount: number;
}

/** Shares the result of a regular (non-daily) game. */
export async function shareGameResult(opts: ShareResultOptions) {
  const text = [
    `${SITE.name} — ${opts.modeName}`,
    `${opts.score.toLocaleString()} points · ${opts.accuracy}% accuracy over ${opts.roundCount} rounds`,
    opts.bestStreak > 1 ? `Best streak: ${opts.bestStreak}` : '',
    'Can you beat it?',
  ]
    .filter(Boolean)
    .join('\n');
  return shareText(text, `${SITE.url}/`, `My ${SITE.name} score`);
}

/** Emoji grid for a finished daily challenge, e.g. 🟩🟩🟥🟩… — no spoilers. */
export function dailyShareText(opts: {
  dateLabel: string;
  results: boolean[];
  score: number;
  streak?: number;
}): string {
  const grid = opts.results.map((ok) => (ok ? '🟩' : '🟥')).join('');
  const correct = opts.results.filter(Boolean).length;
  return [
    `${SITE.name} daily · ${opts.dateLabel}`,
    `${grid} ${correct}/${opts.results.length}`,
    `${opts.score.toLocaleString()} points${opts.streak && opts.streak > 1 ? ` · ${opts.streak}-day streak` : ''}`,
  ].join('\n');
}

/** Shares text + link with the native share sheet, falling back to the clipboard. */
export async function shareText(
  text: string,
  url: string,
  title: string = SITE.name
): Promise<'share' | 'clipboard' | 'failed'> {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      trackEvent('result_shared', { method: 'share' });
      return 'share';
    } catch (err) {
      if ((err as Error).name === 'AbortError') return 'failed';
    }
  }
  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    trackEvent('result_shared', { method: 'clipboard' });
    return 'clipboard';
  } catch {
    return 'failed';
  }
}
