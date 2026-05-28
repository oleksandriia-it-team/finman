import type { MonthEntry } from '@common/records/month-entry.record';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BasicEntryOrm } from '@backend/entities/basic-entry/basic-entry.orm';
import { type BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';
import { type TrackingOperationOrm } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.orm';

@Entity('month_entry_orm')
export class MonthEntryOrm extends BasicEntryOrm implements MonthEntry {
  @Column({ type: 'boolean' })
  selected!: boolean;

  @Column({ type: 'int' })
  priority!: number;

  @Column({ type: 'int' })
  budgetPlanId!: number;

  @ManyToOne('BudgetPlanOrm', 'otherEntries', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'budgetPlanId' })
  budgetPlan?: BudgetPlanOrm;

  @OneToMany('TrackingOperationOrm', 'attachedPlannedMonthEntry')
  attachedTrackedOperations?: TrackingOperationOrm[];
}
