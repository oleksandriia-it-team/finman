import { useEffect, useRef } from 'react';

export function usePreviousValue<T, P extends T | undefined>(value: T, initialValue?: P): P {
  const ref = useRef<P>(initialValue);

  useEffect(() => {
    ref.current = value as P;
  }, [value]);

  return ref.current as P;
}
