import {
  budgetPlanLocalRepository,
  type BudgetPlanLocalRepository,
} from '../../entities/budget-plan/budget-plan.local.repository';
import type { BudgetPlanDetailed, BudgetPlanDto } from '@common/records/budget-plan.record';
import type { ICrudService } from '@common/models/crud-service.model';
import { CreateBudgetPlanCommonUseCase } from '@common/domains/budget-plan/use-cases/create-budget-plan.common.use-case';
import { DeleteBudgetPlanLocalUseCase } from '@frontend/features/budget-plan/delete-budget-plan.local.use-case';
import { GetBudgetPlanLocalUseCase } from '@frontend/features/budget-plan/get-budget-plan.local.use-case';
import { UpdateBudgetPlanCommonUseCase } from '@common/domains/budget-plan/use-cases/update-budget-plan.common.use-case';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import { dexieTransactionManager } from '@frontend/database/dexie-transactional-manager';
import { unregularEntryLocalRepository } from '@frontend/entities/unregular-entry/unregular-entry.local.repository';
import { regularEntryLocalRepository } from '@frontend/entities/regular-entry/regular-entry.local.repository';

export class BudgetPlanLocalUsecases implements ICrudService<
  BudgetPlanDetailed,
  Omit<BudgetPlanDto, DefaultColumnKeys>
> {
  constructor(
    private budgetPlanLocalRepository: BudgetPlanLocalRepository,
    private createBudgetPlanLocalUseCase: CreateBudgetPlanCommonUseCase,
    private deleteBudgetPlanLocalUseCase: DeleteBudgetPlanLocalUseCase,
    private getBudgetPlanLocalUseCase: GetBudgetPlanLocalUseCase,
    private updateBudgetPlanLocalUseCase: UpdateBudgetPlanCommonUseCase,
  ) {}

  async createItem(data: BudgetPlanDto): Promise<number> {
    return this.createBudgetPlanLocalUseCase.execute(data);
  }

  async updateItem(id: number, data: BudgetPlanDto): Promise<true> {
    return this.updateBudgetPlanLocalUseCase.execute({ id, ...data });
  }

  async getTotalCount(): Promise<number> {
    return this.budgetPlanLocalRepository.getTotalCount();
  }

  async deleteItem(id: number): Promise<true> {
    return this.deleteBudgetPlanLocalUseCase.execute(id);
  }

  async getItemById(id: number): Promise<BudgetPlanDetailed | null> {
    return this.getBudgetPlanLocalUseCase.execute(id);
  }

  async getItems(): Promise<BudgetPlanDetailed[]> {
    // Intentionally unsupported: listing budget plans is not required by this service.
    return [];
  }
}

export const createBudgetPlanLocalUseCase = new CreateBudgetPlanCommonUseCase(
  dexieTransactionManager,
  budgetPlanLocalRepository,
  unregularEntryLocalRepository,
);

export const deleteBudgetPlanLocalUseCase = new DeleteBudgetPlanLocalUseCase(
  dexieTransactionManager,
  budgetPlanLocalRepository,
  unregularEntryLocalRepository,
);

export const getBudgetPlanLocalUseCase = new GetBudgetPlanLocalUseCase(
  dexieTransactionManager,
  budgetPlanLocalRepository,
  unregularEntryLocalRepository,
  regularEntryLocalRepository,
);

export const updateBudgetPlanCommonUseCase = new UpdateBudgetPlanCommonUseCase(
  dexieTransactionManager,
  budgetPlanLocalRepository,
  unregularEntryLocalRepository,
);

export const budgetPlanLocalUsecases = new BudgetPlanLocalUsecases(
  budgetPlanLocalRepository,
  createBudgetPlanLocalUseCase,
  deleteBudgetPlanLocalUseCase,
  getBudgetPlanLocalUseCase,
  updateBudgetPlanCommonUseCase,
);
