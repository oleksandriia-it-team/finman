import { isEmpty } from '@common/utils/is-empty.util';
import { getSafeErrorMessage } from '@common/utils/get-safe-error-message.util';

export function getFirstErrorMessage(...errors: (Error | string | null | undefined)[]) {
  const error = errors.find((error) => !!error);

  if (isEmpty(error)) {
    return undefined;
  }

  if (typeof error === 'string') {
    return error;
  }

  return getSafeErrorMessage(error);
}
