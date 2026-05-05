import { type DefaultTableColumns } from '../models/default-table-columns.model';

export interface Currency extends DefaultTableColumns {
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
  adminId?: number | null;
  admin?: { name: string } | null;
}
