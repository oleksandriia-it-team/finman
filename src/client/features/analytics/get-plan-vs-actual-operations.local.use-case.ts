import type { IUseCase } from '@common/models/use-case.model';
import type { PlanVsActualFilter } from '@common/domains/analytics/analytics.schema';
import type { PlanVsActualOperationItem } from '@common/domains/analytics/analytics.model';
import type { ExpenseCategory } from '@common/enums/categories.enum';
import { TypeEntry } from '@common/enums/entry.enum';
import type { TrackingOperationLocalRepository } from '@frontend/entities/tracking-operations/tracking-operation.local.repository';
import type { BudgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import type { MonthEntryLocalRepository } from '@frontend/entities/month-entry/month-entry.local.repository';
import type { PlannedRegOpsBudgetLocalRepository } from '@frontend/entities/planned-reg-ops-budget/planned-reg-ops-budget.local.repository';
import type { RegularEntryLocalRepository } from '@frontend/entities/regular-entry/regular-entry.local.repository';

interface PlannedOperationRow {
  id: number;
  title: string;
  sum: number;
  category: ExpenseCategory;
}

export class GetPlanVsActualOperationsLocalUseCase implements IUseCase<
  PlanVsActualFilter,
  PlanVsActualOperationItem[]
> {
  constructor(
    private readonly trackingOperationRepository: TrackingOperationLocalRepository,
    private readonly budgetPlanRepository: BudgetPlanLocalRepository,
    private readonly monthEntryRepository: MonthEntryLocalRepository,
    private readonly plannedRegOpsBudgetRepository: PlannedRegOpsBudgetLocalRepository,
    private readonly regularEntryRepository: RegularEntryLocalRepository,
  ) {}

  async execute({ month, year }: PlanVsActualFilter): Promise<PlanVsActualOperationItem[]> {
    const plan = await this.budgetPlanRepository.getItem({ month, year });
    if (!plan) return [];

    const [monthEntries, regEntries] = await Promise.all([
      this.getMonthEntries(plan.id),
      this.getRegularEntries(plan.id),
    ]);

    const [actualByMonthEntry, actualByRegEntry] = await Promise.all([
      this.sumActualByAttachment('attachedPlannedMonthEntryId', monthEntries),
      this.sumActualByAttachment('attachedPlannedRegEntryId', regEntries),
    ]);

    return [
      ...monthEntries.map((entry) => this.toItem(entry, actualByMonthEntry.get(entry.id) ?? 0, 'month')),
      ...regEntries.map((entry) => this.toItem(entry, actualByRegEntry.get(entry.id) ?? 0, 'regular')),
    ];
  }

  private toItem(entry: PlannedOperationRow, actual: number, source: 'month' | 'regular'): PlanVsActualOperationItem {
    return {
      id: entry.id,
      title: entry.title,
      category: entry.category,
      planned: entry.sum,
      actual,
      overspend: actual > entry.sum,
      source,
    };
  }

  private async getMonthEntries(budgetPlanId: number): Promise<PlannedOperationRow[]> {
    const entries = await this.monthEntryRepository.table
      .filter(
        (entry) => entry.budgetPlanId === budgetPlanId && entry.softDeleted === 0 && entry.type === TypeEntry.Expense,
      )
      .toArray();

    return entries.map((entry) => ({
      id: entry.id,
      title: entry.title,
      sum: entry.sum,
      category: entry.category as ExpenseCategory,
    }));
  }

  private async getRegularEntries(budgetPlanId: number): Promise<PlannedOperationRow[]> {
    const joinRows = (await this.plannedRegOpsBudgetRepository.getByBudgetPlanId(budgetPlanId)).filter(
      (row) => row.softDeleted === 0,
    );

    const rows = await Promise.all(
      joinRows.map(async (row) => {
        const reg = await this.regularEntryRepository.getItemById(row.regularOperationId);
        if (!reg || reg.softDeleted !== 0 || reg.type !== TypeEntry.Expense) return null;
        return { id: row.id, title: reg.title, sum: reg.sum, category: reg.category as ExpenseCategory };
      }),
    );

    return rows.filter((row): row is PlannedOperationRow => row !== null);
  }

  private async sumActualByAttachment(
    column: 'attachedPlannedMonthEntryId' | 'attachedPlannedRegEntryId',
    entries: PlannedOperationRow[],
  ): Promise<Map<number, number>> {
    if (entries.length === 0) return new Map();

    const ids = new Set(entries.map((entry) => entry.id));
    const ops = await this.trackingOperationRepository.table
      .filter((op) => op.softDeleted === 0 && op[column] != null && ids.has(op[column] as number))
      .toArray();

    const sums = new Map<number, number>();
    for (const op of ops) {
      const attachedId = op[column] as number;
      sums.set(attachedId, (sums.get(attachedId) ?? 0) + op.sum);
    }
    return sums;
  }
}
