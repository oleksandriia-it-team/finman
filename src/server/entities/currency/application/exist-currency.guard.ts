import type { CurrencyOrm } from '@backend/entities/currency/infrastructure/currency.orm';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export function ExistCurrencyGuard(currency: CurrencyOrm | null): ApiResultOperationError | null {
  if (!currency || !!currency.softDeleted) {
    return { status: 404, message: 'Валюту не знайдено' };
  }
  return null;
}
