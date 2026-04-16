import type { BudgetPlan, BudgetPlanDto } from '@common/records/budget-plan.record';
import { getNewAndDeletedRecords } from '@common/utils/get-new-and-deleted-record.util';
import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { ICrudService } from '@common/models/crud-service.model';
import type { UnregularEntry } from '@common/records/unregular-entry.record';

export class UpdateBudgetPlanLocalUseCase extends TransactionalUseCase<BudgetPlanDto & { id: number }, true> {
  constructor(
    transactionManager: ITransactionManager,
    private budgetPlanRepository: ICrudService<BudgetPlan>,
    private unregularEntryRepository: ICrudService<UnregularEntry>,
  ) {
    super(transactionManager);
  }

  async handle({ id, otherEntries: otherEntriesDto, ...data }: BudgetPlanDto & { id: number }): Promise<true> {
    const currentBudgetPlan = await this.budgetPlanRepository.getItemById(id);

    if (!currentBudgetPlan) {
      throw Error(`Budget plan not found with id ${id}`);
    }

    const {
      deletedRecords: deletedOtherEntries,
      newRecords: newOtherEntries,
      remainedRecords: remainedOtherEntryIds,
    } = getNewAndDeletedRecords(otherEntriesDto, currentBudgetPlan.otherEntryIds);

    await Promise.all(deletedOtherEntries.map((id) => this.unregularEntryRepository.deleteItem(id)));

    const newOtherEntryIds = await Promise.all(
      newOtherEntries.map((dto) => this.unregularEntryRepository.createItem(dto)),
    );

    return await this.budgetPlanRepository.updateItem(id, {
      ...data,
      otherEntryIds: [...remainedOtherEntryIds, ...newOtherEntryIds],
    });
  }
}
