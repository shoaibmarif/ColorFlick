import React, { useState, useEffect } from 'react';
import { GameMode, GameFormat, Difficulty, GameSettings } from '../../types/game';
import { useGameEngine } from '../../hooks/useGameEngine';
import { useTimer } from '../../hooks/useTimer';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { TargetColor } from '../colors/TargetColor';
import { ColorChoice } from '../colors/ColorChoice';
import { HexInput } from '../colors/HexInput';
import { RgbControls } from '../colors/RgbControls';
import { ColorPickerChallenge } from '../colors/ColorPickerChallenge';
import { ColorMatchingChallenge } from '../colors/ColorMatchingChallenge';
import { ColorComparison } from '../colors/ColorComparison';
import { ScoreDisplay } from './ScoreDisplay';
import { StreakDisplay } from './StreakDisplay';
import { TimerDisplay } from './TimerDisplay';
import { RoundFeedback } from './RoundFeedback';
import { RoundHistory } from './RoundHistory';
import { GameResultModal } from './GameResultModal';
import { KeyboardShortcutsHint } from './KeyboardShortcutsHint';
import { useStats } from '../../hooks/useStats';
import { Sparkles, Info } from 'lucide-react';

interface GameBoardProps {
  initialMode?: GameMode;
  initialFormat?: GameFormat;
  initialDifficulty?: Difficulty;
  settings: GameSettings;
  onViewStats?: () => void;
  isDaily?: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  initialMode = 'exact-color',
  initialFormat = 'standard',
  initialDifficulty = 'medium',
  settings,
  onViewStats,
}) => {
  const { recordRoundResult, recordGameComplete, stats } = useStats();
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | undefined>(undefined);
  const [timedDuration, setTimedDuration] = useState<number>(60);
  const [quickRoundsCount, setQuickRoundsCount] = useState<number>(10);

  const engine = useGameEngine({
    initialMode,
    initialFormat,
    initialDifficulty,
    totalRounds: initialFormat === 'quick-challenge' ? quickRoundsCount : 10,
    onRoundComplete: recordRoundResult,
    onGameComplete: recordGameComplete,
  });

  const isTimedFormat = engine.format === 'timed';
  const durationSeconds = timedDuration;

  const timer = useTimer({
    durationSeconds,
    autoStart: isTimedFormat,
    onExpire: () => {
      // Force finish game when timer hits 0
      engine.forceCompleteGame();
    },
  });

  // Choice selection wrapper
  const handleSelectChoice = (choiceId: string) => {
    setSelectedChoiceId(choiceId);
    engine.submitChoice(choiceId);
  };

  const handleNextRound = () => {
    setSelectedChoiceId(undefined);
    engine.nextRound();
  };

  const handleRestart = () => {
    setSelectedChoiceId(undefined);
    if (isTimedFormat) {
      timer.reset(durationSeconds);
      timer.start();
    }
    engine.startNewGame(engine.mode, engine.format, engine.difficulty, quickRoundsCount);
  };

  // Auto-next round if setting is enabled
  useEffect(() => {
    if (settings.autoNext && engine.roundStatus === 'answered') {
      const timeout = setTimeout(() => {
        handleNextRound();
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [settings.autoNext, engine.roundStatus]);

  // Keyboard navigation
  useKeyboardControls({
    choicesCount: engine.choices.length,
    roundStatus: engine.roundStatus,
    onSelectChoice: (index) => {
      if (engine.choices[index]) {
        handleSelectChoice(engine.choices[index].id);
      }
    },
    onNextRound: handleNextRound,
    disabled:
      !settings.keyboardNavigation ||
      engine.mode === 'rgb-guess' ||
      engine.mode === 'hex-guess' ||
      engine.mode === 'color-picker' ||
      engine.mode === 'color-match',
  });

  // Determine grid columns
  const choiceGridCols =
    engine.mode === 'warm-cool'
      ? 'grid-cols-3 max-w-md mx-auto'
      : engine.mode === 'light-dark'
      ? 'grid-cols-2 max-w-sm mx-auto'
      : engine.choices.length <= 4
      ? 'grid-cols-2 sm:grid-cols-2 max-w-md mx-auto'
      : engine.choices.length <= 6
      ? 'grid-cols-2 sm:grid-cols-3 max-w-lg mx-auto'
      : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-2xl mx-auto';

  // Assistive code displays
  const shouldShowCodeOnTarget =
    settings.showColorCodes === 'always' ||
    (settings.showColorCodes === 'after-answer' && engine.roundStatus === 'answered');

  const questionPrompt =
    engine.mode === 'exact-color'
      ? 'Which color exactly matches the target?'
      : engine.mode === 'closest-color'
      ? 'Which color is visually closest to the target?'
      : engine.mode === 'color-name'
      ? 'What is the standard name of this color?'
      : engine.mode === 'warm-cool'
      ? 'Is this color warm, cool, or neutral?'
      : engine.mode === 'light-dark'
      ? 'Is this color light or dark by WCAG luminance?'
      : engine.mode === 'color-picker'
      ? 'Use the palette & sliders to match the target:'
      : engine.mode === 'color-match'
      ? 'Fine-tune Hue, Saturation & Lightness:'
      : engine.mode === 'rgb-guess'
      ? 'Recreate the target color using RGB sliders:'
      : 'Enter the hexadecimal code for this color:';

  return (
    <section aria-label="Color game arena" className="w-full flex flex-col items-center">
      {/* Format-Specific Configuration Sub-Bar */}
      {engine.format === 'timed' && engine.roundStatus === 'guessing' && engine.roundNumber === 1 && (
        <div className="flex items-center gap-2 mb-3 bg-sky-50 dark:bg-sky-950/40 px-3.5 py-1.5 rounded-full border border-sky-200 dark:border-sky-800 text-xs">
          <span className="font-bold text-sky-700 dark:text-sky-300">Sprint Duration:</span>
          {[30, 60, 120].map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => {
                setTimedDuration(sec);
                timer.reset(sec);
                timer.start();
              }}
              className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                timedDuration === sec
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/50'
              }`}
            >
              {sec}s
            </button>
          ))}
        </div>
      )}

      {engine.format === 'quick-challenge' && engine.roundStatus === 'guessing' && engine.roundNumber === 1 && (
        <div className="flex items-center gap-2 mb-3 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-full border border-amber-200 dark:border-amber-800 text-xs">
          <span className="font-bold text-amber-700 dark:text-amber-300">Challenge Length:</span>
          {[5, 10, 20].map((rounds) => (
            <button
              key={rounds}
              type="button"
              onClick={() => {
                setQuickRoundsCount(rounds);
                engine.setTargetRoundsCount(rounds);
              }}
              className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                quickRoundsCount === rounds
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50'
              }`}
            >
              {rounds} Rounds
            </button>
          ))}
        </div>
      )}

      {/* Top HUD: Score, Streak, Lives, Combo Banner */}
      <div className="w-full max-w-md space-y-2 mb-2">
        <div className="flex items-center justify-between gap-2">
          <ScoreDisplay
            score={engine.score}
            roundNumber={engine.roundNumber}
            totalRounds={engine.format === 'quick-challenge' ? quickRoundsCount : 10}
            format={engine.format}
            lives={engine.lives}
          />
          <StreakDisplay streak={engine.currentStreak} />
        </div>

        {/* Combo / Special Event Badge */}
        {engine.comboBanner && (
          <div className="text-center animate-bounce">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 rounded-full text-xs font-black border border-amber-300 dark:border-amber-700 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{engine.comboBanner}</span>
            </span>
          </div>
        )}

        {/* Timed Bar */}
        {isTimedFormat && (
          <TimerDisplay
            remainingSeconds={timer.remainingSeconds}
            totalDurationSeconds={durationSeconds}
          />
        )}
      </div>

      {/* Target Color Swatch (Hidden in visual matching mode since it's displayed inside the tool) */}
      {engine.mode !== 'color-picker' && engine.mode !== 'color-match' && (
        <TargetColor
          hex={engine.targetHex}
          showCode={shouldShowCodeOnTarget}
          codeFormat={settings.colorAssistance === 'enhanced' ? 'rgb' : 'hex'}
          helperText={questionPrompt}
          roundStatus={engine.roundStatus}
        />
      )}

      {/* Interactive Play Arena */}
      <div className="w-full my-2">
        {engine.mode === 'color-picker' ? (
          <div className="space-y-4">
            <ColorPickerChallenge
              targetRgb={engine.targetRgb}
              onSubmit={engine.submitSimilarityGuess}
              disabled={engine.roundStatus !== 'guessing'}
            />
            {engine.lastResult && (
              <ColorComparison
                targetHex={engine.lastResult.targetHex}
                playerHex={engine.lastResult.playerHex || '#000000'}
                differencePercentage={engine.lastResult.differencePercentage || 0}
              />
            )}
          </div>
        ) : engine.mode === 'color-match' ? (
          <div className="space-y-4">
            <ColorMatchingChallenge
              targetRgb={engine.targetRgb}
              onSubmit={engine.submitSimilarityGuess}
              disabled={engine.roundStatus !== 'guessing'}
            />
            {engine.lastResult && (
              <ColorComparison
                targetHex={engine.lastResult.targetHex}
                playerHex={engine.lastResult.playerHex || '#000000'}
                differencePercentage={engine.lastResult.differencePercentage || 0}
              />
            )}
          </div>
        ) : engine.mode === 'rgb-guess' ? (
          <div className="space-y-4">
            <RgbControls
              onSubmit={engine.submitRgbGuess}
              disabled={engine.roundStatus !== 'guessing'}
            />
            {engine.lastResult && (
              <ColorComparison
                targetHex={engine.lastResult.targetHex}
                playerHex={engine.lastResult.playerHex || '#000000'}
                differencePercentage={engine.lastResult.differencePercentage || 0}
              />
            )}
          </div>
        ) : engine.mode === 'hex-guess' ? (
          <div className="space-y-4">
            <HexInput
              onSubmit={engine.submitHexGuess}
              disabled={engine.roundStatus !== 'guessing'}
            />
            {engine.lastResult && (
              <ColorComparison
                targetHex={engine.lastResult.targetHex}
                playerHex={engine.lastResult.playerHex || '#000000'}
                differencePercentage={engine.lastResult.differencePercentage || 0}
              />
            )}
          </div>
        ) : (
          /* Multiple Choice Grid */
          <div className={`grid gap-3 ${choiceGridCols}`}>
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
        )}
      </div>

      {/* Educational Explanation Box (Warm-Cool / Light-Dark / Color theory) */}
      {engine.lastResult && engine.roundStatus === 'answered' && engine.lastResult.explanation && (
        <div className="max-w-md w-full my-2 p-3.5 bg-blue-50/70 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5 shadow-xs">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="leading-relaxed">{engine.lastResult.explanation}</p>
        </div>
      )}

      {/* Round Feedback Banner */}
      {engine.lastResult && engine.roundStatus === 'answered' && (
        <RoundFeedback
          result={engine.lastResult}
          onNext={handleNextRound}
          isLastRound={
            (engine.format === 'standard' && engine.roundNumber >= 10) ||
            (engine.format === 'quick-challenge' && engine.roundNumber >= quickRoundsCount)
          }
        />
      )}

      {/* Desktop Keyboard Hints */}
      {settings.keyboardNavigation && (
        <KeyboardShortcutsHint
          isAnswered={engine.roundStatus === 'answered'}
          choicesCount={engine.choices.length}
        />
      )}

      {/* Round History Drawer */}
      <RoundHistory history={engine.roundHistory} />

      {/* Final Game Over / Results Modal */}
      <GameResultModal
        isOpen={engine.roundStatus === 'completed'}
        onClose={() => engine.startNewGame()}
        onRestart={handleRestart}
        onViewStats={onViewStats || (() => {})}
        mode={engine.mode}
        format={engine.format}
        difficulty={engine.difficulty}
        score={engine.score}
        rounds={engine.roundHistory}
        isNewPersonalBest={engine.score > stats.highestScore && engine.score > 0}
      />
    </section>
  );
};
