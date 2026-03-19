export type DeepPartial<T> = T extends (infer U)[]
  ? _DeepPartialArray<U>
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T | undefined;

type _DeepPartialArray<T> = T[] | undefined;
