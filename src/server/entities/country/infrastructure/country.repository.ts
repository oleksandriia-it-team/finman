import { CrudApiRepository } from '../../../shared/infrastructure/crud.api.repository';
import { CountryOrm } from './country.orm';
import { CountriesAndLocalesFilter } from '@common/domains/lookups/filters/countries-and-locales.filter';
import { FindOptionsWhere, ILike, In, Not } from 'typeorm';
import { DeepPartial } from '@common/models/deep-partial.model';

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
}

export const countryRepository = new CountryRepository(CountryOrm);
