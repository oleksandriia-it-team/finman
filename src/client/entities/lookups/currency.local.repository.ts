import { CrudLocalRepository } from '../../database/crud/crud.local.repository';
import { type DatabaseLocalService, databaseLocalService } from '../../database/database.local.service';
import { Tables } from '@frontend/shared/constants/database.constants';
import type { Currency } from '@common/records/currencies.record';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { CurrencyFilter } from '@common/domains/lookups/filters/currency.filter';
import type { FilterPredicate } from '@frontend/shared/models/local-filter.model';
import type { DeepPartial } from '@common/models/deep-partial.model';
import { searchItem } from '@common/utils/search-item.util';

export class CurrencyLocalRepository extends CrudLocalRepository<Currency, CurrencyFilter> {
  constructor(databaseLocalService: DatabaseLocalService) {
    super(databaseLocalService, Tables.CurrenciesTable.name);
  }

  createItem(data: Omit<Currency, DefaultColumnKeys>): Promise<number> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, data);
  }

  async updateItem(id: number, data: Omit<Currency, DefaultColumnKeys>): Promise<true> {
    return this.databaseLocalService.updateOrCreateItem(this.tableName, { ...data, id }).then(() => true as const);
  }

  deleteItem(id: number): Promise<true> {
    return this.databaseLocalService.deleteItem(this.tableName, id, false);
  }

  protected override mapFilters(filters: DeepPartial<CurrencyFilter> | undefined): FilterPredicate<Currency>[] {
    const predicates: FilterPredicate<Currency>[] = [];
    if (!filters) return predicates;

    if (Array.isArray(filters.ids) && filters.ids.length) {
      const ids = filters.ids as number[];
      predicates.push((item) => ids.includes(item.id));
    }
    if (Array.isArray(filters.excludeIds) && filters.excludeIds.length) {
      const excludeIds = filters.excludeIds as number[];
      predicates.push((item) => !excludeIds.includes(item.id));
    }
    if (filters.code) {
      predicates.push((item) => searchItem(item.currencyCode, filters.code as string));
    }
    if (filters.name) {
      predicates.push((item) => searchItem(item.currencyName, filters.name as string));
    }
    if (filters.symbol) {
      predicates.push((item) => searchItem(item.currencySymbol, filters.symbol as string));
    }
    return predicates;
  }
}

export const currencyLocalRepository = new CurrencyLocalRepository(databaseLocalService);
