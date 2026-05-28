import type { IUseCase } from '@common/models/use-case.model';
import type { PlanVsActualFilter } from '@common/domains/analytics/analytics.schema';
import type { PlanVsActualItem } from '@common/domains/analytics/analytics.model';
import { monthYearToEndDate, monthYearToStartDate } from '@common/domains/analytics/month-range.util';
import { type AllCategories, type ExpenseCategory, ExpenseCategories } from '@common/enums/categories.enum';
import { TypeEntry } from '@common/enums/entry.enum';
import type { TrackingOperationLocalRepository } from '@frontend/entities/tracking-operations/tracking-operation.local.repository';
import type { BudgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import type { MonthEntryLocalRepository } from '@frontend/entities/month-entry/month-entry.local.repository';
import type { PlannedRegOpsBudgetLocalRepository } from '@frontend/entities/planned-reg-ops-budget/planned-reg-ops-budget.local.repository';
import type { RegularEntryLocalRepository } from '@frontend/entities/regular-entry/regular-entry.local.repository';

export class GetPlanVsActualLocalUseCase implements IUseCase<PlanVsActualFilter, PlanVsActualItem[]> {
  constructor(
    private readonly trackingOperationRepository: TrackingOperationLocalRepository,
    private readonly budgetPlanRepository: BudgetPlanLocalRepository,
    private readonly monthEntryRepository: MonthEntryLocalRepository,
    private readonly plannedRegOpsBudgetRepository: PlannedRegOpsBudgetLocalRepository,
    private readonly regularEntryRepository: RegularEntryLocalRepository,
  ) {}

  async execute({ month, year }: PlanVsActualFilter): Promise<PlanVsActualItem[]> {
    const expenseCategories = Object.values(ExpenseCategories) as ExpenseCategory[];
    const plan = await this.budgetPlanRepository.getItem({ month, year });

    const [monthEntriesByCategory, regEntriesByCategory, actualByCategory] = await Promise.all([
      plan ? this.sumMonthEntriesByCategory(plan.id) : new Map<AllCategories, number>(),
      plan ? this.sumRegularEntriesByCategory(plan.id) : new Map<AllCategories, number>(),
      this.sumActualExpensesByCategory(month, year),
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

  private async sumMonthEntriesByCategory(budgetPlanId: number): Promise<Map<AllCategories, number>> {
    const entries = await this.monthEntryRepository.table
      .filter(
        (entry) => entry.budgetPlanId === budgetPlanId && entry.softDeleted === 0 && entry.type === TypeEntry.Expense,
      )
      .toArray();

    const sums = new Map<AllCategories, number>();
    for (const entry of entries) {
      sums.set(entry.category, (sums.get(entry.category) ?? 0) + entry.sum);
    }
    return sums;
  }

  private async sumRegularEntriesByCategory(budgetPlanId: number): Promise<Map<AllCategories, number>> {
    const joinRows = await this.plannedRegOpsBudgetRepository.getByBudgetPlanId(budgetPlanId);

    const regulars = await Promise.all(
      joinRows
        .filter((row) => row.softDeleted === 0)
        .map((row) => this.regularEntryRepository.getItemById(row.regularOperationId)),
    );

    const sums = new Map<AllCategories, number>();
    for (const reg of regulars) {
      if (!reg || reg.type !== TypeEntry.Expense) continue;
      sums.set(reg.category, (sums.get(reg.category) ?? 0) + reg.sum);
    }
    return sums;
  }

  private async sumActualExpensesByCategory(
    month: PlanVsActualFilter['month'],
    year: number,
  ): Promise<Map<AllCategories, number>> {
    const from = monthYearToStartDate({ month, year });
    const to = monthYearToEndDate({ month, year });

    const ops = await this.trackingOperationRepository.table
      .where('date')
      .between(from, to, true, true)
      .filter((op) => op.softDeleted === 0 && op.type === TypeEntry.Expense)
      .toArray();

    const sums = new Map<AllCategories, number>();
    for (const op of ops) {
      sums.set(op.category, (sums.get(op.category) ?? 0) + op.sum);
    }
    return sums;
  }
}
