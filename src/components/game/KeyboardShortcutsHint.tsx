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
    <div className="hidden sm:flex items-center justify-center gap-2 mt-3 text-[11px] text-slate-400 dark:text-slate-500 font-medium select-none">
      <Keyboard className="w-3.5 h-3.5" />
      <span>Keyboard Shortcuts:</span>
      {!isAnswered ? (
        <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
          1–{choicesCount}
        </span>
      ) : (
        <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
          Space / Enter (Next)
        </span>
      )}
    </div>
  );
};
