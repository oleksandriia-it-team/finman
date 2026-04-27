import type { ReactNode } from 'react';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';
import type { AppRoutes } from '.next/types/routes';

export interface FormScreenHandlerProps<T> extends Omit<PageProps<AppRoutes>, 'searchParams'> {
  loading?: ReactNode;
  error?: (error: ApiResultOperationError) => ReactNode;
  notItemFound?: ReactNode;
  getItemFn: (id: number) => Promise<T | undefined | null>;
  render: (item: T) => ReactNode;
  queryKey: string;
}
