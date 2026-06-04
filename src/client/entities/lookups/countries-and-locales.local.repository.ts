import { CrudLocalRepository } from '../../database/crud/crud.local.repository';
import { type DatabaseLocalService, databaseLocalService } from '../../database/database.local.service';
import { Tables } from '@frontend/shared/constants/database.constants';
import type { CountryAndLocale } from '@common/records/countries.record';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { CountriesAndLocalesFilter } from '@common/domains/lookups/filters/countries-and-locales.filter';
import type { FilterPredicate } from '@frontend/shared/models/local-filter.model';
import type { DeepPartial } from '@common/models/deep-partial.model';
import { searchItem } from '@common/utils/search-item.util';

export class CountriesAndLocalesLocalRepository extends CrudLocalRepository<
  CountryAndLocale,
  CountriesAndLocalesFilter
> {
  constructor(databaseLocalService: DatabaseLocalService) {
    super(databaseLocalService, Tables.CountriesAndLocalesTable.name);
  }

  createItem(data: Omit<CountryAndLocale, DefaultColumnKeys>): Promise<number> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, data);
  }

  async updateItem(id: number, data: Omit<CountryAndLocale, DefaultColumnKeys>): Promise<true> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, { ...data, id }).then(() => true as const);
  }

  deleteItem(id: number): Promise<true> {
    return this.databaseLocalService.deleteItem(this.tableName, id, false);
  }

  protected override mapFilters(
    filters: DeepPartial<CountriesAndLocalesFilter> | undefined,
  ): FilterPredicate<CountryAndLocale>[] {
    const predicates: FilterPredicate<CountryAndLocale>[] = [];
    if (!filters) return predicates;

    if (Array.isArray(filters.ids) && filters.ids.length) {
      const ids = filters.ids as number[];
      predicates.push((item) => ids.includes(item.id));
    }
    if (Array.isArray(filters.excludeIds) && filters.excludeIds.length) {
      const excludeIds = filters.excludeIds as number[];
      predicates.push((item) => !excludeIds.includes(item.id));
    }
    if (filters.country) {
      predicates.push((item) => searchItem(item.country, filters.country as string));
    }
    if (filters.locale) {
      predicates.push((item) => searchItem(item.locale, filters.locale as string));
    }
    return predicates;
  }
}

export const countriesAndLocalesLocalRepository = new CountriesAndLocalesLocalRepository(databaseLocalService);
