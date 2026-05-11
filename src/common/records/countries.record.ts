import { type DefaultTableColumns } from '../models/default-table-columns.model';

export interface CountryAndLocale extends DefaultTableColumns {
  country: string;
  countryUk: string;
  locale: string;
  adminId?: number | null;
  admin?: { name: string } | null;
}
