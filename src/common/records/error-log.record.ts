import type { DefaultTableColumns } from '@common/models/default-table-columns.model';
import type { ErrorLogStatus } from '@common/constants/error-log-status.constant';

export interface ErrorLogRecord extends DefaultTableColumns {
  message: string;
  stack: string | null;
  endpoint: string | null;
  method: string | null;
  status: ErrorLogStatus;
  userId: number | null;
  user: { name: string; email: string } | null;
}
