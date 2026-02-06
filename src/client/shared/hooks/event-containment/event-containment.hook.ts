import { useEffect } from 'react';

export function useEventContainment(elements: HTMLElement[], eventName: string, handler: (isInside: boolean) => void) {
  useEffect(() => {
    const listener = (event: Event) => {
      const target = event.target as HTMLElement;

      const isInside = elements.some((el) => el === target || el.contains(target));

      handler(isInside);
    };

    document.addEventListener(eventName, listener);

    return () => {
      document.removeEventListener(eventName, listener);
    };
  }, [elements, eventName, handler]);
}
