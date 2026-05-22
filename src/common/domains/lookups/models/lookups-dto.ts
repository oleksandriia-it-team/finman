import { type LookupsTypeEnum } from '../enums/lookups-type.enum';
import type { Currency } from '@common/records/currencies.record';
import type { CountryAndLocale } from '@common/records/countries.record';

export interface LookupsDto {
  [LookupsTypeEnum.CountriesAndLocales]: CountryAndLocale;
  [LookupsTypeEnum.Currency]: Currency;
}
