// Use merge
// Accepts a list of states and initial state
// Returns the state value that changed last time
// Represents mergeWith behaviour in RxJs
import { useRef, useState } from 'react';

export function useMerge<T>(states: T[], initial: T): T;
export function useMerge<T>(states: T[], initial?: T | undefined): T | undefined {
  const [state, setState] = useState<T | undefined>(initial);

  const prevJSON = useRef<string>('');
  const prev = useRef<T[]>(undefined);

  const currJSON = JSON.stringify(states);

  if (currJSON !== prevJSON.current) {
    const valueChanged = states.find((_, i) => states[i] !== prev.current?.[i]);

    prevJSON.current = currJSON;
    prev.current = states;

    setState(valueChanged);
  }

  return state;
}
