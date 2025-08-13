import { RecordModel } from './record.model';

export type FilterByType<R extends RecordModel, T> = {
  [K in keyof R as R[K] extends T ? K : never]: R[K];
};
