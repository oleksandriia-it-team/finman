import type {
  IBudgetPlanRepository,
  UpdateBudgetPlanModel,
} from '@common/domains/budget-plan/budget-plan.repository.model';
import { CreateBudgetPlanLocalUseCase } from '@frontend/features/budget-plan/create-budget-plan.local.use-case';
import { GetBudgetPlanLocalUseCase } from '@frontend/features/budget-plan/get-budget-plan.local.use-case';
import { UpdateBudgetPlanLocalUseCase } from '@frontend/features/budget-plan/update-budget-plan.local.use-case';
import type { BudgetPlanDetailed, BudgetPlanDto } from '@common/records/budget-plan.record';
import type { GetBudgetPlanModel } from '@common/domains/budget-plan/get-budget-plan.schema';
import { dexieTransactionManager } from '@frontend/database/dexie-transactional-manager';
import { budgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import { monthEntryLocalRepository } from '@frontend/entities/month-entry/month-entry.local.repository';
import { regularEntryLocalRepository } from '@frontend/entities/regular-entry/regular-entry.local.repository';

export class BudgetPlanLocalUsecases implements IBudgetPlanRepository {
  constructor(
    private createBudgetPlanLocalUseCase: CreateBudgetPlanLocalUseCase,
    private getBudgetPlanLocalUseCase: GetBudgetPlanLocalUseCase,
    private updateBudgetPlanLocalUseCase: UpdateBudgetPlanLocalUseCase,
  ) {}

  async createItem(data: BudgetPlanDto): Promise<number> {
    return this.createBudgetPlanLocalUseCase.execute(data);
  }

  async updateItem(data: UpdateBudgetPlanModel): Promise<true> {
    return this.updateBudgetPlanLocalUseCase.execute(data);
  }

  async getItem(input: GetBudgetPlanModel): Promise<BudgetPlanDetailed | null> {
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
