'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan.service';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { FinListPageWrapper } from '@frontend/components/wrappers/fin-list-page-wrapper';
import { FinButtonListAction } from '@frontend/components/wrappers/fin-button-list-action';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { MonthTitles } from '@common/constants/month-titles.constant';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { cn } from '@frontend/shared/utils/cn.util';

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

  const totalBalance = totalIncome + monthOtherIncome - (totalExpense + monthOtherExpense);
  const balanceStatus = totalBalance >= 0 ? 'success' : 'danger';

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
          <div className="space-y-6">
            <div className="bg-card rounded-3xl p-6 shadow-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Загальний дохід</p>
                  <p className="text-2xl font-bold text-success">
                    <FinTransformCurrency value={totalIncome + monthOtherIncome} />
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Загальні витрати</p>
                  <p className="text-2xl font-bold text-destructive">
                    <FinTransformCurrency value={totalExpense + monthOtherExpense} />
                  </p>
                </div>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-4 flex items-center gap-3">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    balanceStatus === 'success' ? 'bg-success/10' : 'bg-destructive/10',
                  )}
                >
                  <UiSvgIcon
                    name={balanceStatus === 'success' ? 'trending-up' : 'trending-down'}
                    size="sm"
                    className={cn(balanceStatus === 'success' ? 'text-success' : 'text-destructive')}
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Баланс</p>
                  <p
                    className={cn(
                      'text-xl font-bold',
                      balanceStatus === 'success' ? 'text-success' : 'text-destructive',
                    )}
                  >
                    <FinTransformCurrency value={totalBalance} />
                  </p>
                </div>
                <div
                  className={cn(
                    'ml-auto px-3 py-1 rounded-full text-xs font-semibold',
                    balanceStatus === 'success' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive',
                  )}
                >
                  {balanceStatus === 'success' ? 'Надлишок' : 'Дефіцит'}
                </div>
              </div>
            </div>

            {/* Regular Operations Section */}
            {(budgetPlan.plannedRegularEntries ?? []).length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <UiSvgIcon
                    name="refresh-cw"
                    size="sm"
                    className="text-primary"
                  />
                  <h2 className="text-lg font-semibold">Регулярні операції</h2>
                </div>

                <div className="space-y-2">
                  {(budgetPlan.plannedRegularEntries ?? []).map((entry) => {
                    const categoryStyles = CategoriesMapping[entry.category ?? 'expense-misc'];
                    const isIncome = entry.type === 'income';

                    return (
                      <div
                        key={entry.id}
                        className="bg-card rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <UiIconBadge
                            variant={categoryStyles.variant}
                            name={categoryStyles.icon}
                            size="lg"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-sm">{entry.title}</p>
                            <p className="text-xs text-muted-foreground">{categoryStyles.label}</p>
                          </div>
                        </div>
                        <p
                          className={cn(
                            'font-bold text-sm whitespace-nowrap',
                            isIncome ? 'text-success' : 'text-destructive',
                          )}
                        >
                          {isIncome ? '+' : '-'} <FinTransformCurrency value={entry.sum ?? 0} />
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {(budgetPlan.otherEntries ?? []).length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <UiSvgIcon
                    name="calendar-days"
                    size="sm"
                    className="text-amber-500"
                  />
                  <h2 className="text-lg font-semibold">Лише цього місяця</h2>
                </div>

                <div className="space-y-2">
                  {(budgetPlan.otherEntries ?? []).map((entry) => {
                    const categoryStyles = CategoriesMapping[entry.category ?? 'expense-misc'];
                    const isIncome = entry.type === 'income';

                    return (
                      <div
                        key={entry.id}
                        className="bg-card rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <UiIconBadge
                            variant={categoryStyles.variant}
                            name={categoryStyles.icon}
                            size="lg"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-sm">{entry.title}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-xs text-muted-foreground">{categoryStyles.label}</p>
                              {entry.selected && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                  До оптимізації
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <p
                          className={cn(
                            'font-bold text-sm whitespace-nowrap',
                            isIncome ? 'text-success' : 'text-destructive',
                          )}
                        >
                          {isIncome ? '+' : '-'} <FinTransformCurrency value={entry.sum ?? 0} />
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
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
