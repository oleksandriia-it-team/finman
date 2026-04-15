import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import type { BudgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import type { UnregularEntryLocalRepository } from '@frontend/entities/unregular-entry/unregular-entry.local.repository';
import type { RegularEntryLocalRepository } from '@frontend/entities/regular-entry/regular-entry.local.repository';

export class GetBudgetPlanLocalUseCase {
  constructor(
    private budgetPlanLocalRepository: BudgetPlanLocalRepository,
    private regularEntryLocalRepository: RegularEntryLocalRepository,
    private unregularEntryLocalRepository: UnregularEntryLocalRepository,
  ) {}

  async execute(id: number): Promise<BudgetPlanDetailed | null> {
    const budgetPlan = await this.budgetPlanLocalRepository.getItemById(id);

    if (!budgetPlan) {
      return null;
    }

    const otherEntries = (
      await Promise.all(budgetPlan.otherEntryIds.map((id) => this.unregularEntryLocalRepository.getItemById(id)))
    ).filter((i) => !!i);

    const regularEntries = (
      await Promise.all(budgetPlan.plannedRegularEntryIds.map((id) => this.regularEntryLocalRepository.getItemById(id)))
    ).filter((i) => !!i);

    return {
      id: budgetPlan.id,
      month: budgetPlan.month,
      year: budgetPlan.year,
      otherEntries: otherEntries,
      plannedRegularEntries: regularEntries,
      softDeleted: budgetPlan.softDeleted ?? 0,
      updatedAt: budgetPlan.updatedAt,
      createdAt: budgetPlan.createdAt,
    };
  }
}
