import { type PromiseState } from '../../../enums/promise-state.enum';
import { type Dispatch } from 'react';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export interface PaginationResourceConfig<T, F extends object> {
  getTotalCountFn: (filters?: F | undefined) => Promise<number>;
  getOptionsFn: (page: number, pageSize: number, filters?: F | undefined) => Promise<T[]>;
  queryKey: string[];
  filters?: F;
  pageSize: number;
  clearCacheOnDestroy?: boolean;
  filtersJSON?: string;
}

export interface PaginationResource<T> {
  state: PromiseState;
  errorMessage: string | undefined | null;
  appError: ApiResultOperationError | null;
  totalCount: number;
  options: T[];
  selectedPage: number;
  setPage: Dispatch<number>;
  reload: () => void;
}
