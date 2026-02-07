import { Column, Entity } from 'typeorm';
import { AdminRequirements } from '../../../../common/domains/admin/constants/admin-requirements.constant';
import { Admin } from '../../../../common/records/admin.record';
import { DefaultTableColumnsOrm } from '../../../shared/infrastructure/default-table-columns.orm';

@Entity('admin')
export class AdminOrm extends DefaultTableColumnsOrm implements Admin {
  @Column({ type: 'varchar', length: AdminRequirements.MaxNameLength })
  name!: string;

  @Column({ type: 'varchar', length: AdminRequirements.MaxPasswordLength, select: false })
  password?: string;
}
