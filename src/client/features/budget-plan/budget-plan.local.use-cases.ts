import type { IBudgetPlanRepository } from '@common/domains/budget-plan/budget-plan.repository.model';
import { CreateBudgetPlanLocalUseCase } from '@frontend/features/budget-plan/create-budget-plan.local.use-case';
import { GetBudgetPlanLocalUseCase } from '@frontend/features/budget-plan/get-budget-plan.local.use-case';
import { UpdateBudgetPlanLocalUseCase } from '@frontend/features/budget-plan/update-budget-plan.local.use-case';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';
import { dexieTransactionManager } from '@frontend/database/dexie-transactional-manager';
import { budgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import { monthEntryLocalRepository } from '@frontend/entities/month-entry/month-entry.local.repository';
import { regularEntryLocalRepository } from '@frontend/entities/regular-entry/regular-entry.local.repository';
import type { CreateBudgetPlanDto, UpdateBudgetPlanDto } from '@common/domains/budget-plan/budget-plan.schema';

export class BudgetPlanLocalUsecases implements IBudgetPlanRepository {
  constructor(
    private readonly createBudgetPlanLocalUseCase: CreateBudgetPlanLocalUseCase,
    private readonly getBudgetPlanLocalUseCase: GetBudgetPlanLocalUseCase,
    private readonly updateBudgetPlanLocalUseCase: UpdateBudgetPlanLocalUseCase,
  ) {}

  async createItem(data: CreateBudgetPlanDto): Promise<number> {
    return this.createBudgetPlanLocalUseCase.execute(data);
  }

  async updateItem(data: UpdateBudgetPlanDto): Promise<void> {
    return this.updateBudgetPlanLocalUseCase.execute(data);
  }

  async getItem(input: GetBudgetPlanDto): Promise<BudgetPlanDetailed | null> {
    return this.getBudgetPlanLocalUseCase.execute(input);
  }
}

export const createBudgetPlanLocalUseCase = new CreateBudgetPlanLocalUseCase(
  dexieTransactionManager,
  budgetPlanLocalRepository,
  monthEntryLocalRepository,
);

export const getBudgetPlanLocalUseCase = new GetBudgetPlanLocalUseCase(
  dexieTransactionManager,
  budgetPlanLocalRepository,
  monthEntryLocalRepository,
  regularEntryLocalRepository,
);

export const updateBudgetPlanCommonUseCase = new UpdateBudgetPlanLocalUseCase(
  dexieTransactionManager,
  budgetPlanLocalRepository,
  monthEntryLocalRepository,
);

export const budgetPlanLocalUsecases = new BudgetPlanLocalUsecases(
  createBudgetPlanLocalUseCase,
  getBudgetPlanLocalUseCase,
  updateBudgetPlanCommonUseCase,
);
