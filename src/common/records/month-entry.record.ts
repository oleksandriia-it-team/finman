import type { EntryBase, StaticEntryBase } from '@common/records/entry.record';

export type MonthEntry = EntryBase & {
  budgetPlanId: number;
  selected: boolean;
};

export type StaticMonthEntry = StaticEntryBase & {
  budgetPlanId: number;
  selected: boolean;
};
