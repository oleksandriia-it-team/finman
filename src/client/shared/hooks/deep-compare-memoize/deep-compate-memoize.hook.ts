import { useRef } from 'react';

export function useDeepCompareMemoize<T>(value: T): T {
  const ref = useRef<T>(value);
  if (JSON.stringify(value) !== JSON.stringify(ref.current)) {
    ref.current = value;
  }
  return ref.current;
}
