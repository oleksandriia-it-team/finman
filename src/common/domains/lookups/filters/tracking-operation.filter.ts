import { type TypeEntry } from '@common/enums/entry.enum';
import { type AllCategories } from '@common/enums/categories.enum';

export interface TrackingOperationFilter {
  dateFrom?: Date;
  dateTo?: Date;
  type?: TypeEntry.Expense | TypeEntry.Income;
  category?: AllCategories;
  search?: string;
  softDeleted?: 0 | 1;
  minSum?: number;
  maxSum?: number;
}
