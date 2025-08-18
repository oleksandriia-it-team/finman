import { Month } from '../../../shared/enums/month.enum';
import { DelayedExpense, UnregularEntry } from './entry.model';
import { ICrudService } from '../../../shared/models/crud-service.model';
import { RecordModel } from '../../../shared/models/record.model';
import { DefaultTableColumns } from '../../../shared/models/default-table-columns.model';

export interface BudgetPlan extends DefaultTableColumns {
  month: Month;
  year: number;
  otherEntries: UnregularEntry[];
  plannedOtherEntryIndexes: number[];
  plannedRegularEntryIds: number[];
  plannedDelayedExpenseIds: number[];
}

export type PlannedDelayedExpense = Omit<DelayedExpense, 'id' | 'softDeleted'> & Partial<DefaultTableColumns>;

export interface BudgetPlanDto extends RecordModel {
  month: Month;
  year: number;
  otherEntries: UnregularEntry[];
  plannedOtherEntryIndexes: number[];
  plannedRegularEntryIds: number[];
  plannedDelayedExpenses: PlannedDelayedExpense[];
}

export type IBudgetPlanService = ICrudService<BudgetPlan, BudgetPlanDto>;