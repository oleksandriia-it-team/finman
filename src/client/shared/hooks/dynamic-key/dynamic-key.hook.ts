import { useRef } from 'react';

export function useDynamicKey(changeOn: unknown): number {
  const prevDep = useRef(changeOn);
  const keyRef = useRef(0);

  if (changeOn !== prevDep.current) {
    keyRef.current += 1;
    prevDep.current = changeOn;
  }

  return keyRef.current;
}
