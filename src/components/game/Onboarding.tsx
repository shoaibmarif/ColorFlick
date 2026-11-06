import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Storage } from '../../storage/localStorage';
import { TINTS } from '../ui/ColorStripe';

const STEPS = [
  { title: 'Look at the target', body: 'The big swatch at the top is the color you are looking for.' },
  { title: 'Pick its match', body: 'Click or tap the swatch that matches — or press its number key.' },
  { title: 'Build a streak', body: 'Answer fast and keep getting it right for bonus points.' },
];

/** A short, dismissible "how it works" card shown on a player's first visit. */
export const Onboarding: React.FC = () => {
  const [visible, setVisible] = useState(() => !Storage.isOnboarded());
  if (!visible) return null;

  const dismiss = () => {
    Storage.setOnboarded();
    setVisible(false);
  };

  return (
    <aside
      aria-label="How to play"
      className="relative mb-5 rounded-xl border border-brand-200 bg-brand-50/60 p-4 dark:border-brand-900 dark:bg-brand-950/40"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-2 top-2 rounded-md p-1.5 text-zinc-500 hover:bg-white hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
      <p className="pr-8 font-medium">New here? It takes ten seconds to learn.</p>
      <ol className="mt-3 grid gap-3 sm:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${TINTS[i]}`}>
              {i + 1}
            </span>
            <span>
              <span className="block text-sm font-medium">{s.title}</span>
              <span className="block text-sm leading-6 text-zinc-600 dark:text-zinc-400">{s.body}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={dismiss}
          className="h-9 rounded-lg bg-brand-600 px-4 text-sm font-medium text-white hover:bg-brand-700"
        >
          Got it, let’s play
        </button>
        <Link to="/color-game-for-beginners" onClick={dismiss} className="text-sm font-medium text-brand-700 hover:underline dark:text-brand-300">
          Start with an easy game
        </Link>
      </div>
    </aside>
  );
};
