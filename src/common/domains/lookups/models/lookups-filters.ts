import { type LookupsTypeEnum } from '../enums/lookups-type.enum';
import { type CountriesAndLocalesFilter } from '../filters/countries-and-locales.filter';
import { type CurrencyFilter } from '../filters/currency.filter';

export interface LookupsFilters {
  [LookupsTypeEnum.CountriesAndLocales]: CountriesAndLocalesFilter;
  [LookupsTypeEnum.Currency]: CurrencyFilter;
}
