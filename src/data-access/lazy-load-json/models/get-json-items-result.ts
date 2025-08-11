import { JSONFileNames } from '../enums/json-files.enum.js';
import { Language } from './languages.model.js';
import { CountryAndLocale } from './countries-and-locales.model.js';

export interface GetJsonItemsResult {
  [JSONFileNames.Languages]: Language;
  [JSONFileNames.CountriesAndLocales]: CountryAndLocale;
}