import type { Month } from '@common/enums/month.enum';
import { useQuery } from '@tanstack/react-query';
import { createBudgetPlanIdUrl } from '@common/domains/budget-plan/create-budget-plan-param-url.util';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan.service';
import { getPromiseState } from '@frontend/shared/utils/get-promise-state.util';
import { getSafeErrorMessage } from '@common/utils/get-safe-error-message.util';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import constate from 'constate';

function useGetOperationsForAttachLogic() {
  const { watch } = useFormContext();

  const date = watch('date') as Date;

  const month = date.getMonth() as unknown as Month;
  const year = date.getFullYear();

  const query = useQuery({
    queryKey: ['budget-plan', createBudgetPlanIdUrl({ month, year })],
    queryFn: () => budgetPlanService.getItem({ month, year }),
  });

  return useMemo(
    () => ({
      state: getPromiseState(query.status),
      errorMessage: getSafeErrorMessage(query.error),
      operations: {
        regular: query.data?.plannedRegularEntries ?? [],
        month: query.data?.otherEntries ?? [],
      },
    }),
    [query.data?.otherEntries, query.data?.plannedRegularEntries, query.error, query.status],
  );
}

export const [GetOperationsForAttachProvider, useGetOperationsForAttach] = constate(useGetOperationsForAttachLogic);
