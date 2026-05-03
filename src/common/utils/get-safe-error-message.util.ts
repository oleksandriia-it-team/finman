import { ErrorTexts } from '../constants/error-texts.contant';
import { checkIsAppErrorObj } from '@common/utils/check-is-api-error.util';
import { isDevMode } from '@common/utils/is-dev-mode.util';

// This function is used to safely extract the error message from an unknown error object.
// Otherwise, repository errors can be shown in the frontend side, which is not desired
export function getSafeErrorMessage(error: unknown): string {
  const isAppError = checkIsAppErrorObj(error);

  if (!isAppError) {
    if (isDevMode()) {
      console.error(error);
    }
    return ErrorTexts.UnknownError;
  }

  return error.message;
}
