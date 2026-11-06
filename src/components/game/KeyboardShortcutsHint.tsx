import React from 'react';
import { Keyboard } from 'lucide-react';

interface KeyboardShortcutsHintProps {
  isAnswered: boolean;
  choicesCount: number;
}

export const KeyboardShortcutsHint: React.FC<KeyboardShortcutsHintProps> = ({
  isAnswered,
  choicesCount,
}) => {
  return (
    <div className="hidden sm:flex items-center justify-center gap-2 mt-3 text-xs text-zinc-400 dark:text-zinc-500 font-medium select-none">
      <Keyboard className="w-3.5 h-3.5" />
      <span>Keyboard:</span>
      {!isAnswered ? (
        <span className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 font-mono text-xs">
          1-{choicesCount}
        </span>
      ) : (
        <span className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 font-mono text-xs">
          Space / Enter (Next)
        </span>
      )}
    </div>
  );
};
