import { type TypeEntry } from '@common/enums/entry.enum';
import { type AllCategories } from '@common/enums/categories.enum';

export interface TrackingOperationFilter {
  startDate?: Date;
  endDate?: Date;
  type?: TypeEntry.Expense | TypeEntry.Income;
  category?: AllCategories;
  sum?: number;
  search?: string;
  softDeleted?: 0 | 1;
  minSum?: number;
  maxSum?: number;
}
