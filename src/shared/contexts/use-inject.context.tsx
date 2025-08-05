'use client';

import { GetProvideValueByToken, InjectProvider } from '../models/inject-provider.model';
import { Context, createContext, useContext } from 'react';
import { isEmpty } from '../utils/is-empty.util';

export const InjectContext: Context<InjectProvider[]> = createContext([]);

/**
 * Retrieves a dependency from the InjectContext based on the given token.
 *
 * This hook is similar to Angular's `inject()` and provides a way to access shared
 * services or values that were registered via the InjectProvider.
 *
 * You can mark the dependency as required or optional.
 *
 * @template T The type of the token used to identify the provider.
 *
 * @param token - A unique token used to identify the dependency. It can be a class, symbol, string, etc.
 * @param required - If `true`, throws an error when the provider is not found. If `false`, returns `null`.
 *
 * @returns The provided value corresponding to the given token, or `null` if not found and `required` is false.
 *
 * @exceptions Will throw an error if `required` is `true` and the provider is not found.
 *
 * @example
 * const logger = useInject(LoggerService, true); // required
 *
 * const optionalService = useInject(OptionalService, false);
 * if (optionalService) {
 *   optionalService.doSomething();
 * }
 */
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