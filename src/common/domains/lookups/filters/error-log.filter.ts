import type { ErrorLogStatus } from '@common/constants/error-log-status.constant';

export interface ErrorLogFilter {
  status?: ErrorLogStatus | undefined;
  endpoint?: string | undefined;
  method?: string | undefined;
  dateFrom?: Date | string | undefined;
  dateTo?: Date | string | undefined;
  ids?: number[] | undefined;
  excludeIds?: number[] | undefined;
  userId?: number | undefined;
  message?: string | undefined;
}
