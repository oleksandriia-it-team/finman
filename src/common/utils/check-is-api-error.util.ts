import { AppError } from '@common/classes/api-error.class';

export function checkIsApiError(error: unknown): error is AppError {
  return error instanceof AppError;
}
