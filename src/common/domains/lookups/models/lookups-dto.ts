import { type LookupsTypeEnum } from '../enums/lookups-type.enum';
import type { ErrorLogRecord } from '@common/records/error-log.record';
import type { Currency } from '@common/records/currencies.record';
import type { CountryAndLocale } from '@common/records/countries.record';

export interface LookupsDto {
  [LookupsTypeEnum.CountriesAndLocales]: CountryAndLocale;
  [LookupsTypeEnum.Currency]: Currency;
  [LookupsTypeEnum.ErrorLog]: ErrorLogRecord;
}
