import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
  durationSeconds: number;
  onExpire?: () => void;
  autoStart?: boolean;
}

export function useTimer({ durationSeconds, onExpire, autoStart = false }: UseTimerOptions) {
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const startTimeRef = useRef<number | null>(null);
  const timerIdRef = useRef<number | null>(null);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const stop = useCallback(() => {
    setIsRunning(false);
    startTimeRef.current = null;
    if (timerIdRef.current !== null) {
      window.clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    startTimeRef.current = Date.now();
    setRemainingSeconds(durationSeconds);
    setIsRunning(true);
  }, [durationSeconds, stop]);

  const reset = useCallback(
    (newDuration?: number) => {
      stop();
      const dur = newDuration !== undefined ? newDuration : durationSeconds;
      setRemainingSeconds(dur);
    },
    [durationSeconds, stop]
  );

  useEffect(() => {
    if (!isRunning) return;

    const startTimestamp = startTimeRef.current || Date.now();
    startTimeRef.current = startTimestamp;

    timerIdRef.current = window.setInterval(() => {
      const elapsedSec = (Date.now() - startTimestamp) / 1000;
      const left = Math.max(0, durationSeconds - elapsedSec);
      setRemainingSeconds(Math.ceil(left));

      if (left <= 0) {
        stop();
        if (onExpireRef.current) {
          onExpireRef.current();
        }
      }
    }, 100);

    return () => {
      if (timerIdRef.current !== null) {
        window.clearInterval(timerIdRef.current);
        timerIdRef.current = null;
      }
    };
  }, [isRunning, durationSeconds, stop]);

  return {
    remainingSeconds,
    isRunning,
    start,
    stop,
    reset,
  };
}
