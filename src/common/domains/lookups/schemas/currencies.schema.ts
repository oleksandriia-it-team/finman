import { z } from 'zod';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';

const filters = z.object({
  ids: z.array(z.number('admin.validation.idMustBeNumber'), 'admin.validation.idsArrayRequired').optional(),
  excludeIds: z
    .array(z.number('admin.validation.excludeIdMustBeNumber'), 'admin.validation.excludeIdsArrayRequired')
    .optional(),
  code: z.string('admin.validation.fieldMustBeString').optional(),
  name: z.string('admin.validation.fieldMustBeString').optional(),
  symbol: z.string('admin.validation.fieldMustBeString').optional(),
});

export const CurrenciesSchema = createPaginatedSchema(filters);
