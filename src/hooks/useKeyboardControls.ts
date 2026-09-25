import { useEffect } from 'react';

interface KeyboardControlsOptions {
  onSelectChoice?: (index: number) => void;
  onNextRound?: () => void;
  choicesCount: number;
  roundStatus: 'guessing' | 'answered' | 'completed';
  disabled?: boolean;
}

export function useKeyboardControls({
  onSelectChoice,
  onNextRound,
  choicesCount,
  roundStatus,
  disabled = false,
}: KeyboardControlsOptions) {
  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (roundStatus === 'guessing' && onSelectChoice) {
        const num = parseInt(e.key, 10);
        if (!isNaN(num) && num >= 1 && num <= choicesCount) {
          e.preventDefault();
          onSelectChoice(num - 1);
          return;
        }
      }

      if (roundStatus === 'answered' && onNextRound) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNextRound();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, roundStatus, choicesCount, onSelectChoice, onNextRound]);
}
