import z from 'zod';
import { ErrorLogStatus } from '@common/constants/error-log-status.constant';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';

const filters = z.object({
  ids: z.array(z.number({ message: 'Кожен ID має бути числом' })).optional(),
  excludeIds: z.array(z.number({ message: 'Кожен excludeId має бути числом' })).optional(),
  endpoint: z.string({ message: 'Ендпоінт має бути рядком' }).optional(),
  method: z.string({ message: 'Метод має бути рядком' }).optional(),
  status: z.nativeEnum(ErrorLogStatus, { message: 'Невалідний статус помилки' }).optional(),
  userId: z.number({ message: 'ID користувача має бути числом' }).optional(),
  message: z.string({ message: 'Текст помилки має бути рядком' }).optional(),
});

export const ErrorLogSchema = createPaginatedSchema(filters);
