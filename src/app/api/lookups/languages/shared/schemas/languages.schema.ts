import { z } from 'zod';
import { createPaginatedSchema } from '../../../shared/utils/create-paginated-schema.util';

const filters = z.object({
  ids: z.array(z.number('Each id must be an integer'), 'Ids array is required'),
  excludeIds: z.array(z.number('Each excludeId must be an integer'), 'ExcludeIds array is required'),
  name: z.string('Name is required'),
});

export const LanguagesSchema = createPaginatedSchema(filters);
