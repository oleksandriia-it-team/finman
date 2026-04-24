import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultTableColumnsOrm } from '../../../shared/infrastructure/default-table-columns.orm';
import { type FullUserData } from '@common/records/user.record';
import { UserRequirements } from '@common/domains/user/constants/user-requirements.constant';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { type RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';
import type { TrackingOperationOrm } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.orm';

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

  @OneToMany('RegularEntryOrm', 'user')
  regularEntries!: RegularEntryOrm[];

  @OneToMany('tracking-operation', 'user')
  trackingOperations?: TrackingOperationOrm;
}
