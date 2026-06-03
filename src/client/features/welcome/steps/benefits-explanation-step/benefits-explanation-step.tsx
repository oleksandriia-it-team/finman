'use client';

import { TransactionsData } from './transaction-data.constant';
import { TransactionCard } from '@frontend/entities/operations/transaction-card/transaction-card';
import { type TypeEntry } from '@common/enums/entry.enum';
import { UiCard } from '@frontend/ui/ui-card/ui-card';
import { useTranslations } from 'next-intl';

export default function BenefitsExplanationStep() {
  const t = useTranslations('welcome.benefits');

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col md:flex-row items-center p-4 gap-4">
        <div className="w-full mb-4 md:w-1/2 md:mb-0 md:flex-none">
          <b className="mb-4 text-4xl">{t('title')}</b>
          <p className="text-muted-foreground text-xl">{t('description')}</p>
        </div>

        <UiCard
          position="col"
          className="w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <b className="text-muted-foreground">{t('today')}</b>
            <span className="inline-block px-4 py-2 text-xs font-bold bg-destructive text-destructive-foreground rounded-full text-center whitespace-nowrap align-baseline">
              - 724 ₴
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {TransactionsData.map((tx) => (
              <TransactionCard
                key={tx.id}
                icon={tx.icon}
                title={t(tx.titleKey)}
                description={t(tx.descriptionKey)}
                showActions={false}
                check={tx.check}
                type={tx.type as TypeEntry.Income | TypeEntry.Expense}
              />
            ))}
          </div>
        </UiCard>
      </div>
    </div>
  );
}
