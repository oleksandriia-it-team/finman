import { IncomeExpenseCard } from '@frontend/entities/budget-plan/income-expense-card/income-expense-card';
import { MOCK_ALL_CATEGORIES } from './mock-card-data';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';

export default function RegularIncomesExpensesPage() {
  const pageSize = 5;
  const { options, state, errorMessage, ...paginationRestProps } = usePaginationResource({
    pageSize,
    queryKey: ['test regular expenses and incomes'],
    getOptionsFn: (page, pageSize) => {
      const start = (page - 1) * pageSize,
        end = start + pageSize;
      return Promise.resolve(MOCK_ALL_CATEGORIES.slice(start, end));
    },
    getTotalCountFn: () => Promise.resolve(MOCK_ALL_CATEGORIES.length),
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

          {options.map((item) => {
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
        {...paginationRestProps}
        pageSize={pageSize}
      />
    </div>
  );
}
