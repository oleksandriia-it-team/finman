import type { TotpOrm } from '@backend/entities/totp/infrastructure/totp.orm';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export function TotpEnabledGuard(totp: TotpOrm | undefined | null): ApiResultOperationError | null {
  if (totp?.enabled) {
    return null;
  }

  return { status: 403, message: 'Двофакторна автентифікація не увімкнена' };
}
