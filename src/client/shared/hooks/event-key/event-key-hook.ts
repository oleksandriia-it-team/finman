import { useEffect } from 'react';

export function useEventKey(
  target: Element | undefined | null,
  keys: string[],
  callback: (e: KeyboardEvent, key: string) => void,
) {
  useEffect(() => {
    if (!target) {
      return;
    }

    const handler = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) {
        callback(e, e.key);
      }
    };

    target.addEventListener('keydown', handler as never);

    return () => {
      target.removeEventListener('keydown', handler as never);
    };
  }, [callback, keys, target]);
}
