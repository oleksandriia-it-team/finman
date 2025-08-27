import { z } from 'zod';
import { CountriesAndLocalesSchema } from '../schemas/countries-and-locales.schema';

export type GetByCountryAndLocalesPayload = z.infer<typeof CountriesAndLocalesSchema['getByIdSchema']>;
export type GetTotalCountryAndLocalesPayload = z.infer<typeof CountriesAndLocalesSchema['totalCountSchema']>;
export type GetCountryAndLocalesPayload = z.infer<typeof CountriesAndLocalesSchema['itemsSchema']>;