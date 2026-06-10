import { type ApiResultOperationError } from '@common/models/api-result-operation.model';
import { type RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';
import { ErrorTexts } from '@common/constants/error-texts.constant';

export function OwnsRegularEntryGuard(
  regularEntry: RegularEntryOrm | null,
  userId: number,
): ApiResultOperationError | null {
  if (regularEntry?.userId !== userId) {
    return { status: 403, message: ErrorTexts.RegularEntryNotOwned };
  }

  return null;
}
