'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan-service/budget-plan.service';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { getSafeErrorMessage } from '@common/utils/get-safe-error-message.util';
import { isCurrentMonth } from '@common/domains/budget-plan/is-current-month.util';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { BudgetPlanScreen } from '@frontend/features/budget-plan/budget-plan-screen';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useUserNavStoreHook } from '@frontend/widgets/profile-mobile-navbar/user-nav-store.hook';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';

export default function BudgetPlanPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { selectedBudgetPlanDate } = useSelectedBudgetPlan();
  const setPlusHidden = useUserNavStoreHook((s) => s.setPlusHidden);

  const [budgetPlan, setBudgetPlan] = useState<BudgetPlanDetailed | null>(null);
  const [state, setState] = useState<PromiseState>(PromiseState.Loading);
  const [error, setError] = useState<unknown>(null);

  const isCurrent = isCurrentMonth(selectedBudgetPlanDate);

  useEffect(() => {
    setState(PromiseState.Loading);
    budgetPlanService
      .getItem({ month: selectedBudgetPlanDate.month, year: selectedBudgetPlanDate.year })
      .then((plan) => {
        setBudgetPlan(plan ?? null);
        setState(PromiseState.Success);
      })
      .catch((err) => {
        setError(err);
        setState(PromiseState.Error);
      });
  }, [selectedBudgetPlanDate.month, selectedBudgetPlanDate.year]);

  useEffect(() => {
    if (state !== PromiseState.Success || budgetPlan) return;
    setPlusHidden(true);
    return () => setPlusHidden(false);
  }, [state, budgetPlan, setPlusHidden]);

  if (state === PromiseState.Loading) return <FinLoader />;

  if (state === PromiseState.Error) {
    return (
      <FinErrorWidget
        message={getSafeErrorMessage(error)}
        status={400}
      />
    );
  }

  if (budgetPlan) {
    return <BudgetPlanScreen budgetPlan={budgetPlan} />;
  }

  if (isCurrent) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <p className="text-muted-foreground text-sm">Бюджетний план на цей місяць ще не створено</p>
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
