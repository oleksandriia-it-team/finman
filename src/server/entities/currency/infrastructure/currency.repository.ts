import { CrudApiRepository } from '../../../shared/infrastructure/crud.api.repository';
import { CurrencyOrm } from './currency.orm';
import { CurrencyFilter } from '@common/domains/lookups/filters/currency.filter';
import { FindOptionsWhere, ILike, In, Not } from 'typeorm';
import { DeepPartial } from '@common/models/deep-partial.model';

export class CurrencyRepository extends CrudApiRepository<CurrencyOrm, CurrencyFilter> {
  protected override mapFilters(filters: DeepPartial<CurrencyFilter> | undefined): FindOptionsWhere<CurrencyOrm> {
    const where: FindOptionsWhere<CurrencyOrm> = {};

    if (!filters) {
      return where;
    }

    if (filters.ids?.length) {
      where.id = In(filters.ids);
    }
    if (filters.excludeIds?.length) {
      where.id = Not(In(filters.excludeIds));
    }
    if (filters.currencyCode) {
      where.currencyCode = ILike(`%${filters.currencyCode}%`);
    }
    if (filters.currencyName) {
      where.currencyName = ILike(`%${filters.currencyName}%`);
    }
    if (filters.currencySymbol) {
      where.currencySymbol = ILike(`%${filters.currencySymbol}%`);
    }
    return where;
  }
}

export const currencyRepository = new CurrencyRepository(CurrencyOrm);
