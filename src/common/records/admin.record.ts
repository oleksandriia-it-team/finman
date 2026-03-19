import { DefaultTableColumns } from '../models/default-table-columns.model';

export interface Admin extends DefaultTableColumns {
  name: string;
}

export interface FullAdminData extends Admin {
  password: string;
}
