import { useEffect } from 'react';

export function useEventHandler<T extends Event = Event>(
  eventName: string,
  target: Element | undefined | null,
  callback: (event: T) => void,
) {
  useEffect(() => {
    if (!target) {
      return;
    }

    target.addEventListener(eventName, callback as never);

    return () => {
      target.removeEventListener(eventName, callback as never);
    };
  }, [target, callback, eventName]);
}
