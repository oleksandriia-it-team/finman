import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultTableColumnsOrm } from '@backend/shared/infrastructure/default-table-columns.orm';
import { type TrackingOperationRecord } from '@common/records/tracking-operation.record';
import { TypeEntry } from '@common/enums/entry.enum';
import { ExpenseCategories, IncomeCategories, type AllCategories } from '@common/enums/categories.enum';
import { type UserOrm } from '@backend/entities/user/infrastructure/user.orm';

const allCategoryValues = Array.from(
  new Set([...Object.values(ExpenseCategories), ...Object.values(IncomeCategories)]),
);

@Entity('tracking-operation')
export class TrackingOperationOrm extends DefaultTableColumnsOrm implements TrackingOperationRecord {
  @Column({ type: 'varchar', length: 20 })
  title!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  description?: string | undefined;

  @Column({ type: 'enum', enum: [TypeEntry.Expense, TypeEntry.Income] })
  type!: TypeEntry.Expense | TypeEntry.Income;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ type: 'numeric' })
  sum!: number;

  @Column({
    type: 'enum',
    enum: allCategoryValues,
    default: ExpenseCategories.Misc,
  })
  category!: AllCategories;

  @Column({ type: 'int' })
  userId!: number;

  @ManyToOne('UserOrm', 'trackingOperations')
  @JoinColumn({ name: 'userId' })
  user?: UserOrm;
}
