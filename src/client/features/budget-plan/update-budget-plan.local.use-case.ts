import { getNewAndDeletedRecords } from '@common/utils/get-new-and-deleted-record.util';
import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { ICrudService } from '@common/models/crud-service.model';
import type { MonthEntry } from '@common/records/month-entry.record';
import type { UpdateBudgetPlanModel } from '@common/domains/budget-plan/budget-plan.schema';
import type { BudgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { getDefaultCategory } from '@common/domains/budget-plan/get-default-category.util';
import { AppError } from '@common/classes/api-error.class';

export class UpdateBudgetPlanLocalUseCase extends TransactionalUseCase<UpdateBudgetPlanModel, true> {
  constructor(
    transactionManager: ITransactionManager,
    private budgetPlanRepository: BudgetPlanLocalRepository,
    private monthEntryRepository: ICrudService<MonthEntry>,
  ) {
    super(transactionManager);
  }

  async handle({ otherEntries: otherEntriesDto, ...data }: UpdateBudgetPlanModel): Promise<true> {
    const date = getCurrentMonthDate();
    const currentBudgetPlan = await this.budgetPlanRepository.getItem(date);

    if (!currentBudgetPlan) {
      throw new AppError(`Budget plan not found with month ${date.month} and year ${date.year}`, 404);
    }

    const {
      deletedRecords: deletedOtherEntries,
      newRecords: newOtherEntries,
      remainedRecords: remainedOtherEntryIds,
    } = getNewAndDeletedRecords(otherEntriesDto, currentBudgetPlan.otherEntryIds);

    const remainedOtherEntries = otherEntriesDto.filter((i) => i.id && remainedOtherEntryIds.includes(i.id));

    await Promise.all(
      remainedOtherEntries.map((dto) => {
        const defCategory = getDefaultCategory(dto.type);

        return this.monthEntryRepository.updateItem(dto.id as number, {
          ...dto,
          category: dto.category ?? defCategory,
          budgetPlanId: currentBudgetPlan.id,
        });
      }),
    );

    await Promise.all(deletedOtherEntries.map((id) => this.monthEntryRepository.deleteItem(id)));

    const newOtherEntryIds = await Promise.all(
      newOtherEntries.map((dto) => {
        const defCategory = getDefaultCategory(dto.type);

        return this.monthEntryRepository.createItem({
          ...dto,
          category: dto.category ?? defCategory,
          budgetPlanId: currentBudgetPlan.id,
        });
      }),
    );

    return await this.budgetPlanRepository.updateItem(currentBudgetPlan.id, {
      ...date,
      ...data,
      otherEntryIds: [...remainedOtherEntryIds, ...newOtherEntryIds],
    });
  }
}
