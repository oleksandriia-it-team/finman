'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

export function useAnalyticsQuery<TData, TFilter, TMapped>(
  key: string,
  filter: TFilter,
  queryFn: (filter: TFilter) => Promise<TData>,
  mapper: (data: TData) => TMapped,
  fallback: TMapped,
): TMapped {
  const query = useQuery({
    queryKey: [key, JSON.stringify(filter)],
    queryFn: () => queryFn(filter),
  });

  return useMemo(() => (query.data !== undefined ? mapper(query.data) : fallback), [query.data]);
}
