import { type PromiseState } from '../../../enums/promise-state.enum';
import { type Dispatch } from 'react';

export interface PaginationResourceConfig<T, F extends object> {
  getTotalCountFn: (filters?: F | undefined) => Promise<number>;
  getOptionsFn: (page: number, pageSize: number, filters?: F | undefined) => Promise<T[]>;
  queryKey: string[];
  filters?: F;
  pageSize: number;
}

export interface PaginationResource<T> {
  state: PromiseState;
  errorMessage: string | undefined | null;
  totalCount: number;
  options: T[];
  selectedPage: number;
  setPage: Dispatch<number>;
}
