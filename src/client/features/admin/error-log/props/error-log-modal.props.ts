import type { ErrorLogRecord } from '@common/records/error-log.record';
import type { ErrorLogStatus } from '@common/constants/error-log-status.constant';

export interface ErrorLogModalProps {
  isOpen: boolean;
  log: ErrorLogRecord | null;
  onClose: () => void;
  onUpdateStatus: (status: ErrorLogStatus) => void;
  isUpdating: boolean;
}
