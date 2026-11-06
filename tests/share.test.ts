import { describe, it, expect } from 'vitest';
import { dailyShareText } from '../src/utils/share';

describe('dailyShareText', () => {
  it('renders one square per round and the correct count, without revealing colors', () => {
    const text = dailyShareText({
      dateLabel: 'Nov 6, 2026',
      results: [true, true, false, true, true, true, true, false, true, true],
      score: 1840,
      streak: 3,
    });
    expect(text).toContain('🟩🟩🟥🟩🟩🟩🟩🟥🟩🟩 8/10');
    expect(text).toContain('1,840 points · 3-day streak');
    expect(text).not.toMatch(/#[0-9a-f]{6}/i);
  });

  it('omits the streak when it is 1 or less', () => {
    expect(dailyShareText({ dateLabel: 'x', results: [true], score: 10, streak: 1 })).not.toContain('streak');
  });
});
