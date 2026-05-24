import { DefaultTableColumnsOrm } from '@backend/database/default-table-columns.orm';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import type { UserOrm } from '@backend/entities/user/infrastructure/user.orm';
import { TotpRequirements } from '@backend/entities/totp/domain/totp-requirements.constant';

// 2FA ORM
@Entity()
export class TotpOrm extends DefaultTableColumnsOrm {
  @Column({ type: 'varchar', length: TotpRequirements.SecretLength, select: false })
  secret!: string;

  @Column({ type: 'boolean', default: false })
  enabled!: boolean;

  @Column({ type: 'int' })
  userId!: number;

  @OneToOne('UserOrm', 'totp', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: UserOrm;
}
