import { type TypeEntry } from '../enums/entry.enum';
import type { DefaultTableColumns } from '@common/models/default-table-columns.model';

export interface UnregularEntry extends DefaultTableColumns {
  type: TypeEntry;
  description: string;
  sum: number;
  regular: false;
  budgetPlanId: number;
}
