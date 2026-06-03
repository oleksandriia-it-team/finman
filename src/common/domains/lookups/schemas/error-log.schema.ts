import z from 'zod';
import { ErrorLogStatus } from '@common/constants/error-log-status.constant';
import { createPaginatedSchema } from '@common/utils/create-paginated-schema.util';

const filters = z.object({
  ids: z.array(z.number({ message: 'admin.validation.idMustBeNumber' })).optional(),
  excludeIds: z.array(z.number({ message: 'admin.validation.excludeIdMustBeNumber' })).optional(),
  endpoint: z.string({ message: 'admin.validation.fieldMustBeString' }).optional(),
  method: z.string({ message: 'admin.validation.fieldMustBeString' }).optional(),
  status: z.enum(Object.values(ErrorLogStatus), { message: 'admin.validation.invalidStatus' }).optional(),
  userId: z.number({ message: 'admin.validation.userIdMustBeNumber' }).optional(),
  message: z.string({ message: 'admin.validation.fieldMustBeString' }).optional(),
  dateFrom: z.coerce.date({ message: 'admin.validation.invalidStartDate' }).optional(),
  dateTo: z.coerce.date({ message: 'admin.validation.invalidEndDate' }).optional(),
});

export const GetStatusesCountSchema = z.object({
  filters: filters.optional(),
});

export const ErrorLogSchema = createPaginatedSchema(filters);
