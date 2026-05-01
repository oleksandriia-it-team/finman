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

type CreateBudgetPlanInput = Omit<BudgetPlanDto, 'id'> & { userId: number };

export class CreateBudgetPlanApiUseCase extends TransactionalUseCase<CreateBudgetPlanInput, number> {
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
  }: CreateBudgetPlanInput): Promise<number> {
    const data = this.budgetPlanRepository.repository.create({
      ...input,
      plannedRegularEntries: plannedRegularEntryIds.map((id) =>
        this.plannedRegularEntryRepository.repository.create({ id }),
      ),
      otherEntries: [],
    });

    const result = await this.budgetPlanRepository.repository.save(data);

    await this.monthEntryRepository.repository.save(
      otherEntries.map((entry) => this.monthEntryRepository.repository.create({ ...entry, budgetPlanId: result.id })),
    );

    return result.id;
  }
}

export const createBudgetPlanApiUseCase = new CreateBudgetPlanApiUseCase(
  budgetPlanRepository,
  monthEntryRepository,
  regularEntryApiRepository,
  typeormTransactionManager,
);
