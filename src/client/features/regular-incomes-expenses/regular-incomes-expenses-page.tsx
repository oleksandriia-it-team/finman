import { IncomeExpenseCard } from '@frontend/entities/budget-plan/income-expense-card/income-expense-card';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import type { RegularTransactionRecord } from '@common/records/regular-transaction.record';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';

export default function RegularIncomesExpensesPage() {
  const pageSize = 5;
  const { payments } = useRegularTransactions();

  const { options, state, errorMessage, ...paginationRestProps } = usePaginationResource({
    pageSize,
    queryKey: ['regular-transactions', payments],
    getOptionsFn: (page, pageSize) => {
      const start = (page - 1) * pageSize,
        end = start + pageSize;
      return Promise.resolve(payments.slice(start, end));
    },
    getTotalCountFn: () => Promise.resolve(payments.length),
  });

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col pb-8 ">
      <p className="flex-none text-xl p-4">
        <b>Регулярні доходи та витрати</b>
      </p>
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
          {state === PromiseState.Loading && 'Завантаження'}
          {state === PromiseState.Error && (errorMessage || 'Помилка завантаження')}

          {options.map((item: RegularTransactionRecord) => {
            return (
              <IncomeExpenseCard
                key={item.id}
                category={item.category}
                subtitle={item.subtitle}
                type={item.type}
                amount={item.amount}
                date={item.date}
              />
            );
          })}
        </div>
      </div>
      <FinPagination
        className="pt-3"
        {...paginationRestProps}
        pageSize={pageSize}
      />
    </div>
  );
}
