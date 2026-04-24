import { type ComponentProps, type Dispatch } from 'react';

export interface PaginationProps extends ComponentProps<'nav'> {
  setPage: Dispatch<number>;
  selectedPage: number;
  pageSize: number;
  totalCount: number;
}
