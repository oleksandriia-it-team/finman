import { useCallback, useEffect, useRef, useState } from 'react';
import { UseInactivityTimerResult } from '../models/use-inactivity-timer-result.model';

export function useInactivityTimer(
  timeoutMs: number,
  onTimeout: () => void
): UseInactivityTimerResult {
  const [ timeLeft, setTimeLeft ] = useState<number>(
    () => (timeoutMs > 0 ? Math.ceil(timeoutMs / 1000) : 0)
  );

  const lastActivityRef = useRef<number>(Date.now());
  const onTimeoutRef = useRef(onTimeout);
  const hasTimedOutRef = useRef(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [ onTimeout ]);

  const reset = useCallback(() => {
    lastActivityRef.current = Date.now();
    hasTimedOutRef.current = false;
    setTimeLeft(timeoutMs > 0 ? Math.ceil(timeoutMs / 1000) : 0);
  }, [ timeoutMs ]);

  useEffect(() => {
    if (timeoutMs <= 0) {
      setTimeLeft(0);
      return;
    }

    reset();

    const handler = () => {
      lastActivityRef.current = Date.now();
      hasTimedOutRef.current = false;
    };

    const events: (keyof DocumentEventMap)[] = [
      'mousemove',
      'mousedown',
      'scroll',
      'keydown',
      'click',
      'touchstart',
    ];

    events.forEach((ev) =>
      document.addEventListener(ev, handler as EventListener, { passive: true })
    );

    intervalRef.current = window.setInterval(() => {
      const expiry = lastActivityRef.current + timeoutMs;
      const rem = Math.max(0, Math.ceil((expiry - Date.now()) / 1000));
      setTimeLeft((prev) => (prev !== rem ? rem : prev));

      if (rem === 0 && !hasTimedOutRef.current) {
        hasTimedOutRef.current = true;
        onTimeoutRef.current();
      }
    }, 500);

    return () => {
      events.forEach((ev) =>
        document.removeEventListener(ev, handler as EventListener)
      );
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [ timeoutMs, reset ]);

  return { timeLeft, reset };
}