'use client';

import { GetProvideValueByToken, InjectProvider } from '../models/inject-provider.model';
import { Context, createContext, useContext } from 'react';
import { isEmpty } from '../utils/is-empty.util';

export const InjectContext: Context<InjectProvider[]> = createContext([]);

export function useInject<T>(token: T, required: false): GetProvideValueByToken<T> | null;
export function useInject<T>(token: T, required: true): GetProvideValueByToken<T>;
export function useInject<T>(token: T, required: boolean): GetProvideValueByToken<T> | null {
  const providers = useContext(InjectContext);

  if (isEmpty(providers)) {
    if (required) {
      throw new Error('You must provide something to use InjectProvider');
    }
    return null;
  }

  const matched = providers.find((provider) => provider.token === token);
  const provider = matched?.value ?? null;

  if (required && isEmpty(matched)) {
    throw new Error(`Provider with token ${ JSON.stringify(token) } is not found`);
  }

  return provider as GetProvideValueByToken<T> | null;
}