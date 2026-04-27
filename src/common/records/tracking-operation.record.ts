import { type TypeEntry } from '@common/enums/entry.enum';
import { type AllCategories } from '@common/enums/categories.enum';
import type { DefaultTableColumns } from '@common/models/default-table-columns.model';

export interface TrackingOperationRecord extends DefaultTableColumns {
  title: string;
  description?: string | null;
  type: TypeEntry.Expense | TypeEntry.Income;
  date: Date;
  sum: number;
  category: AllCategories;
}
