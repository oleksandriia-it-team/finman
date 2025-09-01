import { CurrenciesSchema } from '../schemas/currencies.schema';
import { z } from 'zod';

export type GetByCurrenciesPayload = z.infer<typeof CurrenciesSchema['getByIdSchema']>;