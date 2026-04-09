import { myMocks } from '@frontend/features/regular-incomes-expenses/test-data';
import { IncomeExpenseCard } from '@frontend/entities/budget-plan/income-expense-card/income-expense-card';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';

// Todo: remove the component. It's an example how to use usePaginationResource and FinPagination
export default function RegularIncomesExpensesPageCopy() {
  const pageSize = 3;

  const { options, state, errorMessage, ...paginationRestProps } = usePaginationResource({
    pageSize,
    queryKey: ['test regular expenses and incomes'],
    getOptionsFn: (page, pageSize) => {
      const start = (page - 1) * pageSize,
        end = start + pageSize;
      return Promise.resolve(myMocks.slice(start, end));
    },
    getTotalCountFn: () => Promise.resolve(myMocks.length),
  });

  return (
    <div className="w-full flex flex-col pb-22 ">
      <p className="text-xl p-4">
        <b>Регулярні доходи та витрати</b>
      </p>
      <div className="flex flex-col items-center justify-center w-full flex-wrap ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 ">
          {state === PromiseState.Loading && 'Завантаження'}
          {state === PromiseState.Error && (errorMessage || 'Помилка завантаження')}

          {options.map((item, index) => (
            <IncomeExpenseCard
              key={index}
              type={item.type}
              title={item.title}
              subtitle={item.subtitle ?? ''}
              amount={item.amount}
            />
          ))}

          <FinPagination
            {...paginationRestProps}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
}
