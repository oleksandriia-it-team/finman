'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { MonthTitles } from '@common/constants/month-titles.constant';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { cn } from '@frontend/shared/utils/cn.util';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan.service';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import type { UpdateBudgetPlanDto } from '@common/domains/budget-plan/budget-plan.schema';
import {
  calculateBudgetPlanRecommendationSummary,
  normalizeBudgetPlanRecommendationEntries,
  sortBudgetPlanRecommendationEntries,
  toggleBudgetPlanRecommendationEntry,
} from '@frontend/features/budget-plan/utils/budget-plan-recommendations.util';

export function BudgetPlanRecommendationsScreen() {
  const router = useRouter();
  const showToast = useGlobalToast((state) => state.showToast);
  const currentDate = useMemo(() => getCurrentMonthDate(), []);

  const {
    data: budgetPlan,
    status,
    error,
  } = useQuery({
    queryKey: ['budget-plan', 'recommendations', currentDate.month, currentDate.year],
    queryFn: () => budgetPlanService.getItem(currentDate),
    staleTime: 0,
  });

  const [draftEntries, setDraftEntries] = useState<UpdateBudgetPlanDto['otherEntries']>([]);

  useEffect(() => {
    if (budgetPlan?.otherEntries) {
      setDraftEntries(normalizeBudgetPlanRecommendationEntries(budgetPlan.otherEntries));
    }
  }, [budgetPlan]);

  const sortedDraftEntries = useMemo(() => sortBudgetPlanRecommendationEntries(draftEntries), [draftEntries]);
  const summary = useMemo(() => calculateBudgetPlanRecommendationSummary(draftEntries), [draftEntries]);

  const toggleEntrySelection = (entryId: number) => {
    setDraftEntries((prev) => toggleBudgetPlanRecommendationEntry(prev, entryId));
  };

  const saveRecommendations = async () => {
    if (!budgetPlan) {
      return;
    }

    try {
      await budgetPlanService.updateItem({
        plannedRegularEntryIds: budgetPlan.plannedRegularEntries.map((entry) => entry.id),
        otherEntries: draftEntries,
      });

      showToast({
        title: 'Успіх',
        description: 'Рекомендації застосовані',
        variant: 'success',
      });
      router.push('/profile/budget/plans');
    } catch (err) {
      showToast({
        title: `Помилка: ${err instanceof Error ? err.message : 'Невідома помилка'}`,
        description: 'Не вдалось зберегти рекомендації',
        variant: 'destructive',
      });
    }
  };

  if (status === 'pending') {
    return (
      <div className="flex items-center justify-center h-full">
        <FinLoader />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <FinErrorWidget
        status={500}
        message={error instanceof Error ? error.message : 'Помилка завантаження'}
      />
    );
  }

  if (!budgetPlan) {
    return (
      <FinErrorWidget
        status={404}
        message="Бюджетний план не знайдено"
      />
    );
  }

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
            sortedDraftEntries.map((entry, index) => {
              const categoryStyles = CategoriesMapping[entry.category ?? 'expense-misc'];
              const isSelected = entry.selected;

              return (
                <div
                  key={entry.id ?? index}
                  className={cn(
                    'bg-card rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer',
                    isSelected && 'ring-2 ring-primary',
                  )}
                  onClick={() => toggleEntrySelection(entry.id ?? index)}
                >
                  <div
                    className={cn(
                      'w-6 h-6 rounded border-2 border-border flex items-center justify-center flex-shrink-0',
                      isSelected && 'bg-primary border-primary',
                    )}
                  >
                    {isSelected && (
                      <UiSvgIcon
                        name="check"
                        size="sm"
                        className="text-white"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <UiIconBadge
                      variant={categoryStyles.variant}
                      name={categoryStyles.icon}
                      size="lg"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm">{entry.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {categoryStyles.label} • Важливість: {entry.priority}
                      </p>
                    </div>
                  </div>

                  <div className="font-bold text-sm text-destructive whitespace-nowrap ml-auto">
                    - <FinTransformCurrency value={entry.sum ?? 0} />
                  </div>

                  <div
                    className={cn(
                      'px-2 py-1 rounded-full text-xs font-semibold',
                      entry.priority >= 7
                        ? 'bg-destructive/10 text-destructive'
                        : entry.priority >= 4
                          ? 'bg-amber-500/10 text-amber-600'
                          : 'bg-success/10 text-success',
                    )}
                  >
                    {entry.priority >= 7 ? 'Високий' : entry.priority >= 4 ? 'Середній' : 'Низький'}
                  </div>
                </div>
              );
            })
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
    </div>
  );
}
