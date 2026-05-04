import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { ICrudService } from '@common/models/crud-service.model';
import type { MonthEntry } from '@common/records/month-entry.record';
import type { RegularEntry } from '@common/records/regular-entry.record';
import type { BudgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import type { GetBudgetPlanModel } from '@common/domains/budget-plan/get-budget-plan.schema';

export class GetBudgetPlanLocalUseCase extends TransactionalUseCase<GetBudgetPlanModel, BudgetPlanDetailed | null> {
  constructor(
    transactionManager: ITransactionManager,
    private budgetPlanRepository: BudgetPlanLocalRepository,
    private monthEntryRepository: ICrudService<MonthEntry>,
    private regularEntryRepository: ICrudService<RegularEntry>,
  ) {
    super(transactionManager);
  }

  async handle(input: GetBudgetPlanModel): Promise<BudgetPlanDetailed | null> {
    const budgetPlan = await this.budgetPlanRepository.getItem(input);

    if (!budgetPlan) {
      return null;
    }

    const otherEntries = (
      await Promise.all(budgetPlan.otherEntryIds.map((id) => this.monthEntryRepository.getItemById(id)))
    ).filter((i) => !!i);

    const regularEntries = (
      await Promise.all(budgetPlan.plannedRegularEntryIds.map((id) => this.regularEntryRepository.getItemById(id)))
    ).filter((i) => !!i);

    return {
      id: budgetPlan.id,
      month: budgetPlan.month,
      year: budgetPlan.year,
      otherEntries: otherEntries,
      plannedRegularEntries: regularEntries,
      softDeleted: budgetPlan.softDeleted ?? 0,
      updatedAt: budgetPlan.updatedAt,
      createdAt: budgetPlan.createdAt,
    };
  }
}
