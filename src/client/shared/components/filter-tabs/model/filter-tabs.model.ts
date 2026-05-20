import type { ReactNode } from 'react';

export interface FilterTabConfig<TValue = unknown> {
  value: TValue;
  label: string;
  dotColor?: string;
  icon?: ReactNode;
  count?: number;
}
