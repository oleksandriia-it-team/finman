'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { BudgetPlanAddMonthOperationForm } from '@frontend/features/budget-plan/budget-plan-add-month-operation-form/budget-plan-add-month-operation-form';
import { BudgetPlanFormSideBlock } from '@frontend/features/budget-plan/budget-plan-form-side-block/budget-plan-form-side-block';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan.service';
import { databaseLocalService } from '@frontend/database/database.local.service';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { getDefaultCategory } from '@common/domains/budget-plan/get-default-category.util';
import type { UpdateBudgetPlanDto } from '@common/domains/budget-plan/budget-plan.schema';
import { MonthTitles } from '@common/constants/month-titles.constant';
import type { MonthEntryFormData } from '@common/domains/month-entry/month-entry.schema';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';

export function BudgetPlanAddMonthOperationScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const showToast = useGlobalToast((state) => state.showToast);
  const currentDate = useMemo(() => getCurrentMonthDate(), []);
  const [isLocalReady, setIsLocalReady] = useState(!budgetPlanService.isOfflineMode);

  useEffect(() => {
    let isMounted = true;

    if (!budgetPlanService.isOfflineMode) {
      setIsLocalReady(true);
      return;
    }

    setIsLocalReady(false);

    void databaseLocalService.connect().then(() => {
      if (isMounted) {
        setIsLocalReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const {
    data: budgetPlan,
    status,
    error,
  } = useQuery({
    queryKey: ['budget-plan', 'add-month-operation', currentDate.month, currentDate.year],
    queryFn: () => budgetPlanService.getItem(currentDate),
    enabled: isLocalReady,
    staleTime: 0,
  });

  if (!isLocalReady || status === 'pending') {
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
        message="Бюджетний план не знайдено. Створіть план перед додаванням операції."
      />
    );
  }

  const handleSuccess = async (data: MonthEntryFormData) => {
    try {
      const defCategory = getDefaultCategory(data.type);
      const mappedOtherEntries = budgetPlan.otherEntries.map((entry) => {
        const { budgetPlanId: _budgetPlanId, ...rest } = entry;
        void _budgetPlanId;

        return {
          ...rest,
          description: rest.description ?? '',
        };
      }) as UpdateBudgetPlanDto['otherEntries'];

      const newOtherEntry = {
        ...data,
        description: data.description ?? '',
        category: data.category ?? defCategory,
      } as UpdateBudgetPlanDto['otherEntries'][number];

      await budgetPlanService.updateItem({
        plannedRegularEntryIds: budgetPlan.plannedRegularEntries.map((entry) => entry.id),
        otherEntries: [...mappedOtherEntries, newOtherEntry],
      });

      await queryClient.invalidateQueries({ queryKey: ['budget-plan'] });

      showToast({
        title: 'Успіх',
        description: 'Операцію додано',
        variant: 'success',
      });

      router.push('/profile/budget/plans/edit');
    } catch (err) {
      showToast({
        title: `Помилка: ${err instanceof Error ? err.message : 'Невідома помилка'}`,
        description: 'Не вдалось додати операцію',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    router.push('/profile/budget/plans/edit');
  };

  return (
    <div className="flex size-full overflow-hidden">
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background shrink-0">
          <UiButton
            type="button"
            size="sm"
            onClick={handleCancel}
            aria-label="Назад"
          >
            <UiSvgIcon
              name="arrow-left"
              size="sm"
            />
          </UiButton>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <UiSvgIcon
                name="calendar"
                size="sm"
              />
              <span className="text-xs">Поточний план</span>
            </div>
            <h1 className="text-lg font-bold leading-tight">
              {MonthTitles[budgetPlan.month]} {budgetPlan.year}
            </h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <BudgetPlanAddMonthOperationForm
            onCancel={handleCancel}
            onSuccess={handleSuccess}
          />
        </div>
      </div>

      <div className="hidden lg:flex flex-2 size-full">
        <BudgetPlanFormSideBlock />
      </div>
    </div>
  );
}
