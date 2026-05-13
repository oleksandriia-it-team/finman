'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { MonthTitles } from '@common/constants/month-titles.constant';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinListPageWrapper } from '@frontend/components/wrappers/fin-list-page-wrapper';
import { FinButtonListAction } from '@frontend/components/wrappers/fin-button-list-action';
import { FinListScreenHandler } from '@frontend/components/screen-handlers/fin-list-screen-handler';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { BudgetPlanBalanceCard } from '@frontend/entities/budget-plan/ui/budget-plan-balance-card';
import { BudgetPlanEntrySection } from '@frontend/entities/budget-plan/ui/budget-plan-entry-section';
import { useBudgetPlanCurrentMonth } from '@frontend/features/budget-plan/hooks/use-budget-plan-current-month.hook';

function sumEntriesByType(entries: Array<{ type: string; sum?: number }>, type: 'income' | 'expense') {
  return entries.reduce((sum, entry) => (entry.type === type ? sum + (entry.sum ?? 0) : sum), 0);
}

function BudgetPlanListScreenSkeleton() {
  return (
    <div className="flex items-center justify-center h-40">
      <FinLoader />
    </div>
  );
}

export function BudgetPlanListScreen() {
  const router = useRouter();
  const currentDate = useMemo(() => getCurrentMonthDate(), []);
  const { data: budgetPlan, status, error } = useBudgetPlanCurrentMonth();

  const state = useMemo(() => {
    if (status === 'pending') return PromiseState.Loading;
    if (status === 'error') return PromiseState.Error;
    return PromiseState.Success;
  }, [status]);

  const plannedRegularEntries = budgetPlan?.plannedRegularEntries ?? [];
  const otherEntries = budgetPlan?.otherEntries ?? [];
  const totalIncome = sumEntriesByType(plannedRegularEntries, 'income');
  const totalExpense = sumEntriesByType(plannedRegularEntries, 'expense');
  const monthOtherIncome = sumEntriesByType(otherEntries, 'income');
  const monthOtherExpense = sumEntriesByType(otherEntries, 'expense');
  const totalBalance = totalIncome + monthOtherIncome - (totalExpense + monthOtherExpense);

  return (
    <FinListPageWrapper>
      <div className="p-4 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <UiSvgIcon
              name="calendar"
              size="sm"
            />
            <span className="text-sm">Поточний план</span>
          </div>
          <h1 className="text-3xl font-bold">
            {MonthTitles[currentDate.month]} {currentDate.year}
          </h1>
        </div>

        <FinListScreenHandler
          state={state}
          errorMessage={error instanceof Error ? error.message : 'Помилка завантаження'}
          hasData
          skeletonItems={1}
          skeleton={BudgetPlanListScreenSkeleton}
        >
          {budgetPlan ? (
            <div className="space-y-6">
              <BudgetPlanBalanceCard
                totalIncome={totalIncome + monthOtherIncome}
                totalExpense={totalExpense + monthOtherExpense}
                totalBalance={totalBalance}
              />

              <BudgetPlanEntrySection
                entries={plannedRegularEntries}
                iconName="refresh-cw"
                iconClassName="text-primary"
                title="Регулярні операції"
              />

              <BudgetPlanEntrySection
                entries={otherEntries}
                iconName="calendar-days"
                iconClassName="text-amber-500"
                title="Лише цього місяця"
                showSelectedBadge
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <p className="text-lg text-muted-foreground">Бюджетний план на цей місяць не створено</p>
              <UiButton
                variant="primary"
                size="lg"
                onClick={() => router.push('/profile/budget/plans/create')}
              >
                <UiSvgIcon
                  name="plus"
                  size="sm"
                />
                Створити новий бюджетний план
              </UiButton>
            </div>
          )}
        </FinListScreenHandler>
      </div>

      <FinButtonListAction>
        <UiButton
          variant="primary"
          size="lg"
          className="rounded-full gap-2 shadow-xl"
          onClick={() => router.push(budgetPlan ? '/profile/budget/plans/edit' : '/profile/budget/plans/create')}
        >
          <UiSvgIcon
            name={budgetPlan ? 'pencil' : 'plus'}
            size="sm"
          />
          {budgetPlan ? 'Редагувати' : 'Створити'}
        </UiButton>
      </FinButtonListAction>
    </FinListPageWrapper>
  );
}

export default BudgetPlanListScreen;
