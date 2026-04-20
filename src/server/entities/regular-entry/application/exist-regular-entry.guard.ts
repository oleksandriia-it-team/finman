import type { RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export function ExistRegularEntryGuard(regularEntry: RegularEntryOrm | null): ApiResultOperationError | null {
  if (!regularEntry || !!regularEntry.softDeleted) {
    return {
      status: 404,
      message: 'Регулярна операція не знайдена',
    };
  }

  return null;
}
