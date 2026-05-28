import type { DefaultTableColumns } from '@common/models/default-table-columns.model';
import type { RegularEntry } from '@common/records/regular-entry.record';

export interface PlannedRegOpsBudgetRecord extends DefaultTableColumns {
  regularOperationId: number;
  budgetPlanId: number;
  regularOperation?: RegularEntry;
}
