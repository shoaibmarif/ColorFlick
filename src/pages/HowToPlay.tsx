import React from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { ButtonLink } from '../components/ui/Button';
import { MODES } from '../components/game/ModeSelector';
import { MODE_GUIDES, DIFFICULTY_ORDER, difficultyLabel, SCORING_SUMMARY } from '../data/modeGuides';
import { DIFFICULTY_CONFIGS } from '../utils/randomColor';
import { DIFFICULTY_BONUSES } from '../utils/scoring';

const SHORTCUTS: [string, string][] = [
  ['1 - 9', 'Pick the swatch with that number'],
  ['Enter or Space', 'Go to the next round'],
  ['Esc', 'Close a dialog or menu'],
  ['Tab', 'Move between controls'],
];

export const HowToPlayPage: React.FC = () => (
  <div className="mx-auto max-w-3xl">
    <SeoMeta canonicalPath="/how-to-play" />
    <PageHeader
      title="How to play ColorFlick"
      intro="The rules, how points are scored, and the keyboard shortcuts."
    />

    <article className="prose-page">
      <h2>The basics</h2>
      <p>
        Every round shows you a <strong>target color</strong>. Depending on the mode you either pick a
        swatch, type a code, or recreate the color with sliders. A standard game is ten rounds. Your
        best scores, streaks and achievements are saved in this browser.
      </p>

      <h2>Game modes</h2>
      <dl className="not-prose grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {MODES.map((m) => (
          <div key={m.id}>
            <dt className="font-medium text-zinc-900 dark:text-zinc-100">{MODE_GUIDES[m.id].title}</dt>
            <dd className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{MODE_GUIDES[m.id].intro}</dd>
          </div>
        ))}
      </dl>

      <h2>Difficulty</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800">
            <tr>
              <th className="py-2 pr-4 font-medium">Level</th>
              <th className="py-2 pr-4 font-medium">Swatches</th>
              <th className="py-2 pr-4 font-medium">What to expect</th>
              <th className="py-2 font-medium">Bonus</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {DIFFICULTY_ORDER.map((d) => (
              <tr key={d}>
                <td className="py-2 pr-4 font-medium">{difficultyLabel(d)}</td>
                <td className="py-2 pr-4 tabular-nums">{DIFFICULTY_CONFIGS[d].choiceCount}</td>
                <td className="py-2 pr-4 text-zinc-600 dark:text-zinc-400">{DIFFICULTY_CONFIGS[d].summary}</td>
                <td className="py-2 tabular-nums">+{DIFFICULTY_BONUSES[d]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm">
        Every wrong swatch is guaranteed to be visibly different from the target and from the other
        swatches - even on Expert.
      </p>

      <h2>Scoring</h2>
      <p>Wrong answers score nothing and reset your streak. A correct answer earns:</p>
      <ul>
        {SCORING_SUMMARY.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <h2>Formats</h2>
      <ul>
        <li><strong>Standard</strong> - ten rounds at the difficulty you choose.</li>
        <li><strong>Quick challenge</strong> - 5, 10 or 20 rounds that start easy and finish on Expert.</li>
        <li><strong>Timed</strong> - as many rounds as you can in 30, 60 or 120 seconds.</li>
        <li><strong>Endless</strong> - keep going until you lose three lives.</li>
        <li><strong>Survival</strong> - one mistake ends the game; it gets harder as you go.</li>
        <li><strong>Practice</strong> - no timer and no end.</li>
        <li>
          <strong>
            <Link to="/daily-color-challenge">Daily challenge</Link>
          </strong>{' '}
          - ten rounds, the same for everyone, once a day.
        </li>
      </ul>

      <h2>Keyboard shortcuts</h2>
    </article>

    <table className="w-full text-left text-sm">
      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {SHORTCUTS.map(([key, action]) => (
          <tr key={key}>
            <td className="w-40 py-2 pr-4">
              <kbd className="rounded border border-zinc-300 bg-white px-1.5 py-0.5 text-xs dark:border-zinc-700 dark:bg-zinc-900">
                {key}
              </kbd>
            </td>
            <td className="py-2 text-zinc-700 dark:text-zinc-300">{action}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="mt-10 flex flex-wrap gap-3">
      <ButtonLink to="/color-guessing-game">Start playing</ButtonLink>
      <ButtonLink to="/daily-color-challenge" variant="secondary">
        Today’s challenge
      </ButtonLink>
    </div>
  </div>
);
