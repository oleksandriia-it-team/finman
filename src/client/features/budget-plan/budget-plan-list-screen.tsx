'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan.service';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { FinListPageWrapper } from '@frontend/components/wrappers/fin-list-page-wrapper';
import { FinListWrapper } from '@frontend/components/wrappers/fin-list-wrapper';
import { FinButtonListAction } from '@frontend/components/wrappers/fin-button-list-action';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiCard, CardContent, CardHeader, CardTitle } from '@frontend/ui/ui-card/ui-card';
import { MonthTitles } from '@common/constants/month-titles.constant';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';

export function BudgetPlanListScreen() {
  const router = useRouter();
  const currentDate = useMemo(() => getCurrentMonthDate(), []);

  const {
    data: budgetPlan,
    status,
    error,
  } = useQuery({
    queryKey: ['budget-plan', currentDate.month, currentDate.year],
    queryFn: () => budgetPlanService.getItem(currentDate),
    staleTime: 0,
  });

  const state = useMemo(() => {
    if (status === 'pending') return PromiseState.Loading;
    if (status === 'error') return PromiseState.Error;
    return PromiseState.Success;
  }, [status]);

  if (state === PromiseState.Loading) {
    return (
      <FinListPageWrapper>
        <div className="flex items-center justify-center h-full">
          <FinLoader />
        </div>
      </FinListPageWrapper>
    );
  }

  if (state === PromiseState.Error) {
    return (
      <FinListPageWrapper>
        <FinErrorWidget
          status={500}
          message={error instanceof Error ? error.message : 'Помилка завантаження'}
        />
      </FinListPageWrapper>
    );
  }

  const totalIncome = (budgetPlan?.plannedRegularEntries ?? []).reduce(
    (sum, entry) => (entry.type === 'income' ? sum + (entry.sum ?? 0) : sum),
    0,
  );

  const totalExpense = (budgetPlan?.plannedRegularEntries ?? []).reduce(
    (sum, entry) => (entry.type === 'expense' ? sum + (entry.sum ?? 0) : sum),
    0,
  );

  const monthOtherIncome = (budgetPlan?.otherEntries ?? []).reduce(
    (sum, entry) => (entry.type === 'income' ? sum + (entry.sum ?? 0) : sum),
    0,
  );

  const monthOtherExpense = (budgetPlan?.otherEntries ?? []).reduce(
    (sum, entry) => (entry.type === 'expense' ? sum + (entry.sum ?? 0) : sum),
    0,
  );

  return (
    <FinListPageWrapper>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Бюджетний план - {MonthTitles[currentDate.month]}</h1>

        {!budgetPlan ? (
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
        ) : (
          <FinListWrapper state={state}>
            <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <UiCard>
                <CardHeader>
                  <CardTitle>Регулярні операції</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Доходи:</span>
                      <span className="text-sm font-semibold text-success">
                        <FinTransformCurrency value={totalIncome} />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Витрати:</span>
                      <span className="text-sm font-semibold text-destructive">
                        <FinTransformCurrency value={totalExpense} />
                      </span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold">Баланс:</span>
                      <span
                        className={`text-sm font-bold ${totalIncome - totalExpense >= 0 ? 'text-success' : 'text-destructive'}`}
                      >
                        <FinTransformCurrency value={totalIncome - totalExpense} />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </UiCard>

              <UiCard>
                <CardHeader>
                  <CardTitle>Місячні операції</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Доходи:</span>
                      <span className="text-sm font-semibold text-success">
                        <FinTransformCurrency value={monthOtherIncome} />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Витрати:</span>
                      <span className="text-sm font-semibold text-destructive">
                        <FinTransformCurrency value={monthOtherExpense} />
                      </span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold">Баланс:</span>
                      <span
                        className={`text-sm font-bold ${monthOtherIncome - monthOtherExpense >= 0 ? 'text-success' : 'text-destructive'}`}
                      >
                        <FinTransformCurrency value={monthOtherIncome - monthOtherExpense} />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </UiCard>
            </div>

            <div className="col-span-full">
              <UiCard>
                <CardHeader>
                  <CardTitle>Деталі бюджету</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">
                        Регулярні операції ({budgetPlan.plannedRegularEntries.length})
                      </h3>
                      <ul className="space-y-2">
                        {budgetPlan.plannedRegularEntries.map((entry) => (
                          <li
                            key={entry.id}
                            className="text-sm flex justify-between"
                          >
                            <span>{entry.title}</span>
                            <span className={entry.type === 'income' ? 'text-success' : 'text-destructive'}>
                              <FinTransformCurrency value={entry.sum} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Місячні операції ({budgetPlan.otherEntries.length})</h3>
                      <ul className="space-y-2">
                        {budgetPlan.otherEntries.map((entry) => (
                          <li
                            key={entry.id}
                            className="text-sm flex justify-between"
                          >
                            <span>{entry.title}</span>
                            <span className={entry.type === 'income' ? 'text-success' : 'text-destructive'}>
                              <FinTransformCurrency value={entry.sum} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </UiCard>
            </div>
          </FinListWrapper>
        )}
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
