import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { ICrudService } from '@common/models/crud-service.model';
import type { MonthEntry } from '@common/records/month-entry.record';
import type { CreateBudgetPlanModel } from '@common/domains/budget-plan/budget-plan.schema';
import { type BudgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { getDefaultCategory } from '@common/domains/budget-plan/get-default-category.util';

export class CreateBudgetPlanLocalUseCase extends TransactionalUseCase<CreateBudgetPlanModel, number> {
  constructor(
    transactionManager: ITransactionManager,
    private budgetPlanRepository: BudgetPlanLocalRepository,
    private monthEntryRepository: ICrudService<MonthEntry>,
  ) {
    super(transactionManager);
  }

  async handle({ otherEntries: otherEntriesDto, ...data }: CreateBudgetPlanModel): Promise<number> {
    const date = getCurrentMonthDate();
    const exist = await this.budgetPlanRepository.getItem(date);

    if (exist && !exist.softDeleted) {
      throw Error('Budget plan should not be existed');
    }

    const budgetPlanId = await this.budgetPlanRepository.createItem({
      ...date,
      otherEntryIds: [],
      plannedRegularEntryIds: data.plannedRegularEntryIds,
    });

    const otherEntryIds = await Promise.all(
      otherEntriesDto.map((dto) => {
        const defCategory = getDefaultCategory(dto.type);

        return this.monthEntryRepository.createItem({ ...dto, category: dto.category ?? defCategory, budgetPlanId });
      }),
    );

    await this.budgetPlanRepository.updateItem(budgetPlanId, {
      ...date,
      otherEntryIds,
      plannedRegularEntryIds: data.plannedRegularEntryIds,
    });

    return budgetPlanId;
  }
}
