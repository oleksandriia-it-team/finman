'use client';

import { useQuery } from '@tanstack/react-query';
import { getShortStatistic } from './short-statistic.service';
import { getPromiseState } from '@frontend/shared/utils/get-promise-state.util';

export function useShortStatistic() {
  const query = useQuery({
    queryKey: ['regular-incomes-expenses', 'short-statistic'],
    queryFn: getShortStatistic,
  });

  return {
    ...query,
    state: getPromiseState(query.status),
  };
}
