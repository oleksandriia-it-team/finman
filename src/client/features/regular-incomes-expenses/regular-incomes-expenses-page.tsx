'use client';

import { IncomeExpenseCard } from '@frontend/entities/budget-plan/income-expense-card/income-expense-card';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import type { TransactionCardProps } from '@frontend/entities/budget-plan/transaction-card/props/transaction-card-props';
import { useRouter } from 'next/navigation';

export default function RegularIncomesExpensesScreen() {
  const pageSize = 5;
  const { getPayments, getTotalCount } = useRegularTransactions();

  const router = useRouter();

  const { options, state, errorMessage, ...paginationRestProps } = usePaginationResource({
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
  });

  return (
    <div className="size-full overflow-hidden flex flex-col pb-8 relative">
      <p className="flex-none text-xl p-4">
        <b>Регулярні доходи та витрати</b>
      </p>

      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {state === PromiseState.Loading && <p className="text-muted-foreground col-span-full">Завантаження...</p>}
          {state === PromiseState.Error && (
            <p className="text-destructive-foreground col-span-full">{errorMessage || 'Помилка завантаження'}</p>
          )}
          {state === PromiseState.Success && options.length === 0 && (
            <p className="text-muted-foreground italic col-span-full">Немає регулярних платежів</p>
          )}
          {state === PromiseState.Success &&
            (options as TransactionCardProps[]).map((item: TransactionCardProps, index) => (
              <IncomeExpenseCard
                key={item.id ?? index}
                {...item}
              />
            ))}
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
          onClick={() => router.push('./add')}
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
