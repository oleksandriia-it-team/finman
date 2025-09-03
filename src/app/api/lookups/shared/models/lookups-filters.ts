import { LookupsTypeEnum } from '../enums/lookups-type.enum';
import { CountriesAndLocalesFilter } from '../../countries-and-locales/shared/filters/countries-and-locales.filter';
import { LanguagesFilter } from '../../languages/shared/filters/languages.filter';
import { CurrencyFilter } from '../../currencies/shared/filters/currency.filter';

export interface LookupsFilters {
  [LookupsTypeEnum.Languages]: LanguagesFilter;
  [LookupsTypeEnum.CountriesAndLocales]: CountriesAndLocalesFilter;
  [LookupsTypeEnum.Currency]: CurrencyFilter;
}