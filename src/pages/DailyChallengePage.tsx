import React, { useState } from 'react';
import { SeoMeta } from '../components/ui/SeoMeta';
import { useDailyChallenge } from '../hooks/useDailyChallenge';
import { useSettings } from '../hooks/useSettings';
import { useStats } from '../hooks/useStats';
import { formatScore } from '../utils/scoring';
import { shareGameResult } from '../utils/share';
import { TargetColor } from '../components/colors/TargetColor';
import { ColorChoice } from '../components/colors/ColorChoice';
import { RoundFeedback } from '../components/game/RoundFeedback';
import { ScoreDisplay } from '../components/game/ScoreDisplay';
import { Button, ButtonLink } from '../components/ui/Button';
import { PageHeader } from '../components/layout/PageHeader';
import { gameJsonLd } from '../seo/head';
import { getRouteMeta } from '../seo/routes';
import { Flame, Trophy, Share2, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DAILY_DESC = getRouteMeta('/daily-color-challenge')!.description;

export const DailyChallengePage: React.FC = () => {
  const { todayStr, isCompletedToday, dailyResult, engine } = useDailyChallenge();
  const { settings } = useSettings();
  const { stats } = useStats();
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleSelectChoice = (choiceId: string) => {
    setSelectedChoiceId(choiceId);
    engine.submitChoice(choiceId);
  };

  const handleNextRound = () => {
    setSelectedChoiceId(undefined);
    engine.nextRound();
  };

  const handleShare = async () => {
    const scoreToShare = dailyResult ? dailyResult.score : engine.score;
    const accuracyToShare = dailyResult ? dailyResult.accuracy : 100;
    const res = await shareGameResult({
      modeName: `Daily Challenge (${todayStr})`,
      score: scoreToShare,
      accuracy: accuracyToShare,
      bestStreak: stats.dailyStreak,
      roundCount: 10,
    });
    if (res.method === 'clipboard' || res.success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <SeoMeta canonicalPath="/daily-color-challenge" structuredData={gameJsonLd('/daily-color-challenge', 'Daily Color Challenge', DAILY_DESC)} />

      <PageHeader title="Daily color challenge" intro={formattedDate}>
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-amber-500" aria-hidden="true" />
            {stats.dailyStreak}-day streak
          </span>
          <span>10 rounds · one attempt per day</span>
        </p>
      </PageHeader>

      <div className="card p-4 shadow-card sm:p-6">
        {isCompletedToday && dailyResult ? (
          <div className="py-6 text-center">
            <Trophy className="mx-auto h-10 w-10 text-amber-500" aria-hidden="true" />
            <p className="mt-4 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              You’ve finished today’s challenge
            </p>
            <p className="mt-1 text-3xl font-semibold tabular-nums">{formatScore(dailyResult.score)} points</p>

            <dl className="mx-auto mt-6 grid max-w-sm grid-cols-2 divide-x divide-zinc-200 rounded-xl border border-zinc-200 py-4 dark:divide-zinc-800 dark:border-zinc-800">
              <div>
                <dt className="text-xs text-zinc-500">Accuracy</dt>
                <dd className="mt-1 text-xl font-semibold tabular-nums">{dailyResult.accuracy}%</dd>
                <dd className="text-xs text-zinc-500">
                  {dailyResult.correctAnswers} of {dailyResult.totalRounds} correct
                </dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Daily streak</dt>
                <dd className="mt-1 text-xl font-semibold tabular-nums">{stats.dailyStreak}</dd>
                <dd className="text-xs text-zinc-500">Best: {stats.longestDailyStreak} days</dd>
              </div>
            </dl>

            <p className="mx-auto mt-6 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
              A new challenge unlocks at midnight. Until then, try another mode.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button onClick={handleShare} variant="secondary" className="w-full sm:w-auto">
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
                {copied ? 'Copied to clipboard' : 'Share your score'}
              </Button>
              <ButtonLink to="/color-guessing-game" className="w-full sm:w-auto">
                Play other modes
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <ScoreDisplay score={engine.score} roundNumber={engine.roundNumber} totalRounds={10} format="daily" />

            <TargetColor
              hex={engine.targetHex}
              showCode={settings.showColorCodes === 'always'}
              helperText={`Round ${engine.roundNumber} of 10`}
              roundStatus={engine.roundStatus}
            />

            <div className="mx-auto my-4 grid max-w-md grid-cols-2 gap-3">
              {engine.choices.map((c, idx) => (
                <ColorChoice
                  key={c.id}
                  choice={c}
                  index={idx}
                  onSelect={handleSelectChoice}
                  roundStatus={engine.roundStatus}
                  selectedId={selectedChoiceId}
                  showCode={settings.showColorCodes === 'always'}
                  accessiblePattern={settings.colorAssistance === 'enhanced' || settings.highContrast}
                />
              ))}
            </div>

            {engine.lastResult && engine.roundStatus === 'answered' && (
              <RoundFeedback
                result={engine.lastResult}
                onNext={handleNextRound}
                isLastRound={engine.roundNumber >= 10}
              />
            )}
          </div>
        )}
      </div>

      <section aria-labelledby="daily-about" className="prose-page mt-12">
        <h2 id="daily-about">How the daily challenge works</h2>
        <p>
          Each day’s ten rounds are generated from the date itself (today’s key is{' '}
          <code>{todayStr}</code>), so everyone who plays on the same day sees the same colors in the
          same order. That makes scores directly comparable — share yours with friends.
        </p>
        <p>
          You get one attempt per day, and a new challenge unlocks at midnight in your time zone.
          Finish the challenge on consecutive days to build your streak; missing a day resets it.
          Streaks and results are saved in your browser.
        </p>
        <p>
          New here? Read <Link to="/how-to-play">how scoring works</Link>, or warm up with the{' '}
          <Link to="/color-guessing-game">unlimited color guessing game</Link>.
        </p>
      </section>
    </div>
  );
};
