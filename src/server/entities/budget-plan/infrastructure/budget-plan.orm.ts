import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { DefaultTableColumnsOrm } from '@backend/database/default-table-columns.orm';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Month } from '@common/enums/month.enum';
import { MonthEntryOrm } from '@backend/entities/month-entry/infrastructure/month-entry.orm';
import { RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';
import { UserOrm } from '@backend/entities/user/infrastructure/user.orm';

@Entity()
export class BudgetPlanOrm extends DefaultTableColumnsOrm implements BudgetPlanDetailed {
  @Column({ type: 'enum', enum: Object.values(Month) })
  month!: Month;

  @Column({ type: 'int' })
  year!: number;

  @Column({ type: 'int' })
  userId!: number;

  @ManyToOne(() => UserOrm, (userOrm) => userOrm.budgetPlans)
  @JoinColumn({ name: 'userId' })
  user?: UserOrm;

  @OneToMany(() => MonthEntryOrm, (entry) => entry.budgetPlan)
  @JoinColumn()
  otherEntries!: MonthEntryOrm[];

  @ManyToMany(() => RegularEntryOrm, (entry) => entry.budgetPlans)
  @JoinTable()
  plannedRegularEntries!: RegularEntryOrm[];
}
