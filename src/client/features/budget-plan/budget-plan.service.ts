import { type AuthTokenService, authTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import { budgetPlanApiClient } from '@frontend/entities/budget-plan/budget-plan.api.client';
import { budgetPlanLocalUsecases } from './budget-plan.local.use-cases';
import type { IBudgetPlanRepository } from '@common/domains/budget-plan/budget-plan.repository.model';
import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import type { CreateBudgetPlanDto, UpdateBudgetPlanDto } from '@common/domains/budget-plan/budget-plan.schema';

export class BudgetPlanDataSource implements IBudgetPlanRepository {
  constructor(
    private authTokenService: AuthTokenService,
    private local: IBudgetPlanRepository,
    private apiClient: IBudgetPlanRepository,
  ) {}

  get source() {
    if (this.isOfflineMode) {
      return this.local;
    }

    return this.apiClient;
  }

  getItem(input: GetBudgetPlanDto): Promise<BudgetPlanDetailed | null> {
    return this.source.getItem(input);
  }

  createItem(input: CreateBudgetPlanDto): Promise<number> {
    return this.source.createItem(input);
  }

  updateItem(input: UpdateBudgetPlanDto): Promise<true> {
    return this.source.updateItem(input);
  }

  get isOfflineMode() {
    return !this.authTokenService.getAccessToken();
  }
}

export const budgetPlanService = new BudgetPlanDataSource(
  authTokenService,
  budgetPlanLocalUsecases,
  budgetPlanApiClient,
);
