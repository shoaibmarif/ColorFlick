import React from 'react';
import { RoundResult } from '../../types/game';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface RoundFeedbackProps {
  result: RoundResult;
  onNext: () => void;
  isLastRound: boolean;
}

export const RoundFeedback: React.FC<RoundFeedbackProps> = ({
  result,
  onNext,
  isLastRound,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`w-full max-w-md mx-auto my-3 p-4 rounded-2xl border shadow-sm animate-pop transition-all ${
        result.isCorrect
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
          : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {result.isCorrect ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base">
                {result.isCorrect ? 'Correct!' : 'Not quite!'}
              </span>
              {result.isCorrect && (
                <span className="bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 font-mono text-xs font-semibold px-2 py-0.5 rounded-md">
                  +{result.scoreEarned} pts
                </span>
              )}
            </div>

            {/* Detailed comparison if available */}
            {result.differencePercentage !== undefined ? (
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                Perceptual difference: <strong>{result.differencePercentage.toFixed(1)}%</strong>
              </p>
            ) : !result.isCorrect ? (
              <div className="text-xs space-y-0.5 text-zinc-600 dark:text-zinc-300">
                <p>
                  Target was: <span className="font-mono font-semibold">{result.targetCategory || result.targetHex}</span>
                </p>
                {result.playerAnswerLabel && (
                  <p>
                    Your choice: <span className="font-mono font-medium">{result.playerAnswerLabel}</span>
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>

        {/* Advance Button */}
        <Button
          onClick={onNext}
          size="sm"
          variant={result.isCorrect ? 'primary' : 'secondary'}
          className="flex-shrink-0 gap-1.5"
          aria-label={isLastRound ? 'See final results' : 'Go to next round'}
        >
          <span>{isLastRound ? 'See Results' : 'Next'}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
