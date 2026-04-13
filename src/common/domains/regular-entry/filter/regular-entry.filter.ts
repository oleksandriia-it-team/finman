import { type TypeEntry } from '@common/enums/entry.enum';

export interface RegularEntryFilter {
  type: TypeEntry.Expense | TypeEntry.Income;
  softDeleted: 0 | 1;
}
