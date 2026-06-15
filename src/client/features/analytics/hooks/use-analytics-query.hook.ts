'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

interface AnalyticsQueryResult<TMapped> {
  data: TMapped;
  isLoading: boolean;
}

export function useAnalyticsQuery<TData, TFilter, TMapped>(
  key: string,
  filter: TFilter,
  queryFn: (filter: TFilter) => Promise<TData>,
  mapper: (data: TData) => TMapped,
  fallback: TMapped,
): AnalyticsQueryResult<TMapped> {
  const query = useQuery({
    queryKey: [key, JSON.stringify(filter)],
    queryFn: () => queryFn(filter),
    staleTime: 0,
  });

  // Recompute only when fetched data changes — mapper/fallback are inline at call-site,
  // including them would invalidate the memo on every parent render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = useMemo(() => (query.data !== undefined ? mapper(query.data) : fallback), [query.data]);

  return { data, isLoading: query.isFetching };
}
