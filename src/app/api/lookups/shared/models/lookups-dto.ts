import { LookupsTypeEnum } from '../enums/lookups-type.enum';
import { Language } from '../../languages/shared/models/languages.model';
import { CountryAndLocale } from '../../countries-and-locales/shared/models/countries-and-locales.model';

export interface LookupsDto {
  [LookupsTypeEnum.Languages]: Language;
  [LookupsTypeEnum.CountriesAndLocales]: CountryAndLocale;
}