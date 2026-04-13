import { type ApiResultOperationError } from '@common/models/api-result-operation.model';
import { type RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';

export function OwnsRegularEntryGuard(
  regularEntry: RegularEntryOrm | null,
  userId: number,
  exactlyExist: boolean = false,
): ApiResultOperationError | null {
  if (exactlyExist && !regularEntry) {
    return {
      status: 404,
      message: 'Регулярна операція не знайдена',
    };
  }

  if (!exactlyExist && !regularEntry) {
    return null;
  }

  if (regularEntry?.userId !== userId) {
    return {
      status: 403,
      message: 'Регулярна операція не належить вам',
    };
  }

  return null;
}
