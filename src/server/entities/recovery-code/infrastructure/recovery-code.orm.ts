import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultTableColumnsOrm } from '@backend/database/default-table-columns.orm';
import { UserRequirements } from '@common/constants/user-requirements.constant';
import type { UserOrm } from '@backend/entities/user/infrastructure/user.orm';

@Entity('recovery_codes')
export class RecoveryCodeOrm extends DefaultTableColumnsOrm {
  @Column({ length: 6 })
  code!: string;

  @Column({ type: 'varchar', length: UserRequirements.MaxEmailLength })
  email!: string;

  @Column()
  expiresAt!: Date;

  @ManyToOne(`UserOrm`, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
  user!: UserOrm;

  @Column({ type: 'int', default: 0 })
  attempts!: number;
}
