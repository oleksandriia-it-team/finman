import { CrudApiRepository } from '../../../shared/infrastructure/crud.api.repository';
import { CurrencyOrm } from './currency.orm';

export class CurrencyRepository extends CrudApiRepository<CurrencyOrm> {}

export const currencyRepository = new CurrencyRepository(CurrencyOrm);
