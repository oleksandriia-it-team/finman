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
import {
  regularEntryApiRepository,
  type RegularEntryApiRepository,
} from '@backend/entities/regular-entry/infrastructure/regular-entry.repository';
import { typeormTransactionManager } from '@backend/database/transaction.manager';

type UpdateBudgetPlanInput = BudgetPlanDto & { userId: number; id: number };

export class UpdateBudgetPlanApiUseCase extends TransactionalUseCase<UpdateBudgetPlanInput, true> {
  constructor(
    private budgetPlanRepository: BudgetPlanRepository,
    private monthEntryRepository: MonthEntryRepository,
    private plannedRegularEntryRepository: RegularEntryApiRepository,
    transactionManager: ITransactionManager,
  ) {
    super(transactionManager);
  }

  protected override async handle({
    plannedRegularEntryIds,
    otherEntries,
    ...input
  }: UpdateBudgetPlanInput): Promise<true> {
    const data = this.budgetPlanRepository.repository.create({
      ...input,
      plannedRegularEntries: plannedRegularEntryIds.map((id) =>
        this.plannedRegularEntryRepository.repository.create({ id }),
      ),
      otherEntries: otherEntries.map(({ id: _, ...entry }) =>
        this.monthEntryRepository.repository.create({ ...entry }),
      ),
    });

    await this.budgetPlanRepository.repository.save(data);

    return true as const;
  }
}

export const updateBudgetPlanApiUseCase = new UpdateBudgetPlanApiUseCase(
  budgetPlanRepository,
  monthEntryRepository,
  regularEntryApiRepository,
  typeormTransactionManager,
);
