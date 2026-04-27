import type { UserOrm } from '@backend/entities/user/infrastructure/user.orm';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { type RegularApiEntry } from '@common/records/regular-entry.record';
import { TypeEntry } from '@common/enums/entry.enum';
import { RegularEntryRequirements } from '@common/domains/regular-entry/constants/regular-entry-requirements.constant';
import { DefaultTableColumnsOrm } from '@backend/database/default-table-columns.orm';
import type { ExpenseCategory, IncomeCategory } from '@common/enums/categories.enum';
import type { RegularPaymentFrequency } from '@common/enums/regular-freequency.enum';

@Entity('regular-entry')
export class RegularEntryOrm extends DefaultTableColumnsOrm implements RegularApiEntry {
  @Column({ type: 'varchar', length: RegularEntryRequirements.MaxTitleLength, unique: true })
  title!: string;

  @Column({ type: 'varchar', length: RegularEntryRequirements.MaxDescriptionLength, unique: true })
  description!: string;

  @Column({ type: 'int' })
  sum!: number;

  @Column({ type: 'enum', enum: [TypeEntry.Expense, TypeEntry.Income] })
  type!: TypeEntry.Expense | TypeEntry.Income;

  @Column({ type: 'varchar' })
  category!: ExpenseCategory | IncomeCategory;

  @Column({ type: 'varchar' })
  frequency!: RegularPaymentFrequency;

  @Column({ type: 'int' })
  dayOfMonth!: number;

  @Column({ type: 'int' })
  userId!: number;

  @ManyToOne('UserOrm', 'regularEntries')
  @JoinColumn({ name: 'userId' })
  user?: UserOrm;
}
