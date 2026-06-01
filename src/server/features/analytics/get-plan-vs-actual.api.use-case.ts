import type { IUseCase } from '@common/models/use-case.model';
import {
  type BudgetPlanRepository,
  budgetPlanRepository,
} from '@backend/entities/budget-plan/infrastructure/budget-plan.repository';
import {
  type MonthEntryRepository,
  monthEntryRepository,
} from '@backend/entities/month-entry/infrastructure/month-entry.repository';
import {
  type PlannedRegOpsBudgetRepository,
  plannedRegOpsBudgetRepository,
} from '@backend/entities/planned-reg-ops-budget/infrastructure/planned-reg-ops-budget.repository';
import {
  type TrackingOperationRepository,
  trackingOperationRepository,
} from '@backend/entities/tracking-operation/infrastructure/tracking-operation.repository';
import type { PlanVsActualItem } from '@common/domains/analytics/analytics.model';
import type { PlanVsActualFilter } from '@common/domains/analytics/analytics.schema';
import { type ExpenseCategory, ExpenseCategories } from '@common/enums/categories.enum';
import { TypeEntry } from '@common/enums/entry.enum';

type Input = PlanVsActualFilter & { userId: number };

export class GetPlanVsActualApiUseCase implements IUseCase<Input, PlanVsActualItem[]> {
  constructor(
    private readonly budgetPlanRepository: BudgetPlanRepository,
    private readonly monthEntryRepository: MonthEntryRepository,
    private readonly plannedRegOpsBudgetRepository: PlannedRegOpsBudgetRepository,
    private readonly trackingOperationRepository: TrackingOperationRepository,
  ) {}

  async execute({ userId, month, year }: Input): Promise<PlanVsActualItem[]> {
    const expenseCategories = Object.values(ExpenseCategories) as ExpenseCategory[];

    const plan = await this.budgetPlanRepository.repository.findOne({
      where: { userId, month, year, softDeleted: 0 },
      select: ['id'],
    });

    const [monthEntriesByCategory, regEntriesByCategory, actualByCategory] = await Promise.all([
      plan ? this.sumMonthEntriesByCategory(plan.id) : new Map<ExpenseCategory, number>(),
      plan ? this.sumRegularEntriesByCategory(plan.id) : new Map<ExpenseCategory, number>(),
      this.trackingOperationRepository.getCategorySums(userId, TypeEntry.Expense, {
        dateFrom: { month, year },
        dateTo: { month, year },
      }),
    ]);

    return expenseCategories.map((category) => {
      const planned = (monthEntriesByCategory.get(category) ?? 0) + (regEntriesByCategory.get(category) ?? 0);
      const actual = actualByCategory.get(category) ?? 0;
      return {
        category,
        planned,
        actual,
        overspend: actual > planned,
      };
    });
  }

  private async sumMonthEntriesByCategory(budgetPlanId: number): Promise<Map<ExpenseCategory, number>> {
    const rows = await this.monthEntryRepository.repository
      .createQueryBuilder('me')
      .select('me.category', 'category')
      .addSelect('SUM(me.sum)', 'sum')
      .where('me.budgetPlanId = :budgetPlanId', { budgetPlanId })
      .andWhere('me.softDeleted = 0')
      .andWhere('me.type = :type', { type: TypeEntry.Expense })
      .groupBy('me.category')
      .getRawMany<{ category: ExpenseCategory; sum: string }>();

    return new Map(rows.map((row) => [row.category, Number.parseFloat(row.sum)]));
  }

  private async sumRegularEntriesByCategory(budgetPlanId: number): Promise<Map<ExpenseCategory, number>> {
    const rows = await this.plannedRegOpsBudgetRepository.repository
      .createQueryBuilder('prob')
      .innerJoin('prob.regularOperation', 're')
      .select('re.category', 'category')
      .addSelect('SUM(re.sum)', 'sum')
      .where('prob.budgetPlanId = :budgetPlanId', { budgetPlanId })
      .andWhere('re.softDeleted = 0')
      .andWhere('re.type = :type', { type: TypeEntry.Expense })
      .groupBy('re.category')
      .getRawMany<{ category: ExpenseCategory; sum: string }>();

    return new Map(rows.map((row) => [row.category, Number.parseFloat(row.sum)]));
  }
}

export const getPlanVsActualApiUseCase = new GetPlanVsActualApiUseCase(
  budgetPlanRepository,
  monthEntryRepository,
  plannedRegOpsBudgetRepository,
  trackingOperationRepository,
);
