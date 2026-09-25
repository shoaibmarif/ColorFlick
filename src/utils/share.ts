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
  const url = typeof window !== 'undefined' ? window.location.origin : 'https://colorguess.game';
  const text = [
    `🎨 Color Guessing Game`,
    `Mode: ${opts.modeName}`,
    `Score: ${opts.score.toLocaleString()}`,
    `Accuracy: ${opts.accuracy}% (${opts.roundCount} rounds)`,
    `Best Streak: 🔥 ${opts.bestStreak}`,
    ``,
    `Can you beat my score?`,
    url,
  ].join('\n');

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: 'Color Guessing Game Score',
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
      await navigator.clipboard.writeText(text);
      return { success: true, method: 'clipboard' };
    } catch {
      return { success: false, method: 'failed' };
    }
  }

  return { success: false, method: 'failed' };
}
