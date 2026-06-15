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
import type { PlanVsActualOperationItem } from '@common/domains/analytics/analytics.model';
import type { PlanVsActualFilter } from '@common/domains/analytics/analytics.schema';
import type { ExpenseCategory } from '@common/enums/categories.enum';
import { TypeEntry } from '@common/enums/entry.enum';

type Input = PlanVsActualFilter & { userId: number };

interface PlannedOperationRow {
  id: number;
  title: string;
  sum: number;
  category: ExpenseCategory;
}

export class GetPlanVsActualOperationsApiUseCase implements IUseCase<Input, PlanVsActualOperationItem[]> {
  constructor(
    private readonly budgetPlanRepository: BudgetPlanRepository,
    private readonly monthEntryRepository: MonthEntryRepository,
    private readonly plannedRegOpsBudgetRepository: PlannedRegOpsBudgetRepository,
    private readonly trackingOperationRepository: TrackingOperationRepository,
  ) {}

  async execute({ userId, month, year }: Input): Promise<PlanVsActualOperationItem[]> {
    const plan = await this.budgetPlanRepository.repository.findOne({
      where: { userId, month, year, softDeleted: 0 },
      select: ['id'],
    });
    if (!plan) return [];

    const [monthEntries, regEntries] = await Promise.all([
      this.getMonthEntries(plan.id),
      this.getRegularEntries(plan.id),
    ]);

    const [actualByMonthEntry, actualByRegEntry] = await Promise.all([
      this.sumActualByAttachment(userId, 'attachedPlannedMonthEntryId', monthEntries),
      this.sumActualByAttachment(userId, 'attachedPlannedRegEntryId', regEntries),
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

  private getMonthEntries(budgetPlanId: number): Promise<PlannedOperationRow[]> {
    return this.monthEntryRepository.repository
      .createQueryBuilder('me')
      .select(['me.id AS id', 'me.title AS title', 'me.sum AS sum', 'me.category AS category'])
      .where('me.budgetPlanId = :budgetPlanId', { budgetPlanId })
      .andWhere('me.softDeleted = 0')
      .andWhere('me.type = :type', { type: TypeEntry.Expense })
      .getRawMany<{ id: number; title: string; sum: number; category: ExpenseCategory }>()
      .then((rows) => rows.map((row) => ({ ...row, sum: Number(row.sum) })));
  }

  private getRegularEntries(budgetPlanId: number): Promise<PlannedOperationRow[]> {
    return this.plannedRegOpsBudgetRepository.repository
      .createQueryBuilder('prob')
      .innerJoin('prob.regularOperation', 're')
      .select(['prob.id AS id', 're.title AS title', 're.sum AS sum', 're.category AS category'])
      .where('prob.budgetPlanId = :budgetPlanId', { budgetPlanId })
      .andWhere('re.softDeleted = 0')
      .andWhere('re.type = :type', { type: TypeEntry.Expense })
      .getRawMany<{ id: number; title: string; sum: number; category: ExpenseCategory }>()
      .then((rows) => rows.map((row) => ({ ...row, sum: Number(row.sum) })));
  }

  private async sumActualByAttachment(
    userId: number,
    column: 'attachedPlannedMonthEntryId' | 'attachedPlannedRegEntryId',
    entries: PlannedOperationRow[],
  ): Promise<Map<number, number>> {
    if (entries.length === 0) return new Map();

    const rows = await this.trackingOperationRepository.repository
      .createQueryBuilder('op')
      .select(`op.${column}`, 'attachedId')
      .addSelect('SUM(op.sum)', 'sum')
      .where('op.userId = :userId', { userId })
      .andWhere('op.softDeleted = 0')
      .andWhere(`op.${column} IN (:...ids)`, { ids: entries.map((entry) => entry.id) })
      .groupBy(`op.${column}`)
      .getRawMany<{ attachedId: number; sum: string }>();

    return new Map(rows.map((row) => [Number(row.attachedId), Number.parseFloat(row.sum)]));
  }
}

export const getPlanVsActualOperationsApiUseCase = new GetPlanVsActualOperationsApiUseCase(
  budgetPlanRepository,
  monthEntryRepository,
  plannedRegOpsBudgetRepository,
  trackingOperationRepository,
);
