export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartialArray<U>
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T | undefined;

type DeepPartialArray<T> = T[] | undefined;
