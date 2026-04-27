import { type Month } from '../enums/month.enum';
import { type DefaultColumnKeys, type DefaultTableColumns } from '../models/default-table-columns.model';
import type { MonthEntry } from '@common/records/month-entry.record';
import type { PartialIdModel } from '@common/models/partial-id.model';
import type { RecordModel } from '@common/models/record.model';
import type { RegularEntry } from '@common/records/regular-entry.record';

interface BudgetPlanBase extends DefaultTableColumns {
  month: Month;
  year: number;
}

export interface BudgetPlanDetailed extends BudgetPlanBase {
  otherEntries: MonthEntry[];
  plannedRegularEntries: RegularEntry[];
}

export interface BudgetPlan extends BudgetPlanBase {
  otherEntryIds: number[];
  plannedRegularEntryIds: number[];
}

export type BudgetPlanDto = Omit<BudgetPlanBase, DefaultColumnKeys> &
  RecordModel & {
    otherEntries: PartialIdModel<Omit<MonthEntry, 'budgetPlanId'>>[];
    plannedRegularEntryIds: number[];
  };
