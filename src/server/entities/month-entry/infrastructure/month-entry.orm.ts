import type { StaticMonthEntry } from '@common/records/month-entry.record';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BasicEntryOrm } from '@backend/entities/basic-entry/basic-entry.orm';
import { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';

@Entity('month_entry_orm')
export class MonthEntryOrm extends BasicEntryOrm implements StaticMonthEntry {
  @Column({ type: 'boolean' })
  selected!: boolean;

  @Column({ type: 'int' })
  budgetPlanId!: number;

  @ManyToOne(() => BudgetPlanOrm, (budgetPlan) => budgetPlan.otherEntries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'budgetPlanId' })
  budgetPlan?: BudgetPlanOrm;
}
