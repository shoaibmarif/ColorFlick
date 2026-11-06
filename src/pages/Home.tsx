import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { ButtonLink } from '../components/ui/Button';
import { GameBoard } from '../components/game/GameBoard';
import { ModeSelector, MODES } from '../components/game/ModeSelector';
import { DifficultySelector } from '../components/game/DifficultySelector';
import { GameMode, GameFormat, Difficulty } from '../types/game';
import { useSettings } from '../hooks/useSettings';
import { FAQ_ITEMS } from '../data/faqData';
import { gameJsonLd } from '../seo/head';
import { getRouteMeta } from '../seo/routes';

/** Modes that have their own landing page. The rest are played on the home board. */
const MODE_PAGES: Partial<Record<GameMode, string>> = {
  'exact-color': '/color-guessing-game',
  'rgb-guess': '/rgb-color-game',
  'hex-guess': '/hex-color-game',
  'color-picker': '/color-picker-game',
  'color-match': '/color-matching-game',
  'warm-cool': '/color-theory-game',
};

const HERO_SWATCHES = ['#F25F4C', '#F5B83D', '#E9E3D3', '#1FB58F', '#3B66F5', '#2A2D43'];

const TOOLS = [
  {
    to: '/color-converter',
    title: 'Color converter',
    body: 'Convert between HEX, RGB and HSL, with tints, shades and the complement.',
  },
  {
    to: '/color-contrast-checker',
    title: 'Contrast checker',
    body: 'Check text and background colors against WCAG AA and AAA.',
  },
  {
    to: '/color-distance',
    title: 'Color difference',
    body: 'See how far apart two colors look to the eye, measured in OKLab.',
  },
];

export const HomePage: React.FC = () => {
  const { settings } = useSettings();
  const [mode, setMode] = useState<GameMode>('exact-color');
  const [format, setFormat] = useState<GameFormat>('standard');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const boardRef = useRef<HTMLElement>(null);

  const home = getRouteMeta('/')!;

  const playOnBoard = (m: GameMode) => {
    setMode(m);
    boardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <SeoMeta
        canonicalPath="/"
        structuredData={gameJsonLd('/', 'ColorFlick', home.description)}
      />

      {/* Hero */}
      <section className="mx-auto max-w-3xl pt-4 text-center sm:pt-10">
        <div className="mb-6 flex justify-center gap-1.5" aria-hidden="true">
          {HERO_SWATCHES.map((c) => (
            <span key={c} className="h-3 w-8 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
        <h1 className="text-4xl font-semibold leading-[1.1] sm:text-6xl">
          How good is your eye for color?
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          ColorFlick is a free color guessing game. Spot the matching swatch, guess hex codes, mix
          colors by hand — and come back for a new challenge every day.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#play" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-5 font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
            Start playing
          </a>
          <ButtonLink to="/daily-color-challenge" variant="secondary" size="lg">
            Today’s challenge
          </ButtonLink>
        </div>
        <p className="mt-4 text-sm text-zinc-500">No sign-up. Works on phone and desktop.</p>
      </section>

      {/* Game */}
      <section
        id="play"
        ref={boardRef}
        aria-labelledby="play-heading"
        className="card mx-auto mt-16 max-w-3xl scroll-mt-24 p-4 shadow-card sm:p-6"
      >
        <div className="flex flex-col gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="play-heading" className="text-base font-semibold">
            Play
          </h2>
          <DifficultySelector currentDifficulty={difficulty} onSelectDifficulty={setDifficulty} />
        </div>
        <div className="pt-4">
          <ModeSelector
            currentMode={mode}
            onSelectMode={setMode}
            currentFormat={format}
            onSelectFormat={setFormat}
          />
        </div>
        <GameBoard
          key={`${mode}-${format}-${difficulty}`}
          initialMode={mode}
          initialFormat={format}
          initialDifficulty={difficulty}
          settings={settings}
        />
      </section>

      {/* Modes */}
      <section aria-labelledby="modes-heading" className="mx-auto mt-24 max-w-5xl">
        <div className="max-w-2xl">
          <h2 id="modes-heading" className="text-2xl font-semibold sm:text-3xl">
            Nine ways to play
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Some modes train your eye, others teach you how color codes work. Each one has four
            difficulty levels.
          </p>
        </div>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3">
          {MODES.map((m) => {
            const page = MODE_PAGES[m.id];
            const inner = (
              <>
                <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  {m.icon}
                </span>
                <span className="mt-3 block font-medium text-zinc-900 dark:text-white">{m.label}</span>
                <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">{m.desc}</span>
              </>
            );
            const cls =
              'block h-full w-full bg-white p-5 text-left transition-colors hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800/70';
            return (
              <li key={m.id}>
                {page ? (
                  <Link to={page} className={cls}>
                    {inner}
                  </Link>
                ) : (
                  <button type="button" onClick={() => playOnBoard(m.id)} className={cls}>
                    {inner}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Daily */}
      <section className="mx-auto mt-24 max-w-5xl">
        <div className="flex flex-col gap-6 rounded-2xl bg-zinc-900 p-8 text-white dark:bg-zinc-900 dark:ring-1 dark:ring-zinc-800 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-zinc-400">Daily challenge</p>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Ten rounds. Same colors for everyone.
            </h2>
            <p className="mt-3 text-zinc-300">
              A new set of colors arrives every day at midnight. Play once, keep your streak going and
              compare scores with friends.
            </p>
          </div>
          <Link
            to="/daily-color-challenge"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 font-medium text-zinc-900 hover:bg-zinc-200"
          >
            Play today’s challenge
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* How it's scored */}
      <section aria-labelledby="science-heading" className="mx-auto mt-24 grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 id="science-heading" className="text-2xl font-semibold sm:text-3xl">
            Scored the way your eyes see
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Two colors can be equally far apart in RGB numbers yet look very different to a person.
            ColorFlick measures closeness in OKLab, a color space designed around human vision, so a
            near miss is scored as a near miss.
          </p>
          <Link
            to="/color-theory-guide"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Read the color theory guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <dl className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <div>
            <dt className="font-medium">Perceptual distance</dt>
            <dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Guesses are compared with OKLab ΔE, which tracks how different two colors actually look.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Real luminance</dt>
            <dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Light-versus-dark rounds use the WCAG 2.1 relative luminance formula, the same one used
              for accessibility checks.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Color-blind friendly</dt>
            <dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Right and wrong answers are shown with icons and labels, not only red and green.
            </dd>
          </div>
        </dl>
      </section>

      {/* Tools */}
      <section aria-labelledby="tools-heading" className="mx-auto mt-24 max-w-5xl">
        <h2 id="tools-heading" className="text-2xl font-semibold sm:text-3xl">
          Color tools
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Free utilities for designers and developers. Everything runs in your browser.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {TOOLS.map((t) => (
            <Link key={t.to} to={t.to} className="card group p-5 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700">
              <span className="flex items-center justify-between font-medium">
                {t.title}
                <ArrowRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
              <span className="mt-2 block text-sm leading-6 text-zinc-600 dark:text-zinc-400">{t.body}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="mx-auto mt-24 max-w-3xl">
        <h2 id="faq-heading" className="text-2xl font-semibold sm:text-3xl">
          Questions
        </h2>
        <div className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {FAQ_ITEMS.slice(0, 4).map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="flex list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="text-zinc-400 transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">{item.answer}</p>
            </details>
          ))}
        </div>
        <Link to="/faq" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
          All questions <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
};
