import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export function isSuccessOr400Error(state: PromiseState, error?: ApiResultOperationError | undefined | null) {
  return state === PromiseState.Success || (state === PromiseState.Error && error?.status === 400);
}
