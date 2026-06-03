import z from 'zod';
import { ErrorLogStatus } from '@common/constants/error-log-status.constant';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';

const filters = z.object({
  ids: z.array(z.number({ message: 'Each ID must be a number' })).optional(),
  excludeIds: z.array(z.number({ message: 'Each excludeId must be a number' })).optional(),
  endpoint: z.string({ message: 'Endpoint must be a string' }).optional(),
  method: z.string({ message: 'Method must be a string' }).optional(),
  status: z.enum(Object.values(ErrorLogStatus), { message: 'Invalid error log status' }).optional(),
  userId: z.number({ message: 'User ID must be a number' }).optional(),
  message: z.string({ message: 'Message must be a string' }).optional(),
  dateFrom: z.coerce.date({ message: 'Invalid start date format' }).optional(),
  dateTo: z.coerce.date({ message: 'Invalid end date format' }).optional(),
});

export const GetStatusesCountSchema = z.object({
  filters: filters.optional(),
});

export const ErrorLogSchema = createPaginatedSchema(filters);
