type LazyMapper<T> = (item: T) => { label: string; value: string };

export interface UseLazyLoadModel<F, C> {
  filter: Partial<F>,

  mapItem: LazyMapper<C>;

  getTotalCount: (filter: Partial<F>) => Promise<number>;

  getItems(from: number, to: number, filter: Partial<F>): Promise<C[]>;

  step: number;
}