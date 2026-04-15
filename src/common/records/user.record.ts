import { type DefaultTableColumns } from '../models/default-table-columns.model';
import { type RoleEnum } from '@common/domains/user/enums/role.enum';

export interface User extends DefaultTableColumns {
  name: string;
  role: RoleEnum;
  email: string;
}

export interface FullUserData extends User {
  password: string;
}
