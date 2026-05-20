'use client';

import type { FormScreenHandlerProps } from './props/form-screen-handler.props';
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { checkIsAppErrorObj } from '@common/utils/check-is-api-error.util';

const intSchema = z.coerce.number().int();

export function FinFormScreenHandler<T>({
  getItemFn,
  notItemFound,
  render,
  params,
  loading,
  error,
  queryKey,
}: FormScreenHandlerProps<T>) {
  const usedParams = use(params) as object;

  const { data: id, success } = intSchema.safeParse('id' in usedParams ? usedParams.id : null);

  if (!success) {
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const item = useQuery({
    queryKey: [queryKey, String(id)],
    queryFn: () => {
      return getItemFn(id);
    },
    staleTime: 0,
  });

  if (item.status === 'pending') {
    return loading ?? <FinLoader />;
  }

  if (item.status === 'error') {
    if (!error) {
      return (
        <FinErrorWidget
          status={400}
          message="ID є некоректним"
        />
      );
    }

    const Error = error(
      checkIsAppErrorObj(item.error) ? item.error : { status: 500, message: 'Невідома помилка. Спробуйте пізніше' },
    );

    return Error;
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
