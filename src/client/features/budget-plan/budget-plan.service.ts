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
      if (this.local) return this.local;

      const loaded = await this.localLoader();
      this.local = loaded;
      return loaded;
    }

    if (this.apiClient) return this.apiClient;

    const loadedApi = await this.apiClientLoader();
    this.apiClient = loadedApi;
    return loadedApi;
  }

  get isOfflineMode(): boolean {
    return !this.authTokenService.getAccessToken();
  }

  getItem(input: GetBudgetPlanDto): Promise<BudgetPlanDetailed | null> {
    return this.source().then((s) => s.getItem(input));
  }

  createItem(input: CreateBudgetPlanDto): Promise<number> {
    return this.source().then((s) => s.createItem(input));
  }

  updateItem(input: UpdateBudgetPlanDto): Promise<void> {
    return this.source().then((s) => s.updateItem(input));
  }
}

export const budgetPlanService = new BudgetPlanDataSource(
  authTokenService,
  () => import('./budget-plan.local.use-cases').then((m) => m.budgetPlanLocalUsecases),
  () => import('@frontend/entities/budget-plan/budget-plan.api.client').then((m) => m.budgetPlanApiClient),
);
