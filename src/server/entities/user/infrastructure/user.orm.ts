import 'reflect-metadata';

import { Column, Entity } from 'typeorm';
import { DefaultTableColumnsOrm } from '../../../shared/infrastructure/default-table-columns.orm';
import { User } from '@common/records/user.record';
import { UserRequirements } from '@common/domains/user/constants/user-requirements.constant';
import { RoleEnum } from '@common/domains/user/enums/role.enum';

@Entity('user')
export class UserOrm extends DefaultTableColumnsOrm implements User {
  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.User })
  role!: RoleEnum;

  @Column({ type: 'varchar', length: UserRequirements.MaxEmailLength, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: UserRequirements.MaxNameLength })
  name!: string;

  @Column({ type: 'varchar', length: UserRequirements.MaxPasswordLength, select: false })
  password?: string;
}
