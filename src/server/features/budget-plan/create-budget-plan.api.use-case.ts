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
import {
  regularEntryApiRepository,
  type RegularEntryApiRepository,
} from '@backend/entities/regular-entry/infrastructure/regular-entry.repository';
import { assertOwnedIds } from '@backend/shared/utils/assert-owned-ids.util';
import { ErrorTexts } from '@common/constants/error-texts.constant';

type CreateBudgetPlanInput = Omit<BudgetPlanDto, 'id'> & { userId: number };

export class CreateBudgetPlanApiUseCase extends TransactionalUseCase<CreateBudgetPlanInput, number> {
  constructor(
    private readonly budgetPlanRepository: BudgetPlanRepository,
    private readonly monthEntryRepository: MonthEntryRepository,
    private readonly plannedRegOpsBudgetRepository: PlannedRegOpsBudgetRepository,
    private readonly regularEntryRepository: RegularEntryApiRepository,
    transactionManager: ITransactionManager,
  ) {
    super(transactionManager);
  }

  protected override async handle({
    plannedRegularEntryIds,
    otherEntries,
    userId,
    ...input
  }: CreateBudgetPlanInput): Promise<number> {
    const uniqueIds = await assertOwnedIds(
      this.regularEntryRepository.repository,
      userId,
      plannedRegularEntryIds,
      ErrorTexts.PlannedRegularEntriesNotOwned,
    );

    const data = this.budgetPlanRepository.repository.create({
      ...input,
      userId,
      plannedRegularEntries: [],
      otherEntries: [],
    });

    const result = await this.budgetPlanRepository.repository.save(data);

    await this.plannedRegOpsBudgetRepository.repository.save(
      uniqueIds.map((id) =>
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
  regularEntryApiRepository,
  typeormTransactionManager,
);
