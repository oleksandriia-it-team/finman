'use client';

import { UsefulTipsBlock } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/useful-tips-block/useful-tips-block';
import {
  ImageBlock,
  ImageBlockForeground,
} from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/image-block';
import { ShortStatisticBlock } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/short-statistic-block';
import type { UsefulTipsBlockItem } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/useful-tips-block/useful-tips-block-item';
import { useShortStatistic } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/short-statistic.hook';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

const imageBlockSrc = '/pictures/card-form-image.jpg';

const EMPTY_SHORT_STATISTIC = {
  factAverageExpenses: 0,
  factAverageIncomes: 0,
  increaseFactExpensesLastMonth: 0,
  increaseFactIncomesLastMonth: 0,
};

export function CardCreationFormSideBlock() {
  const { data } = useShortStatistic();
  const statistic = data ?? EMPTY_SHORT_STATISTIC;
  const t = useTranslations('regular.sideBlock');

  const tips: UsefulTipsBlockItem[] = useMemo(
    () => [
      { icon: 'lightbulb', title: t('tipsTitle') },
      {
        icon: 'calendar-check',
        title: t('tipAutomateTitle'),
        description: t('tipAutomateDescription'),
      },
      {
        icon: 'piggy-bank',
        title: t('tipControlTitle'),
        description: t('tipControlDescription'),
      },
      {
        icon: 'bar-chart-line',
        title: t('tipTrendsTitle'),
        description: t('tipTrendsDescription'),
      },
    ],
    [t],
  );

  return (
    <div className="bg-primary size-full flex flex-col items-center justify-center">
      <ImageBlock image={imageBlockSrc}>
        <ImageBlockForeground
          title={t('imageTitle')}
          subtitle={t('imageSubtitle')}
          blurred
        />
      </ImageBlock>
      <UsefulTipsBlock items={tips} />
      <ShortStatisticBlock
        factAverageExpenses={statistic.factAverageExpenses}
        factAverageIncomes={statistic.factAverageIncomes}
        increaseFactExpensesLastMonth={statistic.increaseFactExpensesLastMonth}
        increaseFactIncomesLastMonth={statistic.increaseFactIncomesLastMonth}
      />
    </div>
  );
}
