'use client';

import { TransactionsData } from './transaction-data.constant';
import './benefits-explanation-step.scss';
import TransactionCard from '../../../../../shared/сomponents/transaction-card/transaction-card';

export default function BenefitsExplanationStep() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col md:flex-row items-center p-4 gap-4">
        <div className="my-column">
          <b className="mb-4 text-3xl">Чому це зручно?</b>
          <p className="text-body-secondary text-xl">
            Ми розуміємо, як важко зводити кінці з кінцями. Балансувати між навчанням, роботою та відпочинком стає
            простіше, коли всі твої гроші підраховані автоматично.
          </p>
        </div>

        <div className="w-full">
          <div className="p-4 bg-body-tertiary rounded-2xl shadow-sm border border-subtle">
            <div className="flex justify-between items-center mb-4">
              <b className="text-body-secondary">Сьогодні</b>
              <span className="my-badge text-danger ">- 724 ₴</span>
            </div>

            {TransactionsData.map((tx) => (
              <TransactionCard
                key={tx.id}
                icon={tx.icon}
                title={tx.title}
                subtitle={tx.subtitle}
                amount={tx.amount}
                type={tx.type}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
