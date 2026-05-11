import { useEffect, useRef } from 'react';

export function useEventContainment(elements: HTMLElement[], eventName: string, handler: (isInside: boolean) => void) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const elementsRef = useRef(elements);
  elementsRef.current = elements;

  useEffect(() => {
    const listener = (event: Event) => {
      const target = event.target as HTMLElement;
      const isInside = elementsRef.current.some((el) => el === target || el.contains(target));
      handlerRef.current(isInside);
    };

    document.addEventListener(eventName, listener);

    return () => {
      document.removeEventListener(eventName, listener);
    };
  }, [eventName]);
}
