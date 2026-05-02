import type { CountryOrm } from '@backend/entities/country/infrastructure/country.orm';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export function ExistCountryGuard(country: CountryOrm | null): ApiResultOperationError | null {
  if (!country || !!country.softDeleted) {
    return { status: 404, message: 'Країну не знайдено' };
  }
  return null;
}
