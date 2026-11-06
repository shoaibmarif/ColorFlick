import React, { useState } from 'react';
import { RoundResult } from '../../types/game';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';

interface RoundHistoryProps {
  history: RoundResult[];
}

export const RoundHistory: React.FC<RoundHistoryProps> = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!history || history.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto my-3 bg-white/70 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span>Round History</span>
          <span className="bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded-full text-xs font-mono">
            {history.length}
          </span>
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="max-h-48 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-700/50 p-2 text-xs">
          {history.map((item) => (
            <div
              key={item.roundNumber}
              className="flex items-center justify-between py-1.5 px-2 hover:bg-zinc-50 dark:hover:bg-zinc-700/30 rounded-lg"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-zinc-400 w-4">{item.roundNumber}</span>
                {item.isCorrect ? (
                  <span className="text-emerald-500 font-semibold flex items-center">
                    <Check className="w-3.5 h-3.5 mr-0.5" />
                  </span>
                ) : (
                  <span className="text-rose-500 font-semibold flex items-center">
                    <X className="w-3.5 h-3.5 mr-0.5" />
                  </span>
                )}
                {/* Target Swatch */}
                <div
                  className="w-4 h-4 rounded-md shadow-card ring-1 ring-black/10"
                  style={{ backgroundColor: item.targetHex }}
                  title={`Target: ${item.targetHex}`}
                />
                {item.playerHex && (
                  <div
                    className="w-4 h-4 rounded-md shadow-card ring-1 ring-black/10"
                    style={{ backgroundColor: item.playerHex }}
                    title={`Your choice: ${item.playerHex}`}
                  />
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-zinc-400 text-xs">
                  {(item.responseTimeMs / 1000).toFixed(1)}s
                </span>
                <span className="font-mono font-semibold text-zinc-700 dark:text-zinc-200">
                  +{item.scoreEarned}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
