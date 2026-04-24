import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultTableColumnsOrm } from '@backend/shared/infrastructure/default-table-columns.orm';
import { type TrackingOperationRecord } from '@common/records/tracking-operation.record';
import { TypeEntry } from '@common/enums/entry.enum';
import { ExpenseCategories, AllCategoryValues, type AllCategories } from '@common/enums/categories.enum';
import { type UserOrm } from '@backend/entities/user/infrastructure/user.orm';

@Entity('tracking-operation')
export class TrackingOperationOrm extends DefaultTableColumnsOrm implements TrackingOperationRecord {
  @Column({ type: 'varchar', length: 20 })
  title!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  description?: string | undefined;

  @Column({ type: 'enum', enum: [TypeEntry.Expense, TypeEntry.Income] })
  type!: TypeEntry.Expense | TypeEntry.Income;

  @Column({
    type: 'date',
    transformer: {
      from: (value: string | null) => (value ? new Date(`${value}T00:00:00Z`) : null),
      to: (date: Date | null) => (date ? date.toISOString().split('T')[0] : null),
    },
  })
  date!: Date;

  @Column({
    type: 'numeric',
    transformer: {
      from: (value: string | null) => (value == null ? null : parseFloat(value)),
      to: (value: number | null) => (value == null ? null : value.toString()),
    },
  })
  sum!: number;

  @Column({
    type: 'enum',
    enum: AllCategoryValues,
    default: ExpenseCategories.Misc,
  })
  category!: AllCategories;

  @Column({ type: 'int' })
  userId!: number;

  @ManyToOne('UserOrm', 'trackingOperations', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: UserOrm;
}
