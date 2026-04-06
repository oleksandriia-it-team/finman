import { myMocks } from '@frontend/features/regular-incomes-expenses/test-data';
import { IncomeExpenseCard } from '@frontend/entities/budget-plan/income-expense-card/income-expense-card';

export default function RegularIncomesExpensesPage() {
  return (
    <div className="w-full flex flex-col pb-22 ">
      <p className="text-xl p-4">
        <b>Регулярні доходи та витрати</b>
      </p>
      <div className="flex flex-col items-center justify-center w-full flex-wrap ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 ">
          {myMocks.map((item, index) => (
            <IncomeExpenseCard
              key={index}
              type={item.type}
              title={item.title}
              subtitle={item.subtitle}
              amount={item.amount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
