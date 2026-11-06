import { SITE } from '../seo/site';

export interface ShareResultOptions {
  modeName: string;
  score: number;
  accuracy: number;
  bestStreak: number;
  roundCount: number;
}

export async function shareGameResult(
  opts: ShareResultOptions
): Promise<{ success: boolean; method: 'share' | 'clipboard' | 'failed' }> {
  const url = `${SITE.url}/`;
  const text = [
    `${SITE.name} — ${opts.modeName}`,
    `Score: ${opts.score.toLocaleString()}`,
    `Accuracy: ${opts.accuracy}% (${opts.roundCount} rounds)`,
    `Best streak: ${opts.bestStreak}`,
    ``,
    `Can you beat it?`,
  ].join('\n');

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: `My ${SITE.name} score`,
        text,
        url,
      });
      return { success: true, method: 'share' };
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        return { success: false, method: 'failed' };
      }
      // fall through to clipboard
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      return { success: true, method: 'clipboard' };
    } catch {
      return { success: false, method: 'failed' };
    }
  }

  return { success: false, method: 'failed' };
}
