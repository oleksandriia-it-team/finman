import { Month } from '../../../shared/enums/month.enum';
import { DelayedExpense, UnregularEntry } from './entry.model';
import { ICrudService } from '../../../shared/models/crud-service.model';
import { RecordModel } from '../../../shared/models/record.model';
import { DefaultTableColumns } from '../../../shared/models/default-table-columns.model';

export interface BudgetPlan extends DefaultTableColumns {
  month: Month;
  year: number;
  otherEntries: UnregularEntry[];
  plannedOtherEntries: UnregularEntry[];
  plannedRegularEntryIds: number[];
  plannedDelayedExpenseIds: number[];
}

export interface BudgetPlanDto extends RecordModel {
  month: Month;
  year: number;
  otherEntries: UnregularEntry[];
  plannedOtherEntries: UnregularEntry[];
  plannedRegularEntryIds: number[];
  plannedDelayedExpenses: (Omit<DelayedExpense, 'id'> & { id?: number })[];
}

export type IBudgetPlanService = ICrudService<BudgetPlan, BudgetPlanDto>;