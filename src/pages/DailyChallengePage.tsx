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
import { Button } from '../components/ui/Button';
import { Calendar, Flame, Trophy, Share2, Check, ArrowRight, ShieldCheck, Zap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const dailyKeywords = [
    'daily color challenge',
    'daily color game',
    'daily color puzzle',
    'color acuity test today',
    'daily visual perception game',
    'wordle for colors',
    'daily color guessing',
  ];

  const dailyStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `Daily Color Challenge - ${formattedDate}`,
    description: "Play today's official Daily Color Challenge. 10 deterministic seeded rounds generated fresh daily at midnight for players worldwide.",
    url: 'https://colorwise.netlify.app/daily-color-challenge',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    genre: ['Puzzle', 'Daily Challenge', 'Trivia', 'Color Theory'],
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Shoaib Arif',
      url: 'https://shoaibarif.vercel.app/',
    },
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <SeoMeta
        title={`Daily Color Challenge - ${formattedDate}`}
        description="Play today's official Daily Color Challenge. 10 seeded rounds generated fresh daily for players worldwide."
        canonicalPath="/daily-color-challenge"
        keywords={dailyKeywords}
        structuredData={dailyStructuredData}
      />

      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold border border-amber-500/20">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Daily Color Challenge
        </h1>

        <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-500">
          <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-extrabold">
            <Flame className="w-4 h-4 fill-current" />
            <span>{stats.dailyStreak} Day Streak</span>
          </span>
          <span>•</span>
          <span>10 Colors • One Attempt Per Day</span>
        </div>
      </div>

      {/* Daily Challenge Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
        {isCompletedToday && dailyResult ? (
          /* Already Completed State */
          <div className="space-y-6 text-center py-6">
            <div className="w-20 h-20 bg-amber-100 dark:bg-amber-950/60 rounded-full flex items-center justify-center text-amber-500 mx-auto ring-8 ring-amber-500/10">
              <Trophy className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Today's Challenge Completed!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Score: {formatScore(dailyResult.score)}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Accuracy</span>
                <p className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                  {dailyResult.accuracy}%
                </p>
                <span className="text-[11px] text-slate-500">
                  {dailyResult.correctAnswers} / {dailyResult.totalRounds} Correct
                </span>
              </div>
              <div className="border-l border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-slate-400">Daily Streak</span>
                <p className="font-mono text-xl font-bold text-amber-600 dark:text-amber-400">
                  🔥 {stats.dailyStreak}
                </p>
                <span className="text-[11px] text-slate-500">
                  Best: {stats.longestDailyStreak} Days
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Come back tomorrow at midnight for a brand new seeded puzzle. In the meantime, try endless and survival modes!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button onClick={handleShare} variant="secondary" size="md" className="w-full sm:w-auto gap-2">
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Result Copied!' : 'Share Score'}</span>
              </Button>
              <Link to="/color-guessing-game" className="w-full sm:w-auto">
                <Button variant="primary" size="md" className="w-full sm:w-auto gap-2">
                  <span>Play Other Modes</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Active Playing State */
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <ScoreDisplay
                score={engine.score}
                roundNumber={engine.roundNumber}
                totalRounds={10}
                format="daily"
              />
              <span className="text-xs font-mono font-bold text-slate-400">
                Daily Mode
              </span>
            </div>

            <TargetColor
              hex={engine.targetHex}
              showCode={settings.showColorCodes === 'always'}
              helperText={`Question ${engine.roundNumber} of 10`}
              roundStatus={engine.roundStatus}
            />

            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto my-4">
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

      {/* Daily Challenge Rules & Educational Guide */}
      <section
        aria-labelledby="daily-challenge-guide"
        className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-7 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-5"
      >
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700/60">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 id="daily-challenge-guide" className="text-base font-black text-slate-900 dark:text-white">
              About the Daily Color Challenge
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              10 seeded rounds generated fresh daily with deterministic global equality
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Deterministic Seed</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The questions for each day are generated using a cryptographically uniform pseudorandom seed (<code className="font-mono text-[10px] bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">{todayStr}</code>). Every player across the globe sees the exact same sequence.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Flame className="w-4 h-4" />
              <span>Career Streaks</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Complete each day's challenge to extend your daily streak. Missing a day resets the counter. All records are persisted securely in your browser's LocalStorage.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-sky-600 dark:text-sky-400">
              <Zap className="w-4 h-4" />
              <span>Midnight UTC Reset</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A fresh seeded challenge unlocks automatically every night at 00:00 local midnight. You get one official tracked attempt per calendar day.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <Link
            to="/how-to-play"
            className="inline-flex items-center gap-1.5 font-bold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>How to Play & Scoring Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/color-guessing-game"
            className="inline-flex items-center gap-1.5 font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Play Unlimited Exact Match</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
