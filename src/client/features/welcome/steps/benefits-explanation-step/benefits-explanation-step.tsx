'use client';

import { TransactionsData } from './transaction-data.constant';
import { TransactionCard } from '@frontend/entities/operations/transaction-card/transaction-card';
import { type TypeEntry } from '@common/enums/entry.enum';

export default function BenefitsExplanationStep() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col md:flex-row items-center p-4 gap-4">
        <div className="w-full mb-4 md:w-1/2 md:mb-0 md:flex-none">
          <b className="mb-4 text-4xl">Чому це зручно?</b>
          <p className="text-muted-foreground text-xl">
            Ми розуміємо, як важко зводити кінці з кінцями. Балансувати між навчанням, роботою та відпочинком стає
            простіше, коли всі твої гроші підраховані автоматично.
          </p>
        </div>

        <div className="w-full">
          <div className="p-4 bg-card rounded-2xl shadow-sm border border-muted">
            <div className="flex justify-between items-center mb-4">
              <b className="text-muted-foreground">Сьогодні</b>
              <span className="inline-block px-4 py-2 text-xs font-bold bg-destructive text-destructive-foreground rounded-full text-center whitespace-nowrap align-baseline">
                - 724 ₴
              </span>
            </div>

            {TransactionsData.map((tx) => (
              <TransactionCard
                key={tx.id}
                name={tx.icon}
                title={tx.title}
                description={tx.description}
                check={tx.check}
                type={tx.type as TypeEntry.Income | TypeEntry.Expense}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
