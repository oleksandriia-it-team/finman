import type { FormScreenHandlerProps } from '@frontend/components/form-screen-handler/props/form-screen-handler.props';
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';
import { z } from 'zod';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';

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
  const { id: stringId } = use(params);

  const { data: id, success } = intSchema.safeParse(stringId);

  if (!success) {
    if (!error) {
      return (
        <FinErrorWidget
          status={400}
          message="ID є некоректним"
        />
      );
    }

    const Error = error({ status: 400, message: 'ID є некоректним' });

    return Error;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const item = useQuery({
    queryKey: [queryKey, stringId],
    queryFn: () => {
      return getItemFn(id);
    },
  });

  if (item.status === 'pending') {
    return loading ?? <span>Завантаження...</span>;
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

    const Error = error(item.error as unknown as ApiResultOperationError);

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
