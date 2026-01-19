import { LookupsTypeEnum } from '../../server/shared/enums/lookups-type.enum';
import { CountriesAndLocalesFilter } from '../../app/api/lookups/countries-and-locales/shared/filters/countries-and-locales.filter';
import { LanguagesFilter } from '../../app/api/lookups/languages/shared/filters/languages.filter';
import { CurrencyFilter } from '../../app/api/lookups/currencies/shared/filters/currency.filter';

export interface LookupsFilters {
  [LookupsTypeEnum.Languages]: LanguagesFilter;
  [LookupsTypeEnum.CountriesAndLocales]: CountriesAndLocalesFilter;
  [LookupsTypeEnum.Currency]: CurrencyFilter;
}