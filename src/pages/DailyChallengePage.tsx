import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, Flame, Share2, X, ArrowRight, RotateCcw } from 'lucide-react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { PageHeader } from '../components/layout/PageHeader';
import { Button, ButtonLink } from '../components/ui/Button';
import { TargetColor } from '../components/colors/TargetColor';
import { ColorChoice } from '../components/colors/ColorChoice';
import { RoundFeedback } from '../components/game/RoundFeedback';
import { ScoreDisplay } from '../components/game/ScoreDisplay';
import { useDailyChallenge, useDailyHistory, DAILY_ROUNDS } from '../hooks/useDailyChallenge';
import { useSettings } from '../hooks/useSettings';
import { useStats } from '../hooks/useStats';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { formatScore } from '../utils/scoring';
import { dailyShareText, shareText } from '../utils/share';
import { addDays, formatDateLong, formatDateShort, fromDateKey, isValidDateKey, msUntilMidnight, todayKey } from '../utils/dates';
import { gameJsonLd } from '../seo/head';
import { getRouteMeta } from '../seo/routes';
import { SITE, absoluteUrl } from '../seo/site';
import { DailySummary } from '../types/game';

const DAILY_DESC = getRouteMeta('/daily-color-challenge')!.description;
/** How far back the archive goes. */
const ARCHIVE_DAYS = 35;

/* ── Countdown ─────────────────────────────────────────────────────────── */

