import { getNewAndDeletedRecords } from '@common/utils/get-new-and-deleted-record.util';
import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { ICrudService } from '@common/models/crud-service.model';
import type { MonthEntry } from '@common/records/month-entry.record';
import type { UpdateBudgetPlanDto } from '@common/domains/budget-plan/budget-plan.schema';
import type { BudgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { getDefaultCategory } from '@common/domains/budget-plan/get-default-category.util';
import { AppError } from '@common/classes/app-error.class';
import { formatBudgetPlanNotFoundForMonth } from '@common/constants/error-texts.constant';
import { type PlannedRegOpsBudgetLocalRepository } from '@frontend/entities/planned-reg-ops-budget/planned-reg-ops-budget.local.repository';

export class UpdateBudgetPlanLocalUseCase extends TransactionalUseCase<UpdateBudgetPlanDto, true> {
  constructor(
    transactionManager: ITransactionManager,
    private readonly budgetPlanRepository: BudgetPlanLocalRepository,
    private readonly monthEntryRepository: ICrudService<MonthEntry>,
    private readonly plannedRegOpsBudgetRepository: PlannedRegOpsBudgetLocalRepository,
  ) {
    super(transactionManager);
  }

  async handle({ otherEntries: otherEntriesDto, plannedRegularEntryIds }: UpdateBudgetPlanDto): Promise<true> {
    const date = getCurrentMonthDate();
    const currentBudgetPlan = await this.budgetPlanRepository.getItem(date);

    if (!currentBudgetPlan) {
      const { messageKey, messageParams } = formatBudgetPlanNotFoundForMonth(date.month, date.year);
      throw new AppError(messageKey, 404, messageParams);
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

    const currentJoinRows = await this.plannedRegOpsBudgetRepository.getByBudgetPlanId(currentBudgetPlan.id);
    const currentRegIds = currentJoinRows.map((r) => r.regularOperationId);

    const joinRowsToDelete = currentJoinRows.filter((r) => !plannedRegularEntryIds.includes(r.regularOperationId));
    const regIdsToAdd = plannedRegularEntryIds.filter((id) => !currentRegIds.includes(id));

    await Promise.all(joinRowsToDelete.map((r) => this.plannedRegOpsBudgetRepository.deleteItem(r.id)));

    await Promise.all(
      regIdsToAdd.map((regularOperationId) =>
        this.plannedRegOpsBudgetRepository.createItem({ regularOperationId, budgetPlanId: currentBudgetPlan.id }),
      ),
    );

    return await this.budgetPlanRepository.updateItem(currentBudgetPlan.id, {
      ...date,
      otherEntryIds: [...remainedOtherEntryIds, ...newOtherEntryIds],
    });
  }
}
