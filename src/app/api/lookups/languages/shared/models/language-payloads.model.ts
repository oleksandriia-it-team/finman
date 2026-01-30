import { LanguagesSchema } from '../schemas/languages.schema';
import { z } from 'zod';

export type GetByLanguagePayload = z.infer<(typeof LanguagesSchema)['getByIdSchema']>;
export type GetTotalLanguagesPayload = z.infer<(typeof LanguagesSchema)['totalCountSchema']>;
export type GetLanguagesPayload = z.infer<(typeof LanguagesSchema)['itemsSchema']>;
