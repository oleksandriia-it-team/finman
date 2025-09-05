type LazyMapper<T> = (item: T) => { label: string; value: string };

export interface UseLazyLoadModel<L, F, C> {
  type: L,
  filter: Partial<F>,

  mapItem: LazyMapper<C>;

  getTotalCount: (type: L, filter: Partial<F>) => Promise<number>;

  getItems(type: L, from: number, to: number, filter: Partial<F>): Promise<C[]>;

  step: number;
}