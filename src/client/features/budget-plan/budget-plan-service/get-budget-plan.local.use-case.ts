import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { ICrudService } from '@common/models/crud-service.model';
import type { MonthEntry } from '@common/records/month-entry.record';
import type { RegularEntry } from '@common/records/regular-entry.record';
import type { BudgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';
import type { PlannedRegOpsBudgetLocalRepository } from '@frontend/entities/planned-reg-ops-budget/planned-reg-ops-budget.local.repository';

export class GetBudgetPlanLocalUseCase extends TransactionalUseCase<GetBudgetPlanDto, BudgetPlanDetailed | null> {
  constructor(
    transactionManager: ITransactionManager,
    private readonly budgetPlanRepository: BudgetPlanLocalRepository,
    private readonly monthEntryRepository: ICrudService<MonthEntry>,
    private readonly regularEntryRepository: ICrudService<RegularEntry>,
    private readonly plannedRegOpsBudgetRepository: PlannedRegOpsBudgetLocalRepository,
  ) {
    super(transactionManager);
  }

  async handle(input: GetBudgetPlanDto): Promise<BudgetPlanDetailed | null> {
    const budgetPlan = await this.budgetPlanRepository.getItem(input);

    if (!budgetPlan) {
      return null;
    }

    const otherEntries = (
      await Promise.all(budgetPlan.otherEntryIds.map((id) => this.monthEntryRepository.getItemById(id)))
    ).filter((i) => !!i);

    const plannedRegRows = await this.plannedRegOpsBudgetRepository.getByBudgetPlanId(budgetPlan.id);

    const regularEntries = (
      await Promise.all(plannedRegRows.map((row) => this.regularEntryRepository.getItemById(row.regularOperationId)))
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
