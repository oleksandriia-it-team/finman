import { Language } from './languages.model';
import { CountryAndLocale } from './countries-and-locales.model';
import { LookupsTypeEnum } from '../enums/lookups-type.enum';

export interface GetLookupsItemsResult {
  [LookupsTypeEnum.Languages]: Language;
  [LookupsTypeEnum.CountriesAndLocales]: CountryAndLocale;
}