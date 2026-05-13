'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { MonthTitles } from '@common/constants/month-titles.constant';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinListScreenHandler } from '@frontend/components/screen-handlers/fin-list-screen-handler';
import { BudgetPlanRecommendationCard } from '@frontend/entities/budget-plan/ui/budget-plan-recommendation-card';
import { useBudgetPlanRecommendations } from '@frontend/features/budget-plan/hooks/use-budget-plan-recommendations.hook';

export function BudgetPlanRecommendationsScreen() {
  const router = useRouter();
  const { budgetPlan, status, error, sortedDraftEntries, summary, toggleEntrySelection, saveRecommendations } =
    useBudgetPlanRecommendations();

  const state = useMemo(() => {
    if (status === 'pending') return PromiseState.Loading;
    if (status === 'error') return PromiseState.Error;
    return PromiseState.Success;
  }, [status]);

  return (
    <div className="flex flex-col size-full overflow-y-auto">
      <div className="sticky top-0 bg-background/95 backdrop-blur p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <UiButton
            variant="default"
            size="sm"
            className="gap-2"
            bgNone
            onClick={() => router.push('/profile/budget/plans')}
          >
            <UiSvgIcon
              name="arrow-left"
              size="sm"
            />
            Назад
          </UiButton>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Оптимізація витрат</h1>
          <p className="text-sm text-muted-foreground">
            Перегляньте витрати за пріоритетом і позначте ті, які можна прибрати
          </p>
        </div>
      </div>

      <FinListScreenHandler
        state={state}
        errorMessage={error instanceof Error ? error.message : 'Помилка завантаження'}
        hasData
        skeletonItems={1}
        skeleton={() => (
          <div className="flex items-center justify-center h-40">
            <FinLoader />
          </div>
        )}
      >
        {!budgetPlan ? (
          <div className="p-4 text-sm text-muted-foreground">Бюджетний план не знайдено</div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UiSvgIcon
                  name="trending-down"
                  size="sm"
                />
                <span>
                  {MonthTitles[budgetPlan.month]} {budgetPlan.year}
                </span>
              </div>

              <div className="bg-card rounded-3xl p-6 shadow-lg space-y-4">
                <h2 className="text-lg font-semibold">Рекомендації</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Поточні витрати</p>
                    <div className="text-xl font-bold text-destructive">
                      <FinTransformCurrency value={summary.totalCurrentExpense} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Обрана економія</p>
                    <div className="text-xl font-bold text-success">
                      <FinTransformCurrency value={summary.totalSavings} />
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-2xl p-3">
                  <p className="text-sm text-muted-foreground mb-1">Нові витрати</p>
                  <div className="text-2xl font-bold text-destructive">
                    <FinTransformCurrency value={summary.totalNewExpense} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {summary.selectedEntriesCount} з {summary.expenseEntriesCount} пропозицій обрано
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground px-2">Пропозиції</h3>

                {sortedDraftEntries.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Немає витрат для оптимізації</p>
                ) : (
                  sortedDraftEntries.map((entry, index) => (
                    <BudgetPlanRecommendationCard
                      key={entry.id ?? index}
                      entry={entry}
                      fallbackId={index}
                      onToggle={toggleEntrySelection}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border p-4 space-y-3">
              <UiButton
                type="button"
                variant="primary"
                className="w-full py-6 font-semibold"
                onClick={saveRecommendations}
              >
                Застосувати
              </UiButton>
              <UiButton
                type="button"
                variant="default"
                className="w-full py-6 font-semibold"
                onClick={() => router.push('/profile/budget/plans')}
              >
                Пропустити
              </UiButton>
            </div>
          </>
        )}
      </FinListScreenHandler>
    </div>
  );
}
