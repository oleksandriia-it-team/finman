'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
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

export function BudgetPlanAddMonthOperationScreen() {
  const router = useRouter();
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

      router.push('/profile/budget/plans');
    } catch (err) {
      console.error('Помилка при додаванні операції:', err);
    }
  };

  return (
    <div className="flex flex-row size-full">
      <div className="w-0 flex-1 min-w-[min(25rem,100%)] flex flex-col">
        <div className="p-4 pb-0">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <UiSvgIcon
              name="calendar"
              size="sm"
            />
            <span className="text-sm">Поточний план</span>
          </div>
          <h1 className="text-3xl font-bold">
            {MonthTitles[budgetPlan.month]} {budgetPlan.year}
          </h1>
        </div>

        <BudgetPlanAddMonthOperationForm
          onCancel={() => router.push('/profile/budget/plans/edit')}
          onSuccess={handleSuccess}
        />
      </div>

      <div className="size-full flex-2 max-lg:hidden">
        <BudgetPlanFormSideBlock />
      </div>
    </div>
  );
}
