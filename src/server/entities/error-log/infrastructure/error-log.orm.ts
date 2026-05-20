import { ErrorLogStatus } from '@common/constants/error-log-status.constant';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultTableColumnsOrm } from '@backend/database/default-table-columns.orm';
import type { UserOrm } from '@backend/entities/user/infrastructure/user.orm';

@Entity('error-logs')
export class ErrorLogOrm extends DefaultTableColumnsOrm {
  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'text', nullable: true })
  stack!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  endpoint!: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  method!: string | null;

  @Column({
    type: 'enum',
    enum: Object.values(ErrorLogStatus),
    default: ErrorLogStatus.Active,
  })
  status!: ErrorLogStatus;

  @Column({ type: 'int', nullable: true })
  userId!: number | null;

  @ManyToOne('UserOrm', { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'userId' })
  user!: UserOrm | null;
}
