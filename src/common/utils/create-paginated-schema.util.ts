import { z, type ZodType } from 'zod';

export function createPaginatedSchema<Filters extends ZodType<unknown>>(filtersSchema: Filters) {
  return {
    itemsSchema: z.object({
      from: z
        .number('Поле From є обовʼязковим і має бути числом')
        .int('Поле From має бути цілим числом')
        .positive('Поле From має бути додатним числом'),
      to: z
        .number('Поле To є обовʼязковим і має бути числом')
        .int('Поле To має бути цілим числом')
        .positive('Поле To має бути додатним числом'),
      filters: filtersSchema.optional(),
    }),
    totalCountSchema: z.object({
      filters: filtersSchema.optional(),
    }),
  };
}
