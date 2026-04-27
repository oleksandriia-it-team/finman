import type { EntryBase } from '@common/records/entry.record';

export type MonthEntry = EntryBase & {
  regular: false;
  budgetPlanId: number;
};
