import type { BudgetPlan, BudgetPlanDto } from '@common/records/budget-plan.record';
import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { ICrudService } from '@common/models/crud-service.model';
import type { UnregularEntry } from '@common/records/unregular-entry.record';

export class CreateBudgetPlanLocalUseCase extends TransactionalUseCase<BudgetPlanDto, number> {
  constructor(
    transactionManager: ITransactionManager,
    private budgetPlanRepository: ICrudService<BudgetPlan>,
    private unregularEntryRepository: ICrudService<UnregularEntry>,
  ) {
    super(transactionManager);
  }

  async handle({ otherEntries: otherEntriesDto, ...data }: BudgetPlanDto): Promise<number> {
    const otherEntryIds = await Promise.all(
      otherEntriesDto.map((dto) => this.unregularEntryRepository.createItem(dto)),
    );

    return await this.budgetPlanRepository.createItem({ ...data, otherEntryIds });
  }
}
