import type { RegularEntry } from '@common/records/regular-entry.record';

export interface RegularPaymentFormProps {
  initialData?: RegularEntry;
  onSuccess?: () => void;
  onCancel?: () => void;
}
