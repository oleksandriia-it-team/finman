import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { BudgetPlan } from '@common/records/budget-plan.record';
import type { ICrudService } from '@common/models/crud-service.model';
import type { MonthEntry } from '@common/records/month-entry.record';

export class DeleteBudgetPlanLocalUseCase extends TransactionalUseCase<number, true> {
  constructor(
    transactionManager: ITransactionManager,
    private budgetPlanRepository: ICrudService<BudgetPlan>,
    private monthEntryRepository: ICrudService<MonthEntry>,
  ) {
    super(transactionManager);
  }

  async handle(id: number): Promise<true> {
    const currentBudgetPlan = await this.budgetPlanRepository.getItemById(id);

    if (!currentBudgetPlan) {
      throw new Error(`Budget plan not found with id ${id}`);
    }

    await Promise.all(currentBudgetPlan.otherEntryIds.map((entryId) => this.monthEntryRepository.deleteItem(entryId)));

    return this.budgetPlanRepository.deleteItem(id);
  }
}
