import { z } from 'zod';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';

const filters = z.object({
  ids: z.array(z.number('Each ID must be a number'), 'IDs array is required').optional(),
  excludeIds: z.array(z.number('Each excludeId must be a number'), 'excludeIds array is required').optional(),
  code: z.string('Code is required').optional(),
  name: z.string('Name is required').optional(),
  symbol: z.string('Symbol is required').optional(),
});

export const CurrenciesSchema = createPaginatedSchema(filters);
