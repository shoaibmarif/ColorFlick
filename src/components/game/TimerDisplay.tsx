import React from 'react';
import { Clock } from 'lucide-react';

interface TimerDisplayProps {
  remainingSeconds: number;
  totalDurationSeconds: number;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  remainingSeconds,
  totalDurationSeconds,
}) => {
  const percentage = Math.max(0, Math.min(100, (remainingSeconds / totalDurationSeconds) * 100));

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLow = remainingSeconds <= 10;

  return (
    <div className="w-full space-y-1.5">
      <div className="flex justify-between items-center text-xs font-semibold">
        <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300">
          <Clock className={`w-3.5 h-3.5 ${isLow ? 'text-rose-500' : 'text-zinc-400'}`} />
          <span>Time left</span>
        </div>
        <span
          className={`font-mono text-sm ${
            isLow
              ? 'text-rose-600 dark:text-rose-400 font-semibold'
              : 'text-zinc-900 dark:text-white'
          }`}
        >
          {formattedTime}
        </span>
      </div>

      <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-200 rounded-full ${
            remainingSeconds > totalDurationSeconds * 0.4
              ? 'bg-emerald-500'
              : remainingSeconds > totalDurationSeconds * 0.15
              ? 'bg-amber-500'
              : 'bg-rose-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
