import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { DefaultTableColumnsOrm } from '@backend/database/default-table-columns.orm';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Month } from '@common/enums/month.enum';
import { type MonthEntryOrm } from '@backend/entities/month-entry/infrastructure/month-entry.orm';
import { type RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';
import { type UserOrm } from '@backend/entities/user/infrastructure/user.orm';

@Entity()
@Unique(['userId', 'month', 'year'])
export class BudgetPlanOrm extends DefaultTableColumnsOrm implements BudgetPlanDetailed {
  @Column({ type: 'enum', enum: Object.values(Month) })
  month!: Month;

  @Column({ type: 'int' })
  year!: number;

  @Column({ type: 'int' })
  userId!: number;

  @ManyToOne('UserOrm', 'budgetPlans')
  @JoinColumn({ name: 'userId' })
  user?: UserOrm;

  @OneToMany('MonthEntryOrm', 'budgetPlan')
  @JoinColumn()
  otherEntries!: MonthEntryOrm[];

  @ManyToMany('RegularEntryOrm', 'budgetPlans')
  @JoinTable()
  plannedRegularEntries!: RegularEntryOrm[];
}
