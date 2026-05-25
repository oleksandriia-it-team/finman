'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan-service/budget-plan.service';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { BudgetPlanFormScreen } from '@frontend/features/budget-plan/budget-plan-form/create-budget-plan/budget-plan-create-screen';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { getSafeErrorMessage } from '@common/utils/get-safe-error-message.util';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { useBudgetPlanDraftStore } from '@frontend/features/budget-plan/hooks/budget-plan-draft';
import { useUserNavStoreHook } from '@frontend/widgets/profile-mobile-navbar/user-nav-store.hook';

export default function EditBudgetPlanPage() {
  const setCenterButton = useUserNavStoreHook((state) => state.setCenterButton);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { selectedBudgetPlanDate } = useSelectedBudgetPlan();
  const { initDraft, resetDraft } = useBudgetPlanDraftStore();

  useEffect(() => {
    setCenterButton({ icon: 'x-lg', url: `/profile/budget/plans/${id}`, size: '4xl', iconSize: 'xxl' });
    return () =>
      setCenterButton({ icon: 'pencil', url: `/profile/budget/plans/${id}/edit`, size: '4xl', iconSize: 'xxl' });
  }, [id, setCenterButton]);

  const [budgetPlan, setBudgetPlan] = useState<BudgetPlanDetailed | null>(null);
  const [state, setState] = useState<PromiseState>(PromiseState.Loading);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setState(PromiseState.Loading);
    budgetPlanService
      .getItem({ month: selectedBudgetPlanDate.month, year: selectedBudgetPlanDate.year })
      .then((plan) => {
        if (!plan) {
          router.replace(`/profile/budget/plans/${id}/add`);
          return;
        }
        resetDraft();
        initDraft(
          plan.plannedRegularEntries.map((e) => e.id),
          plan.otherEntries.map((e) => ({ ...e, id: e.id })),
        );
        setBudgetPlan(plan);
        setState(PromiseState.Success);
      })
      .catch((err) => {
        setError(err);
        setState(PromiseState.Error);
      });
  }, [selectedBudgetPlanDate.month, selectedBudgetPlanDate.year]);

  if (state === PromiseState.Loading) return <FinLoader />;

  if (state === PromiseState.Error) {
    return (
      <FinErrorWidget
        message={getSafeErrorMessage(error)}
        status={400}
      />
    );
  }

  if (!budgetPlan) return null;

  return (
    <BudgetPlanFormScreen
      initialData={budgetPlan}
      onCancel={() => router.push(`/profile/budget/plans/${id}`)}
      onSuccess={() => router.push(`/profile/budget/plans/${id}/recommendations`)}
    />
  );
}
