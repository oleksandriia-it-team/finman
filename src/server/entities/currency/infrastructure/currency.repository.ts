import { CrudApiRepository } from '../../../database/crud.api.repository';
import { CurrencyOrm } from './currency.orm';
import { type CurrencyFilter } from '@common/domains/lookups/filters/currency.filter';
import { type FindOptionsWhere, ILike, In, Not } from 'typeorm';
import { type DeepPartial } from '@common/models/deep-partial.model';
import { calculateSkipAndLimit } from '@common/utils/calculate-skip-and-take.util';

export class CurrencyRepository extends CrudApiRepository<CurrencyOrm, CurrencyFilter> {
  protected override mapFilters(filters: DeepPartial<CurrencyFilter> | undefined): FindOptionsWhere<CurrencyOrm> {
    const where: FindOptionsWhere<CurrencyOrm> = {};
    if (!filters) return where;

    if (filters.ids?.length) where.id = In(filters.ids);
    if (filters.excludeIds?.length) where.id = Not(In(filters.excludeIds));
    if (filters.code) where.currencyCode = ILike(`%${filters.code}%`);
    if (filters.name) where.currencyName = ILike(`%${filters.name}%`);
    if (filters.symbol) where.currencySymbol = ILike(`%${filters.symbol}%`);

    return where;
  }

  override async getItems(
    from: number,
    to: number,
    filters?: DeepPartial<CurrencyFilter>,
    getCreatedBy?: boolean,
  ): Promise<CurrencyOrm[]> {
    const { skip, take } = calculateSkipAndLimit(from, to);

    return await this.repository.find({
      where: this.mapFilters(filters),
      skip,
      take,
      relations: { admin: getCreatedBy ?? false },
    });
  }
}

export const currencyRepository = new CurrencyRepository(CurrencyOrm);
