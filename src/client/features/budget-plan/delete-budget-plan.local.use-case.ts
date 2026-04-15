import type { BudgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import type { UnregularEntryLocalRepository } from '@frontend/entities/unregular-entry/unregular-entry.local.repository';
import type { DatabaseLocalService } from '@frontend/database/database.local.service';
import { Tables } from '@frontend/shared/constants/database.constants';

export class DeleteBudgetPlanLocalUseCase {
  constructor(
    private budgetPlanLocalRepository: BudgetPlanLocalRepository,
    private unregularEntryLocalRepository: UnregularEntryLocalRepository,
    private databaseLocalService: DatabaseLocalService,
  ) {}

  async execute(id: number): Promise<true> {
    try {
      const currentBudgetPlan = await this.budgetPlanLocalRepository.getItemById(id);

      if (!currentBudgetPlan) {
        throw Error(`Budget plan not found with id ${id}`);
      }

      this.databaseLocalService.runBatch([Tables.BudgetPlanTable, Tables.UnregularEntries]);

      await Promise.all(currentBudgetPlan.otherEntryIds.map((id) => this.unregularEntryLocalRepository.deleteItem(id)));

      const result = this.budgetPlanLocalRepository.deleteItem(id);

      await this.databaseLocalService.doneBatch();

      return result;
    } catch (e: unknown) {
      await this.databaseLocalService.revertBatch();

      throw e;
    }
  }
}
