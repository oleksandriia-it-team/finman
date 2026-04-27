import type { EntryBase } from '@common/records/entry.record';
import type { RegularPaymentFrequency } from '@common/enums/regular-freequency.enum';

export type RegularEntry = EntryBase & {
  frequency: RegularPaymentFrequency;
  dayOfMonth: number;
};
