'use client';

import { IncomeExpenseCard } from '@frontend/entities/operations/income-expense-card/income-expense-card';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useRouter } from 'next/navigation';
import { FinListScreenHandler } from '@frontend/components/screen-handlers/fin-list-screen-handler';
import { useCombineStates } from '@frontend/shared/hooks/combine-states/combine-states.hook';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { getErrorMessage } from '@common/utils/get-error-message.util';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { cn } from '@frontend/shared/utils/cn.util';

export default function RegularIncomesExpensesScreen() {
  const pageSize = 5;
  const { getPayments, getTotalCount, handleDelete } = useRegularTransactions();

  const onDelete = useSendDataFetch((id: number) => handleDelete(id), {
    onSuccess: () => {
      reload();
    },
  });

  const router = useRouter();

  const { options, state, errorMessage, reload, ...paginationRestProps } = usePaginationResource({
    pageSize,
    queryKey: ['regular-transactions'],
    getOptionsFn: async (page, pageSize) => {
      const start = (page - 1) * pageSize + 1;
      const end = start + pageSize;

      const result = await getPayments(start, end);
      return result ?? [];
    },
    getTotalCountFn: async () => {
      const count = await getTotalCount();
      return count ?? 0;
    },
    clearCacheOnDestroy: true,
  });

  return (
    <div className="size-full overflow-hidden flex flex-col pb-8 relative">
      <p className="flex-none text-xl p-4">
        <b>Регулярні доходи та витрати</b>
      </p>

      <div className="flex-1 overflow-y-auto min-h-0 p-4">
        <div className={cn(state !== PromiseState.Error && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4')}>
          <FinListScreenHandler
            state={useCombineStates(onDelete.state, state)}
            errorMessage={errorMessage ?? getErrorMessage(onDelete.error)}
            hasData={!!options.length}
            skeletonItems={pageSize}
            skeletonClassName="h-72"
          >
            {options.map((item, index) => (
              <IncomeExpenseCard
                key={item.id ?? index}
                handleDelete={async (id) => {
                  onDelete.mutate(id);
                }}
                {...item}
              />
            ))}
          </FinListScreenHandler>
        </div>
      </div>

      <FinPagination
        className="pt-3"
        {...paginationRestProps}
        pageSize={pageSize}
      />

      <div className="fixed bottom-6 right-6">
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
      </div>
    </div>
  );
}
