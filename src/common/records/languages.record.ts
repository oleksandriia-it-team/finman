import { DefaultTableColumns } from '../models/default-table-columns.model';

export interface Language extends DefaultTableColumns {
  id: number;
  name: string;
  code: string;
}
