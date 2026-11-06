import React, { useMemo, useState } from 'react';
import { Storage } from '../../storage/localStorage';
import { accuracyByFamily, FAMILY_INFO } from '../../utils/progress';
import { MODE_GUIDES } from '../../data/modeGuides';
import { GameMode } from '../../types/game';

const RECENT_GAMES = 20;

const formatDay = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

/** Accuracy for each of the last games - single series, so no legend. */
const RecentAccuracy: React.FC<{ games: { date: string; accuracy: number; mode: string; score: number }[] }> = ({
  games,
}) => {
  const [hover, setHover] = useState<number | null>(null);
  const last = games[games.length - 1];
  const avg = Math.round(games.reduce((s, g) => s + g.accuracy, 0) / games.length);

  return (
    <figure className="card p-5">
      <figcaption>
        <h3 className="font-medium">Accuracy, last {games.length} games</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Average {avg}% · latest {last.accuracy}%
        </p>
      </figcaption>

      <div className="relative mt-5 flex h-40 gap-3">
        {/* y-axis */}
        <div className="flex flex-col justify-between text-right text-xs tabular-nums text-zinc-400" aria-hidden="true">
          <span>100%</span>
          <span>50%</span>
          <span>0%</span>
        </div>
        <div className="relative flex-1">
          {/* hairline grid */}
          {[0, 50, 100].map((g) => (
            <div
              key={g}
              className="absolute inset-x-0 border-t border-zinc-200 dark:border-zinc-800"
              style={{ bottom: `${g}%` }}
              aria-hidden="true"
            />
          ))}
          <ul className="absolute inset-0 flex items-end gap-0.5" aria-hidden="true">
            {games.map((g, i) => (
              <li
                key={i}
                className="relative flex h-full flex-1 cursor-default items-end justify-center"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <span
                  className={`w-full max-w-[24px] rounded-t transition-colors ${
                    hover === null || hover === i ? 'bg-brand-500' : 'bg-brand-200 dark:bg-brand-900'
                  }`}
                  style={{ height: `${Math.max(g.accuracy, 1.5)}%` }}
                />
              </li>
            ))}
          </ul>
          {hover !== null && (
            <div
              className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs shadow-pop dark:border-zinc-700 dark:bg-zinc-900"
              style={{ left: `${((hover + 0.5) / games.length) * 100}%` }}
              role="status"
            >
              <span className="block font-medium tabular-nums">{games[hover].accuracy}% correct</span>
              <span className="block text-zinc-500">
                {MODE_GUIDES[games[hover].mode as GameMode]?.title ?? games[hover].mode} · {formatDay(games[hover].date)}
              </span>
            </div>
          )}
        </div>
      </div>
      <p className="mt-2 flex justify-between pl-10 text-xs text-zinc-400" aria-hidden="true">
        <span>Older</span>
        <span>Latest</span>
      </p>

      <details className="mt-3 text-sm">
        <summary className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">Show as table</summary>
        <table className="mt-2 w-full text-left">
          <thead className="text-zinc-500">
            <tr>
              <th className="py-1 font-medium">Date</th>
              <th className="py-1 font-medium">Mode</th>
              <th className="py-1 text-right font-medium">Accuracy</th>
              <th className="py-1 text-right font-medium">Score</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {[...games].reverse().map((g, i) => (
              <tr key={i} className="border-t border-zinc-100 dark:border-zinc-800">
                <td className="py-1">{formatDay(g.date)}</td>
                <td className="py-1">{MODE_GUIDES[g.mode as GameMode]?.title ?? g.mode}</td>
                <td className="py-1 text-right">{g.accuracy}%</td>
                <td className="py-1 text-right">{g.score.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
};

/** Accuracy per color family, weakest first. The swatch + name carry identity. */
const FamilyAccuracyChart: React.FC<{ rows: ReturnType<typeof accuracyByFamily> }> = ({ rows }) => {
  const weakest = rows[0];
  return (
    <figure className="card p-5">
      <figcaption>
        <h3 className="font-medium">Accuracy by color family</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {weakest && weakest.accuracy < 100
            ? `Your trickiest colors: ${FAMILY_INFO[weakest.family].label.toLowerCase()} (${weakest.accuracy}%).`
            : 'Weakest families first.'}
        </p>
      </figcaption>
      <ul className="mt-5 space-y-3">
        {rows.map((r) => (
          <li key={r.family} className="grid grid-cols-[8.5rem_1fr_3rem] items-center gap-3 text-sm">
            <span className="flex items-center gap-2 truncate">
              <span
                className="h-3 w-3 shrink-0 rounded-sm ring-1 ring-inset ring-black/10"
                style={{ backgroundColor: FAMILY_INFO[r.family].swatch }}
                aria-hidden="true"
              />
              <span className="truncate">{FAMILY_INFO[r.family].label}</span>
            </span>
            <span
              className="h-3 rounded-full bg-zinc-100 dark:bg-zinc-800"
              title={`${r.correct} of ${r.rounds} correct`}
            >
              <span
                className="block h-3 rounded-full bg-brand-500"
                style={{ width: `${Math.max(r.accuracy, 2)}%` }}
              />
            </span>
            <span className="text-right tabular-nums text-zinc-700 dark:text-zinc-300">{r.accuracy}%</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-zinc-500">Based on the target color of every round you’ve played.</p>
    </figure>
  );
};

/** "Your progress" section on the statistics page. */
export const ProgressCharts: React.FC = () => {
  const history = useMemo(() => Storage.getHistory(), []);

  const recent = useMemo(
    () =>
      history
        .filter((g) => g.rounds.length > 0)
        .slice(0, RECENT_GAMES)
        .reverse()
        .map((g) => ({ date: g.date, accuracy: g.accuracy, mode: g.mode, score: g.score })),
    [history]
  );
  const families = useMemo(() => accuracyByFamily(history.flatMap((g) => g.rounds)), [history]);

  if (recent.length < 2 && families.length === 0) {
    return (
      <section aria-labelledby="progress-heading" className="card p-6 text-center">
        <h2 id="progress-heading" className="font-medium">
          Your progress
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Finish a couple of games and your accuracy trend and trickiest colors will show up here.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="progress-heading">
      <h2 id="progress-heading" className="mb-4 text-xl font-semibold">
        Your progress
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {recent.length >= 2 && <RecentAccuracy games={recent} />}
        {families.length > 0 && <FamilyAccuracyChart rows={families} />}
      </div>
    </section>
  );
};
