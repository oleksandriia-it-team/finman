'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBudgetPlanIdUrl } from '@common/domains/budget-plan/create-budget-plan-param-url.util';
import { isCurrentMonth } from '@common/domains/budget-plan/is-current-month.util';
import { getSafeAppError } from '@common/utils/get-safe-app-error.util';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { BudgetPlanScreen } from '@frontend/features/budget-plan/budget-plan-screen';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { useUserNavStoreHook } from '@frontend/widgets/profile-mobile-navbar/user-nav-store.hook';

export default function BudgetPlanPage() {
  const router = useRouter();

  const { selectedBudgetPlanDate, lastLoadedBudgetPlan, state, error } = useSelectedBudgetPlan();
  const setPlusHidden = useUserNavStoreHook((s) => s.setPlusHidden);

  const id = createBudgetPlanIdUrl(selectedBudgetPlanDate);
  const isCurrent = isCurrentMonth(selectedBudgetPlanDate);

  useEffect(() => {
    if (state !== PromiseState.Success || lastLoadedBudgetPlan) return;
    setPlusHidden(true);
    return () => setPlusHidden(false);
  }, [state, lastLoadedBudgetPlan, setPlusHidden]);

  if (state === PromiseState.Loading) return <FinLoader />;

  if (state === PromiseState.Error) {
    const appError = getSafeAppError(error);
    return (
      <FinErrorWidget
        message={appError.message}
        status={appError.status}
      />
    );
  }

  if (lastLoadedBudgetPlan) {
    return <BudgetPlanScreen budgetPlan={lastLoadedBudgetPlan} />;
  }

  if (isCurrent) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <UiDescription className="text-center">Бюджетний план на цей місяць ще не створено</UiDescription>
        <UiButton
          variant="primary"
          size="lg"
          className="rounded-full gap-2"
          onClick={() => router.push(`/profile/budget/plans/${id}/add`)}
        >
          <UiSvgIcon
            name="plus"
            size="sm"
          />
          Створити план
        </UiButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full px-4">
      <UiTitle className="text-muted-foreground text-center">Бюджетний план на цей місяць не створено</UiTitle>
      <UiDescription className="text-muted-foreground text-center">
        Новий план можна створити лише для поточного місяця
      </UiDescription>
    </div>
  );
}
