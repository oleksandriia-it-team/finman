import type { UserOrm } from '@backend/entities/user/infrastructure/user.orm';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { type RegularEntry } from '@common/records/regular-entry.record';
import { RegularPaymentFrequency } from '@common/enums/regular-freequency.enum';
import { BasicEntryOrm } from '@backend/entities/basic-entry/basic-entry.orm';
import { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';

@Entity('regular-entry')
export class RegularEntryOrm extends BasicEntryOrm implements RegularEntry {
  @Column({ type: 'int', default: 1 })
  dayOfMonth!: number;

  @Column({ type: 'enum', enum: Object.values(RegularPaymentFrequency), default: RegularPaymentFrequency.Monthly })
  frequency!: RegularPaymentFrequency;

  @Column({ type: 'int' })
  userId!: number;

  @ManyToOne('UserOrm', 'regularEntries')
  @JoinColumn({ name: 'userId' })
  user?: UserOrm;

  @ManyToMany(() => BudgetPlanOrm, (budgetPlan) => budgetPlan.plannedRegularEntries)
  budgetPlans?: BudgetPlanOrm[];
}
