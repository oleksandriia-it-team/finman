import { z } from 'zod';
import { createPaginatedSchema } from '../../../../../../server/shared/utils/create-paginated-schema.util';

const filters = z.object({
  ids: z.array(z.number('Each id must be an integer'), 'Ids array is required').optional(),
  excludeIds: z.array(z.number('Each excludeId must be an integer'), 'ExcludeIds array is required').optional(),
  name: z.string('Name is required').optional(),
});

export const LanguagesSchema = createPaginatedSchema(filters);
