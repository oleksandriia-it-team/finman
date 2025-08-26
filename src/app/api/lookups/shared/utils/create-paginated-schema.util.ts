import { z, ZodType } from 'zod';
import { LookupsTypeEnum } from '../enums/lookups-type.enum';

export function createPaginatedSchema<Filters extends ZodType<unknown>>(
  filtersSchema: Filters
) {
  return {
    itemsSchema: z.object({
      type: z.enum(LookupsTypeEnum, 'Type is required and must be a valid enum'),
      from: z.number('From is required and must be a number').int('From must be an integer').positive('From must be a positive integer'),
      to: z.number('To is required and must be a number').int('To must be an integer').positive('To must be a positive integer'),
      filters: filtersSchema.optional(),
    }),
    totalCountSchema: z.object({
      type: z.enum(LookupsTypeEnum, 'Type is required and must be a valid enum'),
      filters: filtersSchema.optional(),
    }),
    getByIdSchema: z.object({
      type: z.enum(LookupsTypeEnum, 'Type is required and must be a valid enum'),
      id: z.number('Id is required and must be a number').int('Id must be an integer').positive('Id must be a positive integer'),
    })
  };
}