import { type AuthTokenService, authTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import type { IAnalyticsRepository } from '@common/domains/analytics/analytics.repository.model';
import type {
  CategoryBreakdownFilter,
  MonthlyIncomeExpensesFilter,
  PlanVsActualFilter,
} from '@common/domains/analytics/analytics.schema';
import type {
  ExpensesByCategoryResponse,
  IncomesByCategoryResponse,
  MonthlyIncomeExpensesItem,
  PlanVsActualItem,
  PlanVsActualOperationItem,
} from '@common/domains/analytics/analytics.model';

export class AnalyticsDataSource implements IAnalyticsRepository {
  private local?: IAnalyticsRepository;
  private apiClient?: IAnalyticsRepository;

  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly localLoader: () => Promise<IAnalyticsRepository>,
    private readonly apiClientLoader: () => Promise<IAnalyticsRepository>,
  ) {}

  private async source(): Promise<IAnalyticsRepository> {
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

  getMonthlyIncomeExpenses(input: MonthlyIncomeExpensesFilter): Promise<MonthlyIncomeExpensesItem[]> {
    return this.source().then((s) => s.getMonthlyIncomeExpenses(input));
  }

  getExpensesByCategory(input: CategoryBreakdownFilter): Promise<ExpensesByCategoryResponse> {
    return this.source().then((s) => s.getExpensesByCategory(input));
  }

  getIncomesByCategory(input: CategoryBreakdownFilter): Promise<IncomesByCategoryResponse> {
    return this.source().then((s) => s.getIncomesByCategory(input));
  }

  getPlanVsActual(input: PlanVsActualFilter): Promise<PlanVsActualItem[]> {
    return this.source().then((s) => s.getPlanVsActual(input));
  }

  getPlanVsActualOperations(input: PlanVsActualFilter): Promise<PlanVsActualOperationItem[]> {
    return this.source().then((s) => s.getPlanVsActualOperations(input));
  }
}

export const analyticsService = new AnalyticsDataSource(
  authTokenService,
  () => import('@frontend/features/analytics/analytics.local.use-cases').then((m) => m.analyticsLocalUsecases),
  () => import('@frontend/entities/analytics/analytics.api.client').then((m) => m.analyticsApiClient),
);
