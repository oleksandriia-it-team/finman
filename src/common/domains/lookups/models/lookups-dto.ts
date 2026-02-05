import { LookupsTypeEnum } from '../enums/lookups-type.enum';
import { Language } from '../../../records/languages.record';
import { CountryAndLocale } from '../../../records/countries.record';
import { Currency } from '../../../records/currencies.record';

export interface LookupsDto {
  [LookupsTypeEnum.Languages]: Language;
  [LookupsTypeEnum.CountriesAndLocales]: CountryAndLocale;
  [LookupsTypeEnum.Currency]: Currency;
}
