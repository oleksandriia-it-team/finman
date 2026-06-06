import { DefaultTableColumnsOrm } from '@backend/database/default-table-columns.orm';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Month } from '@common/enums/month.enum';
import { type MonthEntryOrm } from '@backend/entities/month-entry/infrastructure/month-entry.orm';
import { type UserOrm } from '@backend/entities/user/infrastructure/user.orm';
import { type PlannedRegOpsBudgetOrm } from '@backend/entities/planned-reg-ops-budget/infrastructure/planned-reg-ops-budget.orm';

@Entity('budget_plan_orm')
@Unique(['userId', 'month', 'year'])
export class BudgetPlanOrm extends DefaultTableColumnsOrm {
  @Column({ type: 'enum', enum: Object.values(Month) })
  month!: Month;

  @Column({ type: 'int' })
  year!: number;

  @Column({ type: 'int' })
  userId!: number;

  @ManyToOne('UserOrm', 'budgetPlans', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: UserOrm;

  @OneToMany('MonthEntryOrm', 'budgetPlan')
  @JoinColumn()
  otherEntries!: MonthEntryOrm[];

  @OneToMany('PlannedRegOpsBudgetOrm', 'budgetPlan')
  @JoinColumn()
  plannedRegularEntries!: PlannedRegOpsBudgetOrm[];
}
