import { ErrorLogStatus } from '@common/constants/error-log-status.constant';
import { Column, Entity } from 'typeorm';
import { DefaultTableColumnsOrm } from '@backend/database/default-table-columns.orm';

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
}
