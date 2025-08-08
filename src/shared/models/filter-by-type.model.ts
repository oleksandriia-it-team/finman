export type FilterByType<R extends Record<string, unknown>, T> = {
  [K in keyof R as R[K] extends T ? K : never]: R[K];
};
