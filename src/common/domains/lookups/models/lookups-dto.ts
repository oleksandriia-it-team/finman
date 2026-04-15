import { type LookupsTypeEnum } from '../enums/lookups-type.enum';
import { type CountryAndLocale } from '../../../records/countries.record';
import { type Currency } from '../../../records/currencies.record';

export interface LookupsDto {
  [LookupsTypeEnum.CountriesAndLocales]: CountryAndLocale;
  [LookupsTypeEnum.Currency]: Currency;
}
