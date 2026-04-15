import type { BudgetPlanDto } from '@common/records/budget-plan.record';
import type { BudgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import type { UnregularEntryLocalRepository } from '@frontend/entities/unregular-entry/unregular-entry.local.repository';
import type { DatabaseLocalService } from '@frontend/database/database.local.service';
import { Tables } from '@frontend/shared/constants/database.constants';

export class CreateBudgetPlanLocalUseCase {
  constructor(
    private budgetPlanLocalRepository: BudgetPlanLocalRepository,
    private unregularEntryLocalRepository: UnregularEntryLocalRepository,
    private databaseLocalService: DatabaseLocalService,
  ) {}

  async execute({ otherEntries: otherEntriesDto, ...data }: BudgetPlanDto): Promise<number> {
    try {
      this.databaseLocalService.runBatch([Tables.BudgetPlanTable, Tables.UnregularEntries]);

      const otherEntryIds = await Promise.all(
        otherEntriesDto.map((dto) => this.unregularEntryLocalRepository.createItem(dto)),
      );

      const result = await this.budgetPlanLocalRepository.createItem({ ...data, otherEntryIds });

      await this.databaseLocalService.doneBatch();

      return result;
    } catch (e: unknown) {
      await this.databaseLocalService.revertBatch();

      throw e;
    }
  }
}
