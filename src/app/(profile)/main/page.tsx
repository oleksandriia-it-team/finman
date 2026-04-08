'use client';

import { useAuthorizedUser } from '@frontend/shared/services/user-information/authorized-user.hook';
import { IncomeExpenseCard } from '@frontend/entities/budget-plan/income-expense-card/income-expense-card';

export default function UserMainPage() {
  const user = useAuthorizedUser();

  return (
    <div className="size-full flex flex-col items-center p-5">
      <IncomeExpenseCard
        subtitle="Budget plan"
        title="Expense"
        type="expense"
        amount="1000"
        date={new Date()}
      />
    </div>
  );
}