const useCountdown = () => {
  const [ms, setMs] = useState(msUntilMidnight());
  useEffect(() => {
    const id = setInterval(() => setMs(msUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);
  const s = Math.floor(ms / 1000);
  const hh = String(Math.floor(s / 3600)).padStart(2, '0');
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return { label: `${hh}:${mm}:${ss}`, done: ms <= 1000 };
};

const Countdown: React.FC = () => {
  const { label, done } = useCountdown();
  // Roll over to the new day automatically at midnight.
  useEffect(() => {
    if (done) {
      const t = setTimeout(() => window.location.reload(), 1500);
      return () => clearTimeout(t);
    }
  }, [done]);
  return (
    <span className="tabular-nums" aria-live="off">
      {label}
    </span>
  );
};

/* ── Result card ───────────────────────────────────────────────────────── */

const DailyResult: React.FC<{
  summary: DailySummary;
  isToday: boolean;
  streak: number;
  onReplay?: () => void;
}> = ({ summary, isToday, streak, onReplay }) => {
  const [shared, setShared] = useState<'idle' | 'copied' | 'shared'>('idle');
  const dateLabel = formatDateShort(summary.date);

  const handleShare = async () => {
    const text = dailyShareText({
      dateLabel,
      results: summary.results,
      score: summary.score,
      streak: isToday ? streak : undefined,
    });
    const how = await shareText(text, absoluteUrl('/daily-color-challenge'), `${SITE.name} daily`);
    if (how !== 'failed') {
      setShared(how === 'clipboard' ? 'copied' : 'shared');
      setTimeout(() => setShared('idle'), 2500);
    }
  };

  return (
    <div className="py-4 text-center">
      <p className="text-sm font-medium text-mint-700 dark:text-mint-300">
        {isToday ? 'You’ve finished today’s challenge' : `Challenge for ${dateLabel}`}
      </p>
      <p className="mt-1 text-4xl font-semibold tabular-nums">{formatScore(summary.score)}</p>
      <p className="text-sm text-zinc-500">points</p>

      {/* The day's colors, with your result for each */}
      <ol className="mx-auto mt-6 grid max-w-md grid-cols-5 gap-2" aria-label="Your answers">
        {summary.targets.map((hex, i) => {
          const ok = summary.results[i];
          return (
            <li
              key={i}
              className="relative aspect-square rounded-lg ring-1 ring-inset ring-black/10"
              style={{ backgroundColor: hex }}
              title={`Round ${i + 1}: ${hex} - ${ok ? 'correct' : 'missed'}`}
            >
              <span
                className={`absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-white ring-2 ring-white dark:ring-zinc-900 ${
                  ok ? 'bg-mint-600' : 'bg-coral-600'
                }`}
              >
                {ok ? <Check className="h-3 w-3" strokeWidth={3} /> : <X className="h-3 w-3" strokeWidth={3} />}
                <span className="sr-only">{ok ? 'correct' : 'missed'}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <dl className="mx-auto mt-6 grid max-w-sm grid-cols-2 divide-x divide-zinc-200 rounded-xl border border-zinc-200 py-3 dark:divide-zinc-800 dark:border-zinc-800">
        <div>
          <dt className="text-xs text-zinc-500">Correct</dt>
          <dd className="text-xl font-semibold tabular-nums">
            {summary.correctAnswers}/{summary.totalRounds}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-zinc-500">{isToday ? 'Daily streak' : 'Accuracy'}</dt>
          <dd className="text-xl font-semibold tabular-nums">{isToday ? streak : `${summary.accuracy}%`}</dd>
        </div>
      </dl>

      {isToday && (
        <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
          Next challenge in <strong className="text-zinc-900 dark:text-white"><Countdown /></strong>
        </p>
      )}

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button onClick={handleShare} className="w-full sm:w-auto">
          {shared === 'idle' ? <Share2 className="h-4 w-4" /> : <Check className="h-4 w-4" />}
          {shared === 'copied' ? 'Copied - paste it anywhere' : shared === 'shared' ? 'Shared' : 'Share result'}
        </Button>
        {onReplay ? (
          <Button variant="secondary" onClick={onReplay} className="w-full sm:w-auto">
            <RotateCcw className="h-4 w-4" />
            Play again
          </Button>
        ) : (
          <ButtonLink to="/color-guessing-game" variant="secondary" className="w-full sm:w-auto">
            Play other modes
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        )}
      </div>
    </div>
  );
};

/* ── Game ──────────────────────────────────────────────────────────────── */

const DailyGame: React.FC<{ dateKey: string }> = ({ dateKey }) => {
  const { isToday, result, engine } = useDailyChallenge(dateKey);
  const { settings } = useSettings();
  const { stats } = useStats();
  const [selected, setSelected] = useState<string | undefined>();
  const [replaying, setReplaying] = useState(false);

  const select = (id: string) => {
    setSelected(id);
    engine.submitChoice(id);
  };
  const next = () => {
    setSelected(undefined);
    engine.nextRound();
  };

  useKeyboardControls({
    choicesCount: engine.choices.length,
    roundStatus: engine.roundStatus,
    onSelectChoice: (i) => engine.choices[i] && select(engine.choices[i].id),
    onNextRound: next,
    disabled: !settings.keyboardNavigation || (!!result && !replaying),
  });

  const showResult = result && (!replaying || engine.roundStatus === 'completed');

  if (showResult) {
    return (
      <DailyResult
        summary={result}
        isToday={isToday}
        streak={stats.dailyStreak}
        onReplay={
          isToday
            ? undefined
            : () => {
                setReplaying(true);
                setSelected(undefined);
                engine.startNewGame();
              }
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {!isToday && (
        <p className="rounded-lg bg-sun-50 px-3 py-2 text-center text-sm text-sun-900 dark:bg-sun-900/30 dark:text-sun-100">
          Replaying {formatDateShort(dateKey)} - this won’t affect your streak.
        </p>
      )}
      <ScoreDisplay score={engine.score} roundNumber={engine.roundNumber} totalRounds={DAILY_ROUNDS} format="daily" />
      <TargetColor
        hex={engine.targetHex}
        showCode={settings.showColorCodes === 'always'}
        helperText="Which swatch matches the target?"
        roundStatus={engine.roundStatus}
      />
      <div className="mx-auto my-4 grid max-w-lg grid-cols-3 gap-3">
        {engine.choices.map((c, idx) => (
          <ColorChoice
            key={c.id}
            choice={c}
            index={idx}
            onSelect={select}
            roundStatus={engine.roundStatus}
            selectedId={selected}
            showCode={settings.showColorCodes === 'always'}
            accessiblePattern={settings.colorAssistance === 'enhanced' || settings.highContrast}
          />
        ))}
      </div>
      {engine.lastResult && engine.roundStatus === 'answered' && (
        <RoundFeedback result={engine.lastResult} onNext={next} isLastRound={engine.roundNumber >= DAILY_ROUNDS} />
      )}
    </div>
  );
};

/* ── Calendar ──────────────────────────────────────────────────────────── */

const accuracyTint = (acc: number) =>
  acc >= 90 ? 'bg-mint-500 text-white' : acc >= 70 ? 'bg-mint-300 text-mint-950' : acc >= 40 ? 'bg-sun-300 text-sun-950' : 'bg-coral-300 text-coral-950';

const DailyCalendar: React.FC<{ selected: string }> = ({ selected }) => {
  const history = useDailyHistory();
  const today = todayKey();
  // Align to whole weeks (Mon-Sun) ending this week.
  const todayDow = (fromDateKey(today).getDay() + 6) % 7; // 0 = Monday
  const end = addDays(today, 6 - todayDow);
  const days = Array.from({ length: ARCHIVE_DAYS }, (_, i) => addDays(end, i - ARCHIVE_DAYS + 1));

  return (
    <section aria-labelledby="calendar-heading" className="mx-auto mt-12 max-w-md">
      <div className="flex items-baseline justify-between">
        <h2 id="calendar-heading" className="text-lg font-semibold">
          Past challenges
        </h2>
        <p className="text-sm text-zinc-500">Tap a day to play it</p>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-xs text-zinc-500">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <span key={d}>{d}</span>
        ))}
        {days.map((d) => {
          const future = d > today;
          const played = history[d];
          const isSel = d === selected;
          const dayNum = fromDateKey(d).getDate();
          const cls = `flex h-10 items-center justify-center rounded-md text-sm tabular-nums ${
            played ? accuracyTint(played.accuracy) : future ? 'text-zinc-300 dark:text-zinc-700' : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
          } ${isSel ? 'ring-2 ring-zinc-900 ring-offset-2 ring-offset-zinc-50 dark:ring-white dark:ring-offset-zinc-950' : ''}`;
          const label = `${formatDateLong(d)}${played ? `: ${played.correctAnswers} of ${played.totalRounds} correct` : future ? ' (not yet available)' : ''}`;
          return future ? (
            <span key={d} className={cls} aria-label={label}>
              {dayNum}
            </span>
          ) : (
            <Link
              key={d}
              to={d === today ? '/daily-color-challenge' : `/daily-color-challenge?date=${d}`}
              className={`${cls} hover:ring-2 hover:ring-zinc-400`}
              aria-label={label}
              aria-current={isSel ? 'date' : undefined}
            >
              {dayNum}
            </Link>
          );
        })}
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-mint-500" />90%+</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-mint-300" />70%+</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-sun-300" />40%+</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-coral-300" />under 40%</span>
      </p>
    </section>
  );
};

/* ── Page ──────────────────────────────────────────────────────────────── */

export const DailyChallengePage: React.FC = () => {
  const [params] = useSearchParams();
  const { stats } = useStats();
  const today = todayKey();
  const requested = params.get('date');
  const dateKey =
    isValidDateKey(requested) && requested <= today && requested >= addDays(today, -ARCHIVE_DAYS) ? requested : today;
  const isToday = dateKey === today;

  return (
    <div className="mx-auto max-w-2xl">
      <SeoMeta
        canonicalPath="/daily-color-challenge"
        structuredData={gameJsonLd('/daily-color-challenge', 'Daily Color Challenge', DAILY_DESC)}
      />

      <PageHeader title="Daily color challenge" intro={formatDateLong(dateKey)}>
        <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-coral-500" aria-hidden="true" />
            {stats.dailyStreak}-day streak
          </span>
          <span>{DAILY_ROUNDS} rounds · same colors for everyone</span>
          {isToday && (
            <span>
              New puzzle in <Countdown />
            </span>
          )}
        </p>
      </PageHeader>

      {!isToday && (
        <p className="mb-4 text-sm">
          <Link to="/daily-color-challenge" className="font-medium text-brand-600 hover:underline dark:text-brand-400">
            ← Back to today’s challenge
          </Link>
        </p>
      )}

      <div className="card p-4 shadow-card sm:p-6">
        <DailyGame key={dateKey} dateKey={dateKey} />
      </div>

      <DailyCalendar selected={dateKey} />

      <section aria-labelledby="daily-about" className="prose-page mt-12">
        <h2 id="daily-about">How the daily challenge works</h2>
        <p>
          Each day’s {DAILY_ROUNDS} rounds are generated from the date itself, so everyone who plays on the
          same day sees the same colors in the same order. That makes scores directly comparable - share
          your result grid with friends.
        </p>
        <p>
          A new challenge unlocks at midnight in your time zone. Finish it on consecutive days to build
          your streak; missing a day resets it. You can replay the last five weeks from the calendar, but
          replays don’t count toward your streak.
        </p>
        <p>
          New here? Read <Link to="/how-to-play">how scoring works</Link>, or warm up with the{' '}
          <Link to="/color-guessing-game">unlimited color guessing game</Link>.
        </p>
      </section>
    </div>
  );
};
