import { LookupsTypeEnum } from '../enums/lookups-type.enum';
import { CountriesAndLocalesFilter } from '../filters/countries-and-locales.filter';
import { LanguagesFilter } from '../filters/languages.filter';
import { CurrencyFilter } from '../filters/currency.filter';

export interface LookupsFilters {
  [LookupsTypeEnum.Languages]: LanguagesFilter;
  [LookupsTypeEnum.CountriesAndLocales]: CountriesAndLocalesFilter;
  [LookupsTypeEnum.Currency]: CurrencyFilter;
}
