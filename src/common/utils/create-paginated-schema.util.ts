import { z, type ZodType } from 'zod';

export function createPaginatedSchema<Filters extends ZodType<unknown>>(filtersSchema: Filters) {
  return {
    itemsSchema: z.object({
      from: z
        .number('Field "from" is required and must be a number')
        .int('Field "from" must be an integer')
        .positive('Field "from" must be a positive number'),
      to: z
        .number('Field "to" is required and must be a number')
        .int('Field "to" must be an integer')
        .positive('Field "to" must be a positive number'),
      filters: filtersSchema.optional(),
    }),
    totalCountSchema: z.object({
      filters: filtersSchema.optional(),
    }),
  };
}
