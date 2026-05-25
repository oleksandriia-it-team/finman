import { type ITransactionManager, TransactionalUseCase } from '@common/models/transaction-manager.model';
import type { BudgetPlanDto } from '@common/records/budget-plan.record';
import {
  budgetPlanRepository,
  type BudgetPlanRepository,
} from '@backend/entities/budget-plan/infrastructure/budget-plan.repository';
import {
  monthEntryRepository,
  type MonthEntryRepository,
} from '@backend/entities/month-entry/infrastructure/month-entry.repository';
import { typeormTransactionManager } from '@backend/database/transaction.manager';
import {
  plannedRegOpsBudgetRepository,
  type PlannedRegOpsBudgetRepository,
} from '@backend/entities/planned-reg-ops-budget/infrastructure/planned-reg-ops-budget.repository';

type CreateBudgetPlanInput = Omit<BudgetPlanDto, 'id'> & { userId: number };

export class CreateBudgetPlanApiUseCase extends TransactionalUseCase<CreateBudgetPlanInput, number> {
  constructor(
    private readonly budgetPlanRepository: BudgetPlanRepository,
    private readonly monthEntryRepository: MonthEntryRepository,
    private readonly plannedRegOpsBudgetRepository: PlannedRegOpsBudgetRepository,
    transactionManager: ITransactionManager,
  ) {
    super(transactionManager);
  }

  protected override async handle({
    plannedRegularEntryIds,
    otherEntries,
    ...input
  }: CreateBudgetPlanInput): Promise<number> {
    const data = this.budgetPlanRepository.repository.create({
      ...input,
      plannedRegularEntries: [],
      otherEntries: [],
    });

    const result = await this.budgetPlanRepository.repository.save(data);

    await this.plannedRegOpsBudgetRepository.repository.save(
      plannedRegularEntryIds.map((id) =>
        this.plannedRegOpsBudgetRepository.repository.create({ regularOperationId: id, budgetPlanId: result.id }),
      ),
    );

    await this.monthEntryRepository.repository.save(
      otherEntries.map(({ id: _, ...entry }) =>
        this.monthEntryRepository.repository.create({
          ...entry,
          description: entry.description ?? '',
          budgetPlanId: result.id,
        }),
      ),
    );

    return result.id;
  }
}

export const createBudgetPlanApiUseCase = new CreateBudgetPlanApiUseCase(
  budgetPlanRepository,
  monthEntryRepository,
  plannedRegOpsBudgetRepository,
  typeormTransactionManager,
);
