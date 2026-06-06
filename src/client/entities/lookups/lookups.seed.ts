import { databaseLocalService } from '@frontend/database/database.local.service';
import { Tables } from '@frontend/shared/constants/database.constants';
import type { Currency } from '@common/records/currencies.record';
import type { CountryAndLocale } from '@common/records/countries.record';

const CURRENCIES_URL = '/json/currencies.json';
const COUNTRIES_URL = '/json/countries.json';

async function seedTable<T>(tableName: string, url: string): Promise<void> {
  const count = await databaseLocalService.table(tableName).count();
  if (count > 0) return;

  const response = await fetch(url);
  if (!response.ok) return;
  const items: Omit<T, 'id' | 'softDeleted'>[] = await response.json();

  await databaseLocalService.table(tableName).bulkAdd(items.map((item) => ({ ...item, softDeleted: 0 })) as never);
}

export async function seedLookups(): Promise<void> {
  await Promise.all([
    seedTable<Currency>(Tables.CurrenciesTable.name, CURRENCIES_URL),
    seedTable<CountryAndLocale>(Tables.CountriesAndLocalesTable.name, COUNTRIES_URL),
  ]).catch(() => {});
}
