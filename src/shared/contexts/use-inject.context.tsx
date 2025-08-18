'use client';

import { GetProvideValueByToken, InjectProvider } from '../models/inject-provider.model';
import { Context, createContext, useContext, useMemo } from 'react';
import { isEmpty } from '../utils/is-empty.util';
import { ProvideDependenciesModel } from '../models/provide-dependencies.model';
import { ChildrenComponentProps } from '../models/component-with-chilren.model';

const InjectContext: Context<InjectProvider[]> = createContext<InjectProvider[]>([]);

/**
 * Dependency injection provider component, similar to Angular's DI system.
 *
 * Merges the given `providers` with any existing providers from the parent `InjectContext`,
 * and supplies the combined list to its children via React context.
 *
 * Useful for creating nested scopes with their own dependencies while retaining access
 * to upstream providers.
 *
 * @component
 * @param {ProvideDependenciesModel} props.providers - An array of dependency providers to add to the current context.
 * @param {React.ReactNode} props.children - Child components that will have access to the merged providers via `InjectContext`.
 *
 * @example <caption>Basic usage</caption>
 * ```tsx
 * <ProvideDependencies providers={[UserService]}>
 *   <MyComponent />
 * </ProvideDependencies>
 * ```
 *
 * @example <caption>Nested usage (extending context)</caption>
 * ```tsx
 * <ProvideDependencies providers={[GlobalService]}>
 *   <ProvideDependencies providers={[FeatureService]}>
 *     <FeatureComponent />
 *   </ProvideDependencies>
 * </ProvideDependencies>
 *
 * // FeatureComponent will receive both GlobalService and FeatureService
 * ```
 */
export default function ProvideDependencies({
  providers,
  children
}: ProvideDependenciesModel & ChildrenComponentProps) {
  const prevProviders = useContext(InjectContext);

  const allProviders = useMemo(() => [ ...providers, ...prevProviders ], [ providers, prevProviders ]);

  return (
    <InjectContext.Provider value={ allProviders }>
      { children }
    </InjectContext.Provider>
  );

}

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

  if (providers.length === 0) {
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