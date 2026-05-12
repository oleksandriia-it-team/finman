'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { budgetPlanService } from 'src/client/features/budget-plan/budget-plan.service';
import { getCurrentMonthDate } from 'src/common/domains/budget-plan/get-current-month-date-util';
import { FinLoader } from 'src/client/shared/components/loader/fin-loader';
import { FinErrorWidget } from 'src/client/shared/components/error/fin-error-widget';
import { UiButton } from 'src/client/shared/ui/ui-button/ui-button';
import { UiCard, CardContent, CardHeader, CardTitle } from 'src/client/shared/ui/ui-card/ui-card';
import { FinTransformCurrency } from 'src/client/shared/components/transform-currency/fin-transform-currency';
import type { UpdateBudgetPlanDto } from 'src/common/domains/budget-plan/budget-plan.schema';
import { useGlobalToast } from 'src/client/shared/hooks/global-toast/global-toast.hook';

export default function BudgetPlanRecommendationsPage() {
  const router = useRouter();
  const showToast = useGlobalToast((state) => state.showToast);
  const currentDate = getCurrentMonthDate();

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
      setDraftEntries(
        budgetPlan.otherEntries.map((entry) => ({
          ...entry,
          description: entry.description ?? '',
        })) as UpdateBudgetPlanDto['otherEntries'],
      );
    }
  }, [budgetPlan]);

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

  const saveRecommendations = async () => {
    try {
      await budgetPlanService.updateItem({
        plannedRegularEntryIds: budgetPlan.plannedRegularEntries.map((entry) => entry.id),
        otherEntries: draftEntries,
      });
      showToast({
        title: 'Success',
        description: 'Recommendations saved',
        variant: 'success',
      });
      router.push('/profile/budget/plans');
    } catch (err) {
      showToast({
        title: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
        description: 'Could not save recommendations',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex size-full flex-col overflow-y-auto p-4 gap-6">
      <div>
        <h1 className="text-2xl font-bold">Рекомендації</h1>
        <p className="text-sm text-muted-foreground">
          Перегляньте витрати за пріоритетом і позначте ті, які можна прибрати цього місяця.
        </p>
      </div>

      <div className="grid gap-4">
        {draftEntries
          .slice()
          .sort((a, b) => a.priority - b.priority)
          .map((entry, index) => (
            <UiCard key={entry.id ?? index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-4">
                  <span>{entry.title}</span>
                  <span className={entry.type === 'income' ? 'text-success' : 'text-destructive'}>
                    <FinTransformCurrency value={entry.sum} />
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={entry.selected}
                      onChange={(e) => {
                        setDraftEntries((prev) =>
                          prev.map((item) =>
                            item.id === entry.id
                              ? {
                                  ...item,
                                  selected: e.target.checked,
                                }
                              : item,
                          ),
                        );
                      }}
                    />
                    <span className="text-sm">Вибрати для оптимізації</span>
                  </label>
                  <span className="text-sm text-muted-foreground">Пріоритет: {entry.priority}</span>
                </div>
              </CardContent>
            </UiCard>
          ))}
      </div>

      <div className="flex gap-4">
        <UiButton
          type="button"
          variant="default"
          className="flex-1"
          onClick={() => router.push('/profile/budget/plans')}
        >
          Пропустити
        </UiButton>
        <UiButton
          type="button"
          variant="primary"
          className="flex-1"
          onClick={saveRecommendations}
        >
          Зберегти рекомендації
        </UiButton>
      </div>
    </div>
  );
}
