import type { EntryBase } from '@common/records/entry.record';
import type { RegularPaymentFrequency } from '@common/enums/regular-freequency.enum';

export type RegularEntry = EntryBase & {
  regular: true;
  frequency: RegularPaymentFrequency;
  dayOfMonth: number;
};

export type RegularApiEntry = Omit<RegularEntry, 'regular'>;
