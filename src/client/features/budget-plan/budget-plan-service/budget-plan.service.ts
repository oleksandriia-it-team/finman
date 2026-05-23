import { type AuthTokenService, authTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import type { IBudgetPlanRepository } from '@common/domains/budget-plan/budget-plan.repository.model';
import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import type { CreateBudgetPlanDto, UpdateBudgetPlanDto } from '@common/domains/budget-plan/budget-plan.schema';

export class BudgetPlanDataSource implements IBudgetPlanRepository {
  private local?: IBudgetPlanRepository;
  private apiClient?: IBudgetPlanRepository;

  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly localLoader: () => Promise<IBudgetPlanRepository>,
    private readonly apiClientLoader: () => Promise<IBudgetPlanRepository>,
  ) {}

  private async source(): Promise<IBudgetPlanRepository> {
    if (this.isOfflineMode) {
      this.local ??= await this.localLoader();
      return this.local;
    }
    this.apiClient ??= await this.apiClientLoader();
    return this.apiClient;
  }

  get isOfflineMode(): boolean {
    return !this.authTokenService.getAccessToken();
  }

  getItem(input: GetBudgetPlanDto): Promise<BudgetPlanDetailed | null> {
    return this.source().then((s) => s.getItem(input));
  }

  createItem(input: CreateBudgetPlanDto): Promise<number> {
    // в budget-plan.service.ts, метод createItem
    console.log('SERVICE createItem args:', JSON.stringify(input, null, 2));
    return this.source().then((s) => s.createItem(input));
  }

  updateItem(input: UpdateBudgetPlanDto): Promise<true> {
    return this.source().then((s) => s.updateItem(input));
  }
}

export const budgetPlanService = new BudgetPlanDataSource(
  authTokenService,
  () => import('./budget-plan.local.use-cases').then((m) => m.budgetPlanLocalUsecases),
  () => import('@frontend/entities/budget-plan/budget-plan.api.client').then((m) => m.budgetPlanApiClient),
);
