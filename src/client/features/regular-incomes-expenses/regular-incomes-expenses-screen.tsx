'use client';

import { IncomeExpenseCard } from '@frontend/entities/operations/income-expense-card/income-expense-card';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useRouter } from 'next/navigation';
import { FinListScreenHandler } from '@frontend/components/list-screen-handler/fin-list-screen-handler';

export default function RegularIncomesExpensesScreen() {
  const pageSize = 5;
  const { getPayments, getTotalCount, handleDelete } = useRegularTransactions();

  const router = useRouter();

  const { options, state, errorMessage, reload, ...paginationRestProps } = usePaginationResource({
    pageSize,
    queryKey: ['regular-transactions'],
    getOptionsFn: async (page, pageSize) => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize - 1;
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
        <FinListScreenHandler
          state={state}
          errorMessage={errorMessage}
          hasData={!!options.length}
          skeletonItems={pageSize}
          skeletonClassName="h-72"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {options.map((item, index) => (
              <IncomeExpenseCard
                key={item.id ?? index}
                handleDelete={async (id) => {
                  await handleDelete(id);
                  reload();
                }}
                {...item}
              />
            ))}
          </div>
        </FinListScreenHandler>
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
