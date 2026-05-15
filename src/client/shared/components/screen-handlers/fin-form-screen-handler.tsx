'use client';

import type { FormScreenHandlerProps } from './props/form-screen-handler.props';
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';
import { z } from 'zod';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { FinLoader } from '@frontend/components/loader/fin-loader';

const intSchema = z.coerce.number().int();

export function FinFormScreenHandler<T, ID = number>({
  getItemFn,
  notItemFound,
  render,
  params,
  loading,
  error,
  queryKey,
  parseParam,
}: FormScreenHandlerProps<T, ID>) {
  const usedParams = use(params) as object;
  const rawId = 'id' in usedParams ? String(usedParams.id) : null;

  const parsed = parseParam
    ? rawId !== null
      ? parseParam(rawId)
      : { success: false as const }
    : (() => {
        const result = intSchema.safeParse(rawId);
        return result.success ? { success: true as const, data: result.data as ID } : { success: false as const };
      })();

  if (!parsed.success) {
    if (!error) {
      return (
        <FinErrorWidget
          status={400}
          message="ID є некоректним"
        />
      );
    }
    return error({ status: 400, message: 'ID є некоректним' });
  }

  const id = parsed.data;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const item = useQuery({
    queryKey: [queryKey, String(id)],
    queryFn: () => getItemFn(id),
    staleTime: 0,
  });

  if (item.status === 'pending') {
    return loading ?? <FinLoader />;
  }

  if (item.status === 'error') {
    if (!error) {
      return (
        <FinErrorWidget
          status={500}
          message="Помилка завантаження"
        />
      );
    }
    return error(item.error as unknown as ApiResultOperationError);
  }

  if (!item.data) {
    return (
      notItemFound ?? (
        <FinErrorWidget
          status={404}
          message="Елемент не знайдено"
        />
      )
    );
  }

  return render(item.data);
}
