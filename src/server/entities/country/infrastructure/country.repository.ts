import { CrudApiRepository } from '../../../shared/infrastructure/crud.api.repository';
import { CountryOrm } from './country.orm';

export class CountryRepository extends CrudApiRepository<CountryOrm> {}

export const countryRepository = new CountryRepository(CountryOrm);
