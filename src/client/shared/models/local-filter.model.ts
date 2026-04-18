export type FilterPredicate<T> = (item: T) => boolean;

export interface LocalFilter {
  softDeleted?: 0 | 1;
}
