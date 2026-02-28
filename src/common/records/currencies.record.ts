import { DefaultTableColumns } from '../models/default-table-columns.model';

export interface Currency extends DefaultTableColumns {
  id: number;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
}
