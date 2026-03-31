import { Month } from '../enums/month.enum';
import { RecordModel } from '../models/record.model';
import { DefaultColumnKeys, DefaultTableColumns } from '../models/default-table-columns.model';
import { UnregularEntry } from './unregular-entry.record';
import { DelayedExpense } from './delayed-expenses.record';

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
