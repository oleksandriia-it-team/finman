import type { BudgetPlanFormScreenProps } from '@frontend/features/budget-plan/budget-plan-form/create-budget-plan/budget-plan-create-screen-props';
import { calculateFromAndTo } from '@common/utils/calculate-from-and-to.util';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';

export function useBudgetPlanScreenState({ initialData, onCancel }: BudgetPlanFormScreenProps) {
  const isEdit = !!initialData;

  const pageSize = 5;
  const { getPayments, getTotalCount } = useRegularTransactions();

  const {
    options,
    state: listState,
    appError,
    ...paginationRestProps
  } = usePaginationResource({
    pageSize,
    queryKey: ['budget-plan-regular-transactions'],
    getOptionsFn: async (page, pageSize) => {
      const { from, to } = calculateFromAndTo(page, pageSize);
      return getPayments(from, to);
    },
    getTotalCountFn: async () => {
      const count = await getTotalCount();
      return count ?? 0;
    },
    clearCacheOnDestroy: true,
  });

  return {
    state: listState,
    listState,
    options,
    appError,
    paginationRestProps,
    pageSize,
    isEdit,
    onCancel,
  };
}
