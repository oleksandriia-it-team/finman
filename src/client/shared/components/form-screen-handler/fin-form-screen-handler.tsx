import type { FormScreenHandlerProps } from '@frontend/components/form-screen-handler/props/form-screen-handler.props';
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';
import { z } from 'zod';

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
      return <span>Виникла помилка...</span>;
    }

    const Error = error({ status: 400, message: 'ID є некоректним' });

    return Error;
  }

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
      return <span>Виникла помилка...</span>;
    }

    const Error = error(item.error as unknown as ApiResultOperationError);

    return Error;
  }

  if (!item.data) {
    return notItemFound ?? <span>Дані не знайдено...</span>;
  }

  return render(item.data);
}
