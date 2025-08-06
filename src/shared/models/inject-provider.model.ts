import { InjectToken } from '../classes/inject-token.class';

export type InjectProvider = {
  token: unknown;
  value: unknown;
};

export type GetProvideValueByToken<T> = T extends InjectToken<infer V>
  ? V
  : unknown