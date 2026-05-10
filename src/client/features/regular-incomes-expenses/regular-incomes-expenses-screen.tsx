'use client';

import { IncomeExpenseCard } from '@frontend/entities/operations/income-expense-card/income-expense-card';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useRouter } from 'next/navigation';
import { FinListScreenHandler } from '@frontend/components/screen-handlers/fin-list-screen-handler';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { calculateFromAndTo } from '@common/utils/calculate-from-and-to.util';
import { getFirstErrorMessage } from '@frontend/shared/utils/get-first-error-message.util';
import { FinListPageWrapper } from '@frontend/components/wrappers/fin-list-page-wrapper';
import { FinListOutsideWrapper } from '@frontend/components/wrappers/fin-list-outside-wrapper';
import { FinListInsideWrapper } from '@frontend/components/wrappers/fin-list-inside-wrapper';
import { FinButtonListAction } from '@frontend/components/wrappers/fin-button-list-action';
import { useCombineStates } from '@frontend/shared/hooks/combine-states/combine-states.hook';

export default function RegularIncomesExpensesScreen() {
  const pageSize = 5;
  const { getPayments, getTotalCount, handleDelete } = useRegularTransactions();

  const onDelete = useSendDataFetch((id: number) => handleDelete(id), {
    onSuccess: () => {
      reload();
    },
  });

  const router = useRouter();

  const {
    options,
    state: listState,
    errorMessage,
    reload,
    ...paginationRestProps
  } = usePaginationResource({
    pageSize,
    queryKey: ['regular-transactions'],
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

  const state = useCombineStates(onDelete.state, listState);

  return (
    <FinListPageWrapper>
      <p className="flex-none text-xl p-4">
        <b>Регулярні доходи та витрати</b>
      </p>

      <FinListOutsideWrapper>
        <FinListScreenHandler
          state={state}
          errorMessage={getFirstErrorMessage(errorMessage, onDelete.error)}
          hasData={!!options.length}
          skeletonItems={pageSize}
          skeletonClassName="min-h-72"
        >
          <FinListInsideWrapper state={state}>
            {options.map((item, index) => (
              <IncomeExpenseCard
                key={item.id ?? index}
                handleDelete={async (id) => {
                  onDelete.mutate(id);
                }}
                {...item}
              />
            ))}
          </FinListInsideWrapper>
        </FinListScreenHandler>
      </FinListOutsideWrapper>

      <FinPagination
        className="pt-3"
        {...paginationRestProps}
        pageSize={pageSize}
      />

      <FinButtonListAction>
        <UiButton
          variant="primary"
          size="lg"
          className="rounded-full gap-2 shadow-xl"
          onClick={() => router.push('./regular-operations/add')}
        >
          <UiSvgIcon
            name="plus"
            size="sm"
          />
          Додати платіж
        </UiButton>
      </FinButtonListAction>
    </FinListPageWrapper>
  );
}
