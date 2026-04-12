import { z } from 'zod';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';

const filters = z.object({
  ids: z.array(z.number('Кожен ID має бути числом'), 'Масив ID є обовʼязковим').optional(),
  excludeIds: z.array(z.number('Кожен excludeId має бути числом'), 'Масив excludeIds є обовʼязковим').optional(),
  country: z.string('Країна є обовʼязковою').optional(),
  locale: z.string('Локаль є обовʼязковою').optional(),
});

export const CountriesAndLocalesSchema = createPaginatedSchema(filters);
