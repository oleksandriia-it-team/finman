import type { ReactNode } from 'react';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export interface FormScreenHandlerProps<T, ID = number> extends PageProps<never> {
  loading?: ReactNode;
  error?: (error: ApiResultOperationError) => ReactNode;
  notItemFound?: ReactNode;
  getItemFn: (id: ID) => Promise<T | undefined | null>;
  render: (item: T) => ReactNode;
  queryKey: string;
  parseParam?: (raw: string) => { success: true; data: ID } | { success: false };
}
