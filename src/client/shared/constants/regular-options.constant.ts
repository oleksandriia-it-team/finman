'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { RegularPaymentFrequency } from '@common/enums/regular-freequency.enum';

const FrequencyKeys: Record<RegularPaymentFrequency, string> = {
  [RegularPaymentFrequency.Daily]: 'daily',
  [RegularPaymentFrequency.Weekly]: 'weekly',
  [RegularPaymentFrequency.Monthly]: 'monthly',
  [RegularPaymentFrequency.Yearly]: 'yearly',
};

export function useFrequencyOptions() {
  const t = useTranslations('regular.frequency');
  return useMemo(
    () =>
      (Object.entries(FrequencyKeys) as [RegularPaymentFrequency, string][]).map(([value, key]) => ({
        label: t(key),
        value,
      })),
    [t],
  );
}

export const DayOfMonthOptions = Array.from({ length: 31 }, (_, i) => ({
  label: String(i + 1),
  value: i + 1,
}));
