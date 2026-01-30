export interface LazyEventProps {
  total: number;
  pageSize: number;
  page: number;
  setPage: (page: number) => void;
  isLoading: boolean;
  itemHeight: number;
}
