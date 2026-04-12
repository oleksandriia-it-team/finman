import { UserOrm } from '@backend/entities/user/infrastructure/user.orm';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RegularApiEntry } from '@common/records/regular-entry.record';
import { TypeEntry } from '@common/enums/entry.enum';
import { RegularEntryRequirements } from '@common/domains/regular-entry/constants/regular-entry-requirements.constant';
import { DefaultTableColumnsOrm } from '@backend/shared/infrastructure/default-table-columns.orm';

@Entity('regular-entry')
export class RegularEntryOrm extends DefaultTableColumnsOrm implements RegularApiEntry {
  @Column({ type: 'varchar', length: RegularEntryRequirements.MaxTitleLength, unique: true })
  title!: string;

  @Column({ type: 'varchar', length: RegularEntryRequirements.MaxDescriptionLength, unique: true })
  description!: string;

  @Column({ type: 'number' })
  sum!: number;

  @Column({ type: 'enum', enum: [TypeEntry.Expense, TypeEntry.Income] })
  type!: TypeEntry.Expense | TypeEntry.Income;

  @Column()
  userId!: number;

  @ManyToOne(() => UserOrm)
  @JoinColumn({ name: 'userId' })
  user?: UserOrm;
}
