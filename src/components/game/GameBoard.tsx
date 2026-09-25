import React, { useState } from 'react';
import { GameMode, GameFormat, Difficulty, GameSettings } from '../../types/game';
import { useGameEngine } from '../../hooks/useGameEngine';
import { useTimer } from '../../hooks/useTimer';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { TargetColor } from '../colors/TargetColor';
import { ColorChoice } from '../colors/ColorChoice';
import { HexInput } from '../colors/HexInput';
import { RgbControls } from '../colors/RgbControls';
import { ColorComparison } from '../colors/ColorComparison';
import { ScoreDisplay } from './ScoreDisplay';
import { StreakDisplay } from './StreakDisplay';
import { TimerDisplay } from './TimerDisplay';
import { RoundFeedback } from './RoundFeedback';
import { RoundHistory } from './RoundHistory';
import { GameResultModal } from './GameResultModal';
import { KeyboardShortcutsHint } from './KeyboardShortcutsHint';
import { useStats } from '../../hooks/useStats';

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

  const engine = useGameEngine({
    initialMode,
    initialFormat,
    initialDifficulty,
    totalRounds: 10,
    onRoundComplete: recordRoundResult,
    onGameComplete: recordGameComplete,
  });

  const isTimedFormat = engine.format === 'quick-challenge' || engine.format === 'timed';
  const durationSeconds = engine.format === 'quick-challenge' ? 30 : 60;

  const timer = useTimer({
    durationSeconds,
    autoStart: isTimedFormat,
    onExpire: () => {
      // Complete game when timer runs out
      engine.startNewGame();
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
    engine.startNewGame();
  };

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
    disabled: engine.mode === 'rgb-guess' || engine.mode === 'hex-guess',
  });

  // Determine grid columns
  const choiceGridCols =
    engine.mode === 'warm-cool' || engine.mode === 'light-dark'
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
      ? 'Which color matches the target?'
      : engine.mode === 'closest-color'
      ? 'Which color is closest to the target?'
      : engine.mode === 'color-name'
      ? 'What is the name of this color?'
      : engine.mode === 'warm-cool'
      ? 'Is this color warm or cool?'
      : engine.mode === 'light-dark'
      ? 'Is this color light or dark?'
      : engine.mode === 'rgb-guess'
      ? 'Recreate the target color using RGB sliders:'
      : 'Enter the hexadecimal code for this color:';

  return (
    <section aria-label="Color game arena" className="w-full flex flex-col items-center">
      {/* Top HUD */}
      <div className="w-full max-w-md space-y-2 mb-2">
        <div className="flex items-center justify-between gap-2">
          <ScoreDisplay
            score={engine.score}
            roundNumber={engine.roundNumber}
            totalRounds={10}
            format={engine.format}
            lives={engine.lives}
          />
          <StreakDisplay streak={engine.currentStreak} />
        </div>

        {/* Timed Bar */}
        {isTimedFormat && (
          <TimerDisplay
            remainingSeconds={timer.remainingSeconds}
            totalDurationSeconds={durationSeconds}
          />
        )}
      </div>

      {/* Target Color Swatch */}
      <TargetColor
        hex={engine.targetHex}
        showCode={shouldShowCodeOnTarget}
        codeFormat={settings.colorAssistance === 'enhanced' ? 'rgb' : 'hex'}
        helperText={questionPrompt}
        roundStatus={engine.roundStatus}
      />

      {/* Interactive Play Arena */}
      <div className="w-full my-2">
        {engine.mode === 'rgb-guess' ? (
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

      {/* Round Feedback Banner */}
      {engine.lastResult && engine.roundStatus === 'answered' && (
        <RoundFeedback
          result={engine.lastResult}
          onNext={handleNextRound}
          isLastRound={engine.roundNumber >= 10 && engine.format === 'standard'}
        />
      )}

      {/* Desktop Keyboard Hints */}
      <KeyboardShortcutsHint
        isAnswered={engine.roundStatus === 'answered'}
        choicesCount={engine.choices.length}
      />

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
