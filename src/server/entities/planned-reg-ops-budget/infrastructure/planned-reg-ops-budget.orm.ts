import { DefaultTableColumnsOrm } from '@backend/database/default-table-columns.orm';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import type { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';
import type { RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';
import type { PlannedRegOpsBudgetRecord } from '@common/records/planned-reg-ops-budget.record';

@Entity('planned-reg-ops-budget')
@Unique(['regularOperationId', 'budgetPlanId'])
export class PlannedRegOpsBudgetOrm extends DefaultTableColumnsOrm implements PlannedRegOpsBudgetRecord {
  @Column({ type: 'int' })
  regularOperationId!: number;

  @Column({ type: 'int' })
  budgetPlanId!: number;

  @ManyToOne('RegularEntryOrm', 'plannedRegularOpsInBudget', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'regularOperationId' })
  regularOperation?: RegularEntryOrm;

  @ManyToOne('BudgetPlanOrm', 'plannedRegularEntries', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'budgetPlanId' })
  budgetPlan?: BudgetPlanOrm;
}
