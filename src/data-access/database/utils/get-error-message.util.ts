import { isEmpty } from '../../../shared/utils/is-empty.util';
import { ErrorTexts } from '../constants/database.constants';

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && !isEmpty(error)) {
    return 'message' in error && typeof error.message === 'string' ? error.message : ErrorTexts.UnknownError;
  }

  return ErrorTexts.UnknownError;
}