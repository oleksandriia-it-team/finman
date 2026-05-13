import { type BudgetPlanRepository, type GetApiBudgetPlanInput } from './budget-plan.repository';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import type { MonthEntryOrm } from '@backend/entities/month-entry/infrastructure/month-entry.orm';
import type { RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';

function toDetailedRegularEntry(entry: RegularEntryOrm): BudgetPlanDetailed['plannedRegularEntries'][number] {
  const plainEntry = {
    ...(entry as RegularEntryOrm & {
      budgetPlans?: unknown;
      user?: unknown;
    }),
  };
  delete plainEntry.budgetPlans;
  delete plainEntry.user;

  return { ...plainEntry };
}

function toDetailedMonthEntry(entry: MonthEntryOrm): BudgetPlanDetailed['otherEntries'][number] {
  const plainEntry = {
    ...(entry as MonthEntryOrm & {
      budgetPlan?: unknown;
    }),
  };
  delete plainEntry.budgetPlan;

  return { ...plainEntry };
}

export async function getDetailedBudgetPlan(
  repository: BudgetPlanRepository,
  input: GetApiBudgetPlanInput,
): Promise<BudgetPlanDetailed | null> {
  const { month, year, userId } = input;

  const budgetPlan = await repository.repository.findOne({
    where: { month, year, userId },
    relations: {
      plannedRegularEntries: true,
      otherEntries: true,
    },
  });

  if (!budgetPlan) {
    return null;
  }

  return {
    id: budgetPlan.id,
    month: budgetPlan.month,
    year: budgetPlan.year,
    softDeleted: budgetPlan.softDeleted,
    createdAt: budgetPlan.createdAt,
    updatedAt: budgetPlan.updatedAt,
    plannedRegularEntries: (budgetPlan.plannedRegularEntries ?? []).map(toDetailedRegularEntry),
    otherEntries: (budgetPlan.otherEntries ?? []).map(toDetailedMonthEntry),
  };
}
