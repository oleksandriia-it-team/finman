import type { BudgetPlan, BudgetPlanDto } from '@common/records/budget-plan.record';
import { getNewAndDeletedRecords } from '@common/utils/get-new-and-deleted-record.util';
import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { ICrudService } from '@common/models/crud-service.model';
import type { MonthEntry } from '@common/records/month-entry.record';

export class UpdateBudgetPlanCommonUseCase extends TransactionalUseCase<BudgetPlanDto & { id: number }, true> {
  constructor(
    transactionManager: ITransactionManager,
    private budgetPlanRepository: ICrudService<BudgetPlan>,
    private monthEntryRepository: ICrudService<MonthEntry>,
  ) {
    super(transactionManager);
  }

  async handle({ id, otherEntries: otherEntriesDto, ...data }: BudgetPlanDto & { id: number }): Promise<true> {
    const currentBudgetPlan = await this.budgetPlanRepository.getItemById(id);

    if (!currentBudgetPlan) {
      throw new Error(`Budget plan not found with id ${id}`);
    }

    const {
      deletedRecords: deletedOtherEntries,
      newRecords: newOtherEntries,
      remainedRecords: remainedOtherEntryIds,
    } = getNewAndDeletedRecords(otherEntriesDto, currentBudgetPlan.otherEntryIds);

    const remainedOtherEntries = otherEntriesDto.filter((i) => i.id && remainedOtherEntryIds.includes(i.id));

    await Promise.all(
      remainedOtherEntries.map((dto) =>
        this.monthEntryRepository.updateItem(dto.id as number, { ...dto, budgetPlanId: id }),
      ),
    );

    await Promise.all(deletedOtherEntries.map((id) => this.monthEntryRepository.deleteItem(id)));

    const newOtherEntryIds = await Promise.all(
      newOtherEntries.map((dto) => this.monthEntryRepository.createItem({ ...dto, budgetPlanId: id })),
    );

    return await this.budgetPlanRepository.updateItem(id, {
      ...data,
      otherEntryIds: [...remainedOtherEntryIds, ...newOtherEntryIds],
    });
  }
}
