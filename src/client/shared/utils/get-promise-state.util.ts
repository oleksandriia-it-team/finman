import { PromiseState } from '@frontend/shared/enums/promise-state.enum';

export function getPromiseState(status: 'error' | 'pending' | 'idle' | 'success'): PromiseState {
  if (status === 'error') {
    return PromiseState.Error;
  }

  if (status === 'pending') {
    return PromiseState.Loading;
  }

  return PromiseState.Success;
}
