import React, { Suspense, lazy, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SeoMeta } from "../components/ui/SeoMeta";
import { Accordion } from "../components/ui/Accordion";
import { ButtonLink } from "../components/ui/Button";
import { Onboarding } from "../components/game/Onboarding";
import { TINTS } from "../components/ui/ColorStripe";
import { Calendar, Sparkles, Palette, Contrast, Ruler } from "lucide-react";
import { ModeSelector, MODES } from "../components/game/ModeSelector";
import { DifficultySelector } from "../components/game/DifficultySelector";
import { GameMode, GameFormat, Difficulty } from "../types/game";
import { useSettings } from "../hooks/useSettings";
import { FAQ_ITEMS } from "../data/faqData";
import { gameJsonLd } from "../seo/head";
import { getRouteMeta } from "../seo/routes";

// Loaded right after the page shell so the hero paints first.
const GameBoard = lazy(() =>
  import("../components/game/GameBoard").then((m) => ({
    default: m.GameBoard,
  })),
);

/** Modes that have their own landing page. The rest are played on the home board. */
const MODE_PAGES: Partial<Record<GameMode, string>> = {
  "exact-color": "/color-guessing-game",
  "rgb-guess": "/rgb-color-game",
  "hex-guess": "/hex-color-game",
  "color-picker": "/color-picker-game",
  "color-match": "/color-matching-game",
  "warm-cool": "/color-theory-game",
};

/** Decorative swatches around the hero (desktop only). */
const FLOATERS: { c: string; cls: string }[] = [
  { c: "#F25F4C", cls: "left-[4%] top-8 h-16 w-16 -rotate-12" },
  { c: "#F5B83D", cls: "left-[12%] top-48 h-10 w-10 rotate-6" },
  { c: "#9B6CF0", cls: "left-[2%] top-80 h-12 w-12 rotate-12" },
  { c: "#1FB58F", cls: "right-[5%] top-10 h-14 w-14 rotate-12" },
  { c: "#3B66F5", cls: "right-[13%] top-52 h-10 w-10 -rotate-6" },
  { c: "#FF8FB1", cls: "right-[3%] top-80 h-16 w-16 -rotate-12" },
];

/** "color" spelled out in the brand colors. */
const COLOR_WORD: [string, string][] = [
  ["c", "text-coral-500"],
  ["o", "text-sun-500"],
  ["l", "text-mint-500"],
  ["o", "text-brand-500"],
  ["r", "text-coral-500"],
];

const TOOLS = [
  {
    icon: Palette,
    to: "/color-converter",
    title: "Color converter",
    body: "Paste a color in any format and get the others, plus lighter and darker versions.",
  },
  {
    icon: Contrast,
    to: "/color-contrast-checker",
    title: "Contrast checker",
    body: "Find out if your text is readable on its background before someone has to squint.",
  },
  {
    icon: Ruler,
    to: "/color-distance",
    title: "Color difference",
    body: "Compare two colors and see how different they really look.",
  },
];

