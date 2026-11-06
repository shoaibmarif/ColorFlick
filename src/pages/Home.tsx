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
    body: "Convert between HEX, RGB and HSL, with tints, shades and the complement.",
  },
  {
    icon: Contrast,
    to: "/color-contrast-checker",
    title: "Contrast checker",
    body: "Check text and background colors against WCAG AA and AAA.",
  },
  {
    icon: Ruler,
    to: "/color-distance",
    title: "Color difference",
    body: "See how far apart two colors look to the eye, measured in OKLab.",
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
            Free · No sign-up · New challenge every day
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
            ColorFlick is a playground for people who love colors. Spot the
            matching swatch, guess hex codes, mix colors by hand — and come back
            for a new puzzle every day.
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
            Nine ways to play
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Some modes train your eye, others teach you how color codes work.
            Each one has four difficulty levels.
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
              Ten rounds. Same colors for everyone.
            </h2>
            <p className="mt-3 text-brand-50">
              A new set of colors arrives every day at midnight. Play once, keep
              your streak going and share your result grid with friends.
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
            Scored the way your eyes see
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Two colors can be equally far apart in RGB numbers yet look very
            different to a person. ColorFlick measures closeness in OKLab, a
            color space designed around human vision, so a near miss is scored
            as a near miss.
          </p>
          <Link
            to="/color-theory-guide"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Read the color theory guide{" "}
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
              Perceptual distance
            </dt>
            <dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Guesses are compared with OKLab ΔE, which tracks how different two
              colors actually look.
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 font-medium">
              <span
                className="h-2.5 w-2.5 rounded-full bg-sun-400"
                aria-hidden="true"
              />
              Real luminance
            </dt>
            <dd className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Light-versus-dark rounds use the WCAG 2.1 relative luminance
              formula, the same one used for accessibility checks.
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
              Right and wrong answers are shown with icons and labels, not only
              red and green.
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
          Free utilities for designers and developers. Everything runs in your
          browser.
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
          Questions
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
