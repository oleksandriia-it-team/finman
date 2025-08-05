import { InjectToken } from '../classes/inject-token.class';

export interface NonObjectProvider {
  token: unknown;
  value: unknown;
}

export type InjectProvider = NonObjectProvider;

export type GetProvideValueByToken<T> = T extends InjectToken<infer V>
  ? V
  : unknown