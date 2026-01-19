import { LookupsTypeEnum } from '../../server/shared/enums/lookups-type.enum';
import { Language } from '../../app/api/lookups/languages/shared/models/languages.model';
import { CountryAndLocale } from '../../app/api/lookups/countries-and-locales/shared/models/countries-and-locales.model';
import { Currency } from '../../app/api/lookups/currencies/shared/models/currencies.model';

export interface LookupsDto {
  [LookupsTypeEnum.Languages]: Language;
  [LookupsTypeEnum.CountriesAndLocales]: CountryAndLocale;
  [LookupsTypeEnum.Currency]: Currency;
}