import { DefaultTableColumns } from '../models/default-table-columns.model';
import { TypeEntry } from '../enums/entry.enum';

export interface RegularEntry extends DefaultTableColumns {
  type: TypeEntry.Credit | TypeEntry.Expense | TypeEntry.Income;
  description: string;
  sum: number;
  regular: true;
}
