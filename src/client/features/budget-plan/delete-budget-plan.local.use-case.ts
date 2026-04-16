import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { BudgetPlan } from '@common/records/budget-plan.record';
import type { ICrudService } from '@common/models/crud-service.model';
import type { UnregularEntry } from '@common/records/unregular-entry.record';

export class DeleteBudgetPlanLocalUseCase extends TransactionalUseCase<number, true> {
  constructor(
    transactionManager: ITransactionManager,
    private budgetPlanRepository: ICrudService<BudgetPlan>,
    private unregularEntryRepository: ICrudService<UnregularEntry>,
  ) {
    super(transactionManager);
  }

  async handle(id: number): Promise<true> {
    const currentBudgetPlan = await this.budgetPlanRepository.getItemById(id);

    if (!currentBudgetPlan) {
      throw Error(`Budget plan not found with id ${id}`);
    }

    await Promise.all(currentBudgetPlan.otherEntryIds.map((id) => this.unregularEntryRepository.deleteItem(id)));

    return this.budgetPlanRepository.deleteItem(id);
  }
}
