import { checkIsAppErrorObj } from '@common/utils/check-is-api-error.util';

export function getFirstErrorStatus(...errors: unknown[]): number | undefined {
  for (const err of errors) {
    if (typeof err === 'number' && !Number.isNaN(err)) {
      return err;
    }

    if (err === null || err === undefined) continue;

    if (checkIsAppErrorObj(err)) {
      return (err as { status: number }).status;
    }
  }

  return undefined;
}
