import type { BudgetPlanDto } from '@common/records/budget-plan.record';
import type { BudgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import type { UnregularEntryLocalRepository } from '@frontend/entities/unregular-entry/unregular-entry.local.repository';
import type { DatabaseLocalService } from '@frontend/database/database.local.service';
import { Tables } from '@frontend/shared/constants/database.constants';
import { getNewAndDeletedRecords } from '@common/utils/get-new-and-deleted-record.util';

export class UpdateBudgetPlanLocalUseCase {
  constructor(
    private budgetPlanLocalRepository: BudgetPlanLocalRepository,
    private unregularEntryLocalRepository: UnregularEntryLocalRepository,
    private databaseLocalService: DatabaseLocalService,
  ) {}

  async execute(id: number, { otherEntries: otherEntriesDto, ...data }: BudgetPlanDto): Promise<true> {
    try {
      const currentBudgetPlan = await this.budgetPlanLocalRepository.getItemById(id);

      if (!currentBudgetPlan) {
        throw Error(`Budget plan not found with id ${id}`);
      }

      this.databaseLocalService.runBatch([Tables.BudgetPlanTable, Tables.UnregularEntries]);

      const {
        deletedRecords: deletedOtherEntries,
        newRecords: newOtherEntries,
        remainedRecords: remainedOtherEntryIds,
      } = getNewAndDeletedRecords(otherEntriesDto, currentBudgetPlan.otherEntryIds);

      await Promise.all(deletedOtherEntries.map((id) => this.unregularEntryLocalRepository.deleteItem(id)));

      const newOtherEntryIds = await Promise.all(
        newOtherEntries.map((dto) => this.unregularEntryLocalRepository.createItem(dto)),
      );

      const result = await this.budgetPlanLocalRepository.updateItem(id, {
        ...data,
        otherEntryIds: [...remainedOtherEntryIds, ...newOtherEntryIds],
      });

      await this.databaseLocalService.doneBatch();

      return result;
    } catch (e: unknown) {
      await this.databaseLocalService.revertBatch();

      throw e;
    }
  }
}
