import { CrudApiRepository } from '../../../database/crud.api.repository';
import { CountryOrm } from './country.orm';
import { type CountriesAndLocalesFilter } from '@common/domains/lookups/filters/countries-and-locales.filter';
import { type FindOptionsWhere, ILike, In, Not } from 'typeorm';
import { type DeepPartial } from '@common/models/deep-partial.model';
import { calculateSkipAndLimit } from '@common/utils/calculate-skip-and-take.util';

export class CountryRepository extends CrudApiRepository<CountryOrm, CountriesAndLocalesFilter> {
  protected override mapFilters(
    filters: DeepPartial<CountriesAndLocalesFilter> | undefined,
  ): FindOptionsWhere<CountryOrm> {
    const where: FindOptionsWhere<CountryOrm> = {};
    if (!filters) {
      return where;
    }

    if (filters.ids?.length) {
      where.id = In(filters.ids);
    }
    if (filters.excludeIds?.length) {
      where.id = Not(In(filters.excludeIds));
    }
    if (filters.country) {
      where.country = ILike(`%${filters.country}%`);
    }
    if (filters.locale) {
      where.locale = ILike(`%${filters.locale}%`);
    }

    return where;
  }

  override async getItems(
    from: number,
    to: number,
    filters?: DeepPartial<CountriesAndLocalesFilter>,
    getCreatedBy?: boolean,
  ): Promise<CountryOrm[]> {
    const { skip, take } = calculateSkipAndLimit(from, to);

    return await this.repository.find({
      where: this.mapFilters(filters),
      skip,
      take,
      relations: { admin: getCreatedBy ?? false },
    });
  }
}

export const countryRepository = new CountryRepository(CountryOrm);
