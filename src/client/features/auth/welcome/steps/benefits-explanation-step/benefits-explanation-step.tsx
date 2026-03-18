'use client';

import { TransactionsData } from './transaction-data.constant';

import TransactionCard from '../../../../../shared/сomponents/transaction-card/transaction-card';

export default function BenefitsExplanationStep() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="row align-items-center p-4">
        <div className="col-md-6 mb-4 mb-md-0">
          <h3 className="fw-bold mb-3">Чому це зручно?</h3>
          <p className="text-body-secondary">
            Ми розуміємо, як важко зводити кінці з кінцями. Балансувати між навчанням, роботою та відпочинком стає
            простіше, коли всі твої гроші підраховані автоматично.
          </p>
        </div>

        <div className="col-md-6">
          <div className="p-4 bg-body-tertiary rounded-4 shadow-sm border border-subtle">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold text-body-secondary">Сьогодні</span>
              <span className="badge bg-danger bg-opacity-25 text-danger rounded-pill px-3 py-2">- 724 ₴</span>
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
