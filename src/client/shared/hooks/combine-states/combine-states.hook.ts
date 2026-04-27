import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { useMemo } from 'react';

export function useCombineStates(...states: PromiseState[]): PromiseState {
  return useMemo(() => {
    const isError = states.some((state) => state === PromiseState.Error);

    if (isError) {
      return PromiseState.Error;
    }

    const isLoading = states.some((state) => state === PromiseState.Loading);

    if (isLoading) {
      return PromiseState.Loading;
    }

    return PromiseState.Success;
  }, [states]);
}
