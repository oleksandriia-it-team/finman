import { z, ZodType } from 'zod';

export function createPaginatedSchema<Filters extends ZodType<unknown>>(
  filtersSchema: Filters
) {
  return {
    itemsSchema: z.object({
      from: z.number('From is required and must be a number').int('From must be an integer').positive('From must be a positive integer'),
      to: z.number('To is required and must be a number').int('To must be an integer').positive('To must be a positive integer'),
      filters: filtersSchema.optional(),
    }),
    totalCountSchema: z.object({
      filters: filtersSchema.optional(),
    }),
    getByIdSchema: z.object({
      id: z.number('Id is required and must be a number').int('Id must be an integer').positive('Id must be a positive integer'),
    })
  };
}