export const HomePage: React.FC = () => {
  const { settings } = useSettings();
  const [mode, setMode] = useState<GameMode>("exact-color");
  const [format, setFormat] = useState<GameFormat>("standard");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const boardRef = useRef<HTMLElement>(null);

  const home = getRouteMeta("/")!;

  const playOnBoard = (m: GameMode) => {
    setMode(m);
    boardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <SeoMeta
        canonicalPath="/"
        structuredData={gameJsonLd("/", "ColorFlick", home.description)}
      />

      {/* Hero */}
      <section className="relative -mx-4 overflow-hidden px-4 pb-4 pt-4 sm:-mx-6 sm:px-6 sm:pt-10">
        {FLOATERS.map((f) => (
          <span
            key={f.c}
            aria-hidden="true"
            className={`absolute hidden rounded-xl shadow-card lg:block ${f.cls}`}
            style={{ backgroundColor: f.c }}
          />
        ))}
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <span
              className="h-2 w-2 rounded-full bg-mint-500"
              aria-hidden="true"
            />
            Free to play, no account needed
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-6xl">
            How good is your eye for{" "}
            <span className="whitespace-nowrap">
              {COLOR_WORD.map(([ch, cls], i) => (
                <span key={i} className={cls}>
                  {ch}
                </span>
              ))}
            </span>
            ?
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Most of us think we're pretty good with colors, until two almost
            identical swatches sit next to each other. ColorFlick is a little
            game for finding out. Pick the matching swatch, guess the hex code,
            or mix the color yourself.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#play"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 font-medium text-white hover:bg-brand-700"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Start playing
            </a>
            <ButtonLink
              to="/daily-color-challenge"
              variant="secondary"
              size="lg"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Today’s challenge
            </ButtonLink>
          </div>
        </div>
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
          <DifficultySelector
            currentDifficulty={difficulty}
            onSelectDifficulty={setDifficulty}
          />
        </div>
        <div className="pt-4">
          <Onboarding />
          <ModeSelector
            currentMode={mode}
            onSelectMode={setMode}
            currentFormat={format}
            onSelectFormat={setFormat}
          />
        </div>
        <Suspense fallback={<div className="min-h-[420px]" aria-busy="true" />}>
          <GameBoard
            key={`${mode}-${format}-${difficulty}`}
            initialMode={mode}
            initialFormat={format}
            initialDifficulty={difficulty}
            settings={settings}
          />
        </Suspense>
      </section>

      {/* Modes */}
      <section
        aria-labelledby="modes-heading"
        className="mx-auto mt-24 max-w-5xl"
      >
        <div className="max-w-2xl">
          <h2 id="modes-heading" className="text-2xl font-semibold sm:text-3xl">
            Pick a mode
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Some are pure eye tests. Others teach you to read color codes, which
            comes in handy if you design or build websites. Every mode has four
            levels, from relaxed to properly tough.
          </p>
        </div>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3">
          {MODES.map((m, i) => {
            const page = MODE_PAGES[m.id];
            const inner = (
              <>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${TINTS[i % TINTS.length]}`}
                >
                  {m.icon}
                </span>
                <span className="mt-3 block font-medium text-zinc-900 dark:text-white">
                  {m.label}
                </span>
                <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">
                  {m.desc}
                </span>
              </>
            );
            const cls =
              "block h-full w-full bg-white p-5 text-left transition-colors hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800/70";
            return (
              <li key={m.id}>
                {page ? (
                  <Link to={page} className={cls}>
                    {inner}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => playOnBoard(m.id)}
                    className={cls}
                  >
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
        <div className="relative flex flex-col gap-6 overflow-hidden rounded-2xl bg-brand-600 p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div
            className="pointer-events-none absolute -right-6 -top-6 hidden grid-cols-3 gap-2 opacity-90 sm:grid"
            aria-hidden="true"
          >
            {[
              "#F25F4C",
              "#F5B83D",
              "#1FB58F",
              "#FF8FB1",
              "#9B6CF0",
              "#F25F4C",
              "#1FB58F",
              "#F5B83D",
              "#FFFFFF",
            ].map((c, i) => (
              <span
                key={i}
                className="h-8 w-8 rounded-md"
                style={{ backgroundColor: c, opacity: 0.35 + (i % 3) * 0.2 }}
              />
            ))}
          </div>
          <div className="relative max-w-xl">
            <p className="text-sm font-medium text-brand-100">
              Daily challenge
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              A new puzzle every day
            </h2>
            <p className="mt-3 text-brand-50">
              Ten rounds, and everyone gets the same colors, so you can compare
              scores with friends. It resets at midnight. Come back tomorrow to
              keep your streak going.
            </p>
          </div>
          <Link
            to="/daily-color-challenge"
            className="relative inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 font-medium text-brand-700 hover:bg-brand-50"
          >
            Play today’s challenge
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* How it's scored */}
      <section
        aria-labelledby="science-heading"
        className="mx-auto mt-24 grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.4fr]"
      >
        <div>
          <h2
            id="science-heading"
            className="text-2xl font-semibold sm:text-3xl"
          >
            Fair scoring, even when it's close
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Color codes can be misleading. Two pairs of colors can be the same
            "distance" apart in RGB numbers, yet one pair looks almost identical
            and the other is obviously different. So we compare colors in OKLab,
            which is built around how people actually see. If your guess looks
            close, it scores as close.
          </p>
          <Link
            to="/color-theory-guide"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            How we measure color{" "}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <dl className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <div>
            <dt className="flex items-center gap-2 font-medium">
              <span
                className="h-2.5 w-2.5 rounded-full bg-coral-500"
                aria-hidden="true"
              />
              Judged by eye
            </dt>
            <dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Every guess is scored by how different it looks, not by raw
              numbers.
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 font-medium">
              <span
                className="h-2.5 w-2.5 rounded-full bg-sun-400"
                aria-hidden="true"
              />
              Light means light
            </dt>
            <dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              The light or dark mode uses the same brightness formula web
              designers use to check text contrast.
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 font-medium">
              <span
                className="h-2.5 w-2.5 rounded-full bg-mint-500"
                aria-hidden="true"
              />
              Color-blind friendly
            </dt>
            <dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Answers are marked with icons and words too, not just red and
              green.
            </dd>
          </div>
        </dl>
      </section>

      {/* Tools */}
      <section
        aria-labelledby="tools-heading"
        className="mx-auto mt-24 max-w-5xl"
      >
        <h2 id="tools-heading" className="text-2xl font-semibold sm:text-3xl">
          Color tools
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          A few handy tools for working with color. Free, and nothing to
          install.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {TOOLS.map((t, i) => (
            <Link
              key={t.to}
              to={t.to}
              className="card group p-5 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              <span
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${TINTS[(i + 1) % TINTS.length]}`}
              >
                <t.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="flex items-center justify-between font-medium">
                {t.title}
                <ArrowRight
                  className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-2 block text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {t.body}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="mx-auto mt-24 max-w-3xl"
      >
        <h2 id="faq-heading" className="text-2xl font-semibold sm:text-3xl">
          Common questions
        </h2>
        <div className="mt-6">
          <Accordion items={FAQ_ITEMS.slice(0, 4)} variant="lines" />
        </div>
        <Link
          to="/faq"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          All questions <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
};
