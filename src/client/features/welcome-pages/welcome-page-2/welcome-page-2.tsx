'use client';

import TransactionCard from '../../../shared/сomponents/transaction-card/transaction-card';

const transactionsData = [
  { id: 1, icon: '💶', title: 'Переказ коштів', subtitle: 'Надходження', amount: '+ 250 ₴', type: 'income' },
  { id: 2, icon: '🚍', title: 'Автобус', subtitle: 'Особисті витрати', amount: '- 15 ₴', type: 'expense' },
  { id: 3, icon: '🎶', title: 'Концерт', subtitle: 'Особисті витрати', amount: '- 100 ₴', type: 'expense' },
  { id: 4, icon: '☕', title: "Кав'ярня", subtitle: 'Особисті витрати', amount: '- 81 ₴', type: 'expense' },
  { id: 5, icon: '📌', title: 'Канцелярія', subtitle: 'Особисті витрати', amount: '- 78 ₴', type: 'expense' },
  { id: 6, icon: '🍱', title: 'Ресторан', subtitle: 'Особисті витрати', amount: '- 700 ₴', type: 'expense' },
] as const;

export default function SecondPage() {
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

            {transactionsData.map((tx) => (
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
