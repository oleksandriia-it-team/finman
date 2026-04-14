import { UserOrm } from '../entities/user/infrastructure/user.orm';
import { CurrencyOrm } from '../entities/currency/infrastructure/currency.orm';
import { CountryOrm } from '../entities/country/infrastructure/country.orm';

export const Entities = [UserOrm, CurrencyOrm, CountryOrm];
