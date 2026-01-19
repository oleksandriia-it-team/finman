import { z } from 'zod';
import { createPaginatedSchema } from '../../../../../../server/shared/utils/create-paginated-schema.util';

const filters = z.object({
  ids: z.array(z.number('Each id must be a string'), 'Ids array is required').optional(),
  excludeIds: z.array(z.number('Each excludeId must be a string'), 'ExcludeIds array is required').optional(),
  code: z.string('Code is required').optional(),
  name: z.string('Name is required').optional(),
  symbol: z.string('Symbol is required').optional(),
});

export const CurrenciesSchema = createPaginatedSchema(filters);