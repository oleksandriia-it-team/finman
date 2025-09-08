import { CurrenciesSchema } from '../schemas/currencies.schema';
import { z } from 'zod';

export type GetByCurrenciesPayload = z.infer<typeof CurrenciesSchema['getByIdSchema']>;
export type GetTotalCurrenciesPayload = z.infer<typeof CurrenciesSchema['totalCountSchema']>;
export type GetCurrenciesPayload = z.infer<typeof CurrenciesSchema['itemsSchema']>;