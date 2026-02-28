import { DefaultTableColumns } from '../models/default-table-columns.model';

export interface CountryAndLocale extends DefaultTableColumns {
  country: string;
  locale: string;
}
