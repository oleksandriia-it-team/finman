import { type Month } from '../enums/month.enum';
import { type RecordModel } from '../models/record.model';
import { type DefaultColumnKeys, type DefaultTableColumns } from '../models/default-table-columns.model';
import { type UnregularEntry } from './unregular-entry.record';
import { type DelayedExpense } from './delayed-expenses.record';

export interface BudgetPlan extends DefaultTableColumns {
  month: Month;
  year: number;
  otherEntries: UnregularEntry[];
  plannedOtherEntryIndexes: number[];
  plannedRegularEntryIds: number[];
  plannedDelayedExpenseIds: number[];
}

export type PlannedDelayedExpense = Omit<DelayedExpense, DefaultColumnKeys> & Partial<DefaultTableColumns>;

export interface BudgetPlanDto extends RecordModel {
  month: Month;
  year: number;
  otherEntries: UnregularEntry[];
  plannedOtherEntryIndexes: number[];
  plannedRegularEntryIds: number[];
  plannedDelayedExpenses: PlannedDelayedExpense[];
}
