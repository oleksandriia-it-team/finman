'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBudgetPlanIdUrl } from '@common/domains/budget-plan/create-budget-plan-param-url.util';
import { getSafeAppError } from '@common/utils/get-safe-app-error.util';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { BudgetPlanFormScreen } from '@frontend/features/budget-plan/budget-plan-form/create-budget-plan/budget-plan-create-screen';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { useBudgetPlanDraftStore } from '@frontend/features/budget-plan/hooks/budget-plan-draft';
import { useUserNavStoreHook } from '@frontend/widgets/profile-mobile-navbar/user-nav-store.hook';

export default function EditBudgetPlanPage() {
  const setCenterButton = useUserNavStoreHook((state) => state.setCenterButton);
  const router = useRouter();

  const { selectedBudgetPlanDate, lastLoadedBudgetPlan, state, error } = useSelectedBudgetPlan();
  const { initDraft, resetDraft } = useBudgetPlanDraftStore();

  const id = createBudgetPlanIdUrl(selectedBudgetPlanDate);

  useEffect(() => {
    setCenterButton({ icon: 'x-lg', url: `/profile/budget/plans/${id}`, size: '4xl', iconSize: 'xxl' });
    return () =>
      setCenterButton({ icon: 'pencil', url: `/profile/budget/plans/${id}/edit`, size: '4xl', iconSize: 'xxl' });
  }, [id, setCenterButton]);

  useEffect(() => {
    if (state === PromiseState.Success && !lastLoadedBudgetPlan) {
      router.replace(`/profile/budget/plans/${id}/add`);
      return;
    }
    if (state === PromiseState.Success && lastLoadedBudgetPlan) {
      resetDraft();
      initDraft(
        lastLoadedBudgetPlan.plannedRegularEntries,
        lastLoadedBudgetPlan.otherEntries.map((e) => ({ ...e, id: e.id })),
      );
    }
  }, [state, lastLoadedBudgetPlan, id, router, initDraft, resetDraft]);

  if (state === PromiseState.Loading) return <FinLoader />;

  if (state === PromiseState.Error || (state === PromiseState.Success && !lastLoadedBudgetPlan)) {
    const appError = getSafeAppError(error);
    return (
      <FinErrorWidget
        message={appError.message}
        status={appError.status}
      />
    );
  }

  if (!lastLoadedBudgetPlan) return null;

  return (
    <BudgetPlanFormScreen
      initialData={lastLoadedBudgetPlan}
      onCancel={() => router.push(`/profile/budget/plans/${id}`)}
      onSuccess={() => router.push(`/profile/budget/plans/${id}/recommendations`)}
    />
  );
}
