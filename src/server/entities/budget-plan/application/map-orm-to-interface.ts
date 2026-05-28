import type { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';

export function mapBudgetPlanOrmToInterface(orm: BudgetPlanOrm): BudgetPlanDetailed {
  return {
    ...orm,
    plannedRegularEntries: orm.plannedRegularEntries.map((entry) => entry.regularOperation).filter((e) => !!e),
  };
}
