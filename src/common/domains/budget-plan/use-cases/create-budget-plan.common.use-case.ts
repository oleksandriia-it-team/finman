import type { BudgetPlan, BudgetPlanDto } from '@common/records/budget-plan.record';
import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { ICrudService } from '@common/models/crud-service.model';
import type { MonthEntry } from '@common/records/month-entry.record';

export class CreateBudgetPlanCommonUseCase extends TransactionalUseCase<BudgetPlanDto, number> {
  constructor(
    transactionManager: ITransactionManager,
    private budgetPlanRepository: ICrudService<BudgetPlan>,
    private monthEntryRepository: ICrudService<MonthEntry>,
  ) {
    super(transactionManager);
  }

  async handle({ otherEntries: otherEntriesDto, ...data }: BudgetPlanDto): Promise<number> {
    const id = await this.budgetPlanRepository.createItem({ ...data, otherEntryIds: [] });

    const otherEntryIds = await Promise.all(
      otherEntriesDto.map((dto) => this.monthEntryRepository.createItem({ ...dto, budgetPlanId: id })),
    );

    await this.budgetPlanRepository.updateItem(id, { ...data, otherEntryIds });

    return id;
  }
}
