import { z, type ZodType } from 'zod';

export function createPaginatedSchema<Filters extends ZodType<unknown>>(filtersSchema: Filters) {
  return {
    itemsSchema: z.object({
      from: z
        .number('common.pagination.fromRequired')
        .int('common.pagination.fromInteger')
        .positive('common.pagination.fromPositive'),
      to: z
        .number('common.pagination.toRequired')
        .int('common.pagination.toInteger')
        .positive('common.pagination.toPositive'),
      filters: filtersSchema.optional(),
    }),
    totalCountSchema: z.object({
      filters: filtersSchema.optional(),
    }),
  };
}
