import type { EntryBase } from '@common/records/entry.record';

export type MonthEntry = EntryBase & {
  budgetPlanId: number;
  selected: boolean;
};
