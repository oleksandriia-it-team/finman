import { z } from 'zod';
import { CountriesAndLocalesSchema } from '../schemas/countries-and-locales.schema';
import { CountryAndLocale } from '@common/records/countries.record';

type TotalCountSchema = z.infer<typeof CountriesAndLocalesSchema.totalCountSchema>;
type GetItemsSchema = z.infer<typeof CountriesAndLocalesSchema.itemsSchema>;

export function getCountriesAndLocalesFilters(
  body: TotalCountSchema | GetItemsSchema,
): ((countryAndLocale: CountryAndLocale) => boolean)[] {
  const { ids, excludeIds, country, locale } = body.filters ?? {};

  const emptyFilter = () => true;

  const idsFilter = ids ? (value: CountryAndLocale) => ids.includes(value.id) : emptyFilter;
  const excludeIdsFilter = excludeIds ? (value: CountryAndLocale) => !excludeIds.includes(value.id) : emptyFilter;
  const countryFilter = country ? (value: CountryAndLocale) => value.country.includes(country) : emptyFilter;
  const localeFilter = locale ? (value: CountryAndLocale) => value.locale.includes(locale) : emptyFilter;

  return [idsFilter, excludeIdsFilter, countryFilter, localeFilter].filter((fn) => fn !== emptyFilter);
}
