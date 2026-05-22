import type { TotpOrm } from '@backend/entities/totp/infrastructure/totp.orm';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export function TotpNotEnabledGuard(totp: TotpOrm | undefined | null): ApiResultOperationError | null {
  if (!totp || !totp.enabled) {
    return null;
  }

  return { status: 403, message: 'Двухфакторна аутентефікація вже увімкнена' };
}
