'use client';

import { TypeEntryFilter } from '@common/enums/entry.enum';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export function useTypeEntryLabels(): Record<TypeEntryFilter, string> {
  const t = useTranslations('operations.typeFilter');
  return useMemo(
    () => ({
      [TypeEntryFilter.All]: t('all'),
      [TypeEntryFilter.Expense]: t('expense'),
      [TypeEntryFilter.Income]: t('income'),
    }),
    [t],
  );
}
