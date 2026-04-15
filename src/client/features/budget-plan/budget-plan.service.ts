import { type BudgetPlanLocalRepository } from '../../entities/budget-plan/budget-plan.local.repository';
import type { BudgetPlanDetailed, BudgetPlanDto } from '@common/records/budget-plan.record';
import type { ICrudService } from '@common/models/crud-service.model';
import { type CreateBudgetPlanLocalUseCase } from '@frontend/features/budget-plan/create-budget-plan.local.use-case';
import { type DeleteBudgetPlanLocalUseCase } from '@frontend/features/budget-plan/delete-budget-plan.local.use-case';
import { type GetBudgetPlanLocalUseCase } from '@frontend/features/budget-plan/get-budget-plan.local.use-case';
import { type UpdateBudgetPlanLocalUseCase } from '@frontend/features/budget-plan/update-budget-plan.local.use-case';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';

export class BudgetPlanLocalUsecases implements ICrudService<
  BudgetPlanDetailed,
  Omit<BudgetPlanDto, DefaultColumnKeys>
> {
  constructor(
    private budgetPlanLocalRepository: BudgetPlanLocalRepository,
    private createBudgetPlanLocalUseCase: CreateBudgetPlanLocalUseCase,
    private deleteBudgetPlanLocalUseCase: DeleteBudgetPlanLocalUseCase,
    private getBudgetPlanLocalUseCase: GetBudgetPlanLocalUseCase,
    private updateBudgetPlanLocalUseCase: UpdateBudgetPlanLocalUseCase,
  ) {}

  async createItem(data: BudgetPlanDto): Promise<number> {
    return this.createBudgetPlanLocalUseCase.execute(data);
  }

  async updateItem(id: number, data: BudgetPlanDto): Promise<true> {
    return this.updateBudgetPlanLocalUseCase.execute(id, data);
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
    // The result is intentionally: we will not have the method for budget plans
    return [];
  }
}
