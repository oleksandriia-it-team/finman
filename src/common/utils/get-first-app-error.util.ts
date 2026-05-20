import { AppError } from '@common/classes/app-error.class';

export function getFirstAppError(...errors: unknown[]): AppError | null {
  for (const err of errors) {
    if (err instanceof AppError) return err;
  }

  return null;
}
