import { z } from 'zod';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';

const filters = z.object({
  ids: z.array(z.number('Кожен ID має бути числом'), 'Масив ID є обовʼязковим').optional(),
  excludeIds: z.array(z.number('Кожен excludeId має бути числом'), 'Масив excludeIds є обовʼязковим').optional(),
  code: z.string('Код є обовʼязковим').optional(),
  name: z.string('Назва є обовʼязковою').optional(),
  symbol: z.string('Символ є обовʼязковим').optional(),
});

export const CurrenciesSchema = createPaginatedSchema(filters);
