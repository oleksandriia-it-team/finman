import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { useMemo } from 'react';
import { isEmpty } from '@common/utils/is-empty.util';

export function useCombineStates(...states: (PromiseState | undefined | null)[]): PromiseState {
  return useMemo(() => {
    const realStatuses = states.filter((state): state is PromiseState => !isEmpty(state));

    const isError = realStatuses.some((state) => state === PromiseState.Error);

    if (isError) {
      return PromiseState.Error;
    }

    const isLoading = realStatuses.some((state) => state === PromiseState.Loading);

    if (isLoading) {
      return PromiseState.Loading;
    }

    return PromiseState.Success;
  }, [states]);
}
