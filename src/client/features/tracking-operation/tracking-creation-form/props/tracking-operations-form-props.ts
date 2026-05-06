import type { TrackingOperationRecord } from '@common/records/tracking-operation.record';

export interface TrackingOperationsFormProps {
  initialData?: TrackingOperationRecord;
  onSuccess?: () => void;
  onCancel?: () => void;
}
