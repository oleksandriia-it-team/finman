import { LookupsTypeEnum } from '../enums/lookups-type.enum';
import { CountryAndLocale } from '../../../records/countries.record';
import { Currency } from '../../../records/currencies.record';

export interface LookupsDto {
  [LookupsTypeEnum.CountriesAndLocales]: CountryAndLocale;
  [LookupsTypeEnum.Currency]: Currency;
}
