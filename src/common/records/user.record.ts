import { type DefaultTableColumns } from '../models/default-table-columns.model';
import { type RoleEnum } from '@common/domains/user/enums/role.enum';
import { type SupportLanguages } from '@common/enums/support-languages.enum';

export interface UserInfo {
  name: string;
  currencyCode: string;
  locale: string;
  language: SupportLanguages;
}

export interface OfflineUser extends UserInfo {
  online: false;
}

export type OnlineUser = UserInfo &
  DefaultTableColumns & {
    role: RoleEnum;
    email: string;
    online: true;
  };

export type GetUser = OfflineUser | OnlineUser;

export interface FullUserData extends OnlineUser {
  password: string;
}
