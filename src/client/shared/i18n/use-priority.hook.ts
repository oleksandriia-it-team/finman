'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { TransactionPriority, TransactionPriorityLabelKeys } from '@common/enums/priority.enum';
import type { UiStatusBadgeVariant } from '@frontend/ui/ui-status-badge/props/ui-status-badge.props';

export type PriorityBadge = { label: string; variant: UiStatusBadgeVariant };

const priorityValueToKey = Object.fromEntries(
  Object.entries(TransactionPriority).map(([key, value]) => [value, key]),
) as Record<number, keyof typeof TransactionPriorityLabelKeys>;

function getPriorityVariant(priority: number): UiStatusBadgeVariant {
  if (priority <= 2) return 'success';
  if (priority <= 4) return 'teal';
  if (priority <= 6) return 'warning';
  if (priority <= 8) return 'orange';
  return 'destructive';
}

/** Returns a function that maps a priority value to a localized badge { label, variant }. */
export function useGetPriorityBadge() {
  const t = useTranslations('priority');
  return useMemo(
    () =>
      (priority: number): PriorityBadge => {
        const key = priorityValueToKey[priority];
        const label = key ? t(TransactionPriorityLabelKeys[key]) : String(priority);
        return { label, variant: getPriorityVariant(priority) };
      },
    [t],
  );
}

/** Returns dropdown options for priority with localized labels. */
export function usePriorityOptions() {
  const t = useTranslations('priority');
  return useMemo(
    () =>
      Object.entries(TransactionPriority).map(([key, value]) => ({
        label: t(TransactionPriorityLabelKeys[key as keyof typeof TransactionPriorityLabelKeys]),
        value,
      })),
    [t],
  );
}
