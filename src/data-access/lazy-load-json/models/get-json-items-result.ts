import { JSONFileNames } from '../enums/json-files.enum';
import { Language } from './languages.model';
import { CountryAndLocale } from './countries-and-locales.model';

export interface GetJsonItemsResult {
  [JSONFileNames.Languages]: Language;
  [JSONFileNames.CountriesAndLocales]: CountryAndLocale;
}