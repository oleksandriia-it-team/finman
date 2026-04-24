type QueryParams = Record<string, string | number | boolean>;

export interface RequestOptions<D = unknown, T = unknown>
  extends Omit<RequestInit, 'body' | 'method' | 'signal'>, Pick<RequestInit, 'signal'> {
  params?: QueryParams | undefined;
  body?: D | undefined;
  defaultValue?: T | undefined;
  skipAuth?: boolean;
}
