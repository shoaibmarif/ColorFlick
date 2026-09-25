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
    <div className="w-full max-w-md mx-auto my-3 bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span>Round History</span>
          <span className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full text-[10px] font-mono">
            {history.length}
          </span>
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50 p-2 text-xs">
          {history.map((item) => (
            <div
              key={item.roundNumber}
              className="flex items-center justify-between py-1.5 px-2 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-slate-400 w-4">{item.roundNumber}</span>
                {item.isCorrect ? (
                  <span className="text-emerald-500 font-bold flex items-center">
                    <Check className="w-3.5 h-3.5 mr-0.5" />
                  </span>
                ) : (
                  <span className="text-rose-500 font-bold flex items-center">
                    <X className="w-3.5 h-3.5 mr-0.5" />
                  </span>
                )}
                {/* Target Swatch */}
                <div
                  className="w-4 h-4 rounded-md shadow-xs ring-1 ring-black/10"
                  style={{ backgroundColor: item.targetHex }}
                  title={`Target: ${item.targetHex}`}
                />
                {item.playerHex && (
                  <div
                    className="w-4 h-4 rounded-md shadow-xs ring-1 ring-black/10"
                    style={{ backgroundColor: item.playerHex }}
                    title={`Your choice: ${item.playerHex}`}
                  />
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-400 text-[10px]">
                  {(item.responseTimeMs / 1000).toFixed(1)}s
                </span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-200">
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
