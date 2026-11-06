import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GameMode, Difficulty, GameFormat } from '../../types/game';
import { DIFFICULTY_BONUSES } from '../../utils/scoring';
import {
  MODE_GUIDES,
  DIFFICULTY_ORDER,
  difficultyLabel,
  choiceCountFor,
  SCORING_SUMMARY,
} from '../../data/modeGuides';

export interface GameModeDescriptionProps {
  mode: GameMode;
  difficulty?: Difficulty;
  format?: GameFormat;
}

const FORMAT_NOTES: Partial<Record<GameFormat, string>> = {
  timed: 'Timed mode: answer as many rounds as you can before the clock runs out. Choose 30, 60 or 120 seconds.',
  practice: 'Practice mode: no timer and no end — play as long as you like.',
  endless: 'Endless mode: you have three lives. Each wrong answer costs one.',
  survival: 'Survival mode: one wrong answer ends the game, and it gets harder as you go.',
  'quick-challenge': 'Quick challenge: a short game that starts easy and finishes on Expert.',
};

const CLOSENESS: Record<Difficulty, string> = {
  easy: 'clearly different',
  medium: 'same color family',
  hard: 'close shades',
  expert: 'nearly identical',
};

/** "How this mode works" section shown under the game board. */
export const GameModeDescription: React.FC<GameModeDescriptionProps> = ({
  mode,
  difficulty = 'medium',
  format = 'standard',
}) => {
  const guide = MODE_GUIDES[mode];
  const showsCounts = guide.usesChoiceCount !== undefined;

  return (
    <section aria-labelledby="mode-guide" className="space-y-8">
      {FORMAT_NOTES[format] && (
        <p className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-900 dark:border-brand-900 dark:bg-brand-950/50 dark:text-brand-100">
          {FORMAT_NOTES[format]}
        </p>
      )}

      <div>
        <h2 id="mode-guide" className="text-xl font-semibold">
          How to play: {guide.title}
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{guide.intro}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="font-medium">Each round</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-zinc-700 marker:text-zinc-400 dark:text-zinc-300">
            {guide.howTo.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-medium">Tips</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-zinc-700 marker:text-zinc-400 dark:text-zinc-300">
            {guide.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="font-medium">Difficulty</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-4">
          {DIFFICULTY_ORDER.map((d) => {
            const active = d === difficulty;
            const count = choiceCountFor(guide, d);
            return (
              <li
                key={d}
                aria-current={active ? 'true' : undefined}
                className={`rounded-xl border p-3 text-sm ${
                  active
                    ? 'border-zinc-900 bg-white dark:border-white dark:bg-zinc-900'
                    : 'border-zinc-200 dark:border-zinc-800'
                }`}
              >
                <span className="flex items-center justify-between font-medium">
                  {difficultyLabel(d)}
                  {active && <span className="text-xs font-normal text-zinc-500">current</span>}
                </span>
                <span className="mt-1 block text-zinc-600 dark:text-zinc-400">
                  {showsCounts && count ? `${count} swatches, ${CLOSENESS[d]}. ` : ''}+{DIFFICULTY_BONUSES[d]} bonus points per correct answer.
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3 className="font-medium">Scoring</h3>
        <p className="mt-2 text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">{guide.scoring}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-zinc-600 marker:text-zinc-400 dark:text-zinc-400">
          {SCORING_SUMMARY.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-zinc-200 pt-6 text-sm dark:border-zinc-800">
        {guide.learnMore && (
          <Link to={guide.learnMore.to} className="inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
            {guide.learnMore.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
        <Link to="/how-to-play" className="inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
          Full rules and keyboard shortcuts <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};
