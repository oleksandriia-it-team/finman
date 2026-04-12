import 'reflect-metadata';

import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultTableColumnsOrm } from '../../../shared/infrastructure/default-table-columns.orm';
import { FullUserData } from '@common/records/user.record';
import { UserRequirements } from '@common/domains/user/constants/user-requirements.constant';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';

@Entity('user')
export class UserOrm extends DefaultTableColumnsOrm implements FullUserData {
  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.User })
  role!: RoleEnum;

  @Column({ type: 'varchar', length: UserRequirements.MaxEmailLength, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: UserRequirements.MaxLoginLength, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: UserRequirements.MaxPasswordLength, select: false })
  password!: string;

  @OneToMany(() => RegularEntryOrm, (r) => r.user)
  regularEntries!: RegularEntryOrm[];
}
