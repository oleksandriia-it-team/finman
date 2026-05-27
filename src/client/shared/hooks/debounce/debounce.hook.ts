import { useEffect, useRef, useState } from 'react';
import { isEmpty } from '@common/utils/is-empty.util';

export function useDebounce(value: string, time: number = 300): string {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    ref.current = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => {
      if (!isEmpty(ref.current)) {
        clearTimeout(ref.current);
      }
      ref.current = null;
    };
  });

  return debouncedValue;
}
