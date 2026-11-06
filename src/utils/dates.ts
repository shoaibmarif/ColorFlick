/** Local-time date helpers for the daily challenge (keys are YYYY-MM-DD). */

const pad = (n: number) => String(n).padStart(2, '0');

export const toDateKey = (d: Date): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const todayKey = (): string => toDateKey(new Date());

export const fromDateKey = (key: string): Date => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (key: string, days: number): string => {
  const d = fromDateKey(key);
  d.setDate(d.getDate() + days);
  return toDateKey(d);
};

export const isValidDateKey = (key: string | null | undefined): key is string =>
  !!key && /^\d{4}-\d{2}-\d{2}$/.test(key) && toDateKey(fromDateKey(key)) === key;

/** Milliseconds until the next local midnight. */
export const msUntilMidnight = (now: Date = new Date()): number => {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return next.getTime() - now.getTime();
};

export const formatDateLong = (key: string): string =>
  fromDateKey(key).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

export const formatDateShort = (key: string): string =>
  fromDateKey(key).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
