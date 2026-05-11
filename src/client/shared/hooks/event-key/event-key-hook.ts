import { useEffect, useRef } from 'react';

export function useEventKey(
  target: Element | undefined | null,
  keys: string[],
  callback: (e: KeyboardEvent, key: string) => void,
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const keysRef = useRef(keys);
  keysRef.current = keys;

  useEffect(() => {
    if (!target) {
      return;
    }

    const handler = (e: KeyboardEvent) => {
      if (keysRef.current.includes(e.key)) {
        callbackRef.current(e, e.key);
      }
    };

    target.addEventListener('keydown', handler as never);

    return () => {
      target.removeEventListener('keydown', handler as never);
    };
  }, [target]);
}
