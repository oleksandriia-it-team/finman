import { type UseMutationOptions } from '@tanstack/react-query';

export interface AppMutationOptions<TData, TError, TVariables, TContext> extends UseMutationOptions<
  TData,
  TError,
  TVariables,
  TContext
> {
  successMessage?: string;
}
