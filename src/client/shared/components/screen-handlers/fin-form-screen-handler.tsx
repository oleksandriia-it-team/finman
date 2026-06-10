'use client';

import type { FormScreenHandlerProps } from './props/form-screen-handler.props';
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { checkIsAppErrorObj } from '@common/utils/check-is-api-error.util';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations();
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
          message={t('common.invalidId')}
        />
      );
    }
    return error({ status: 400, message: t('common.invalidId') });
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
          message={t('common.loadError')}
        />
      );
    }

    if (checkIsAppErrorObj(item.error)) {
      return error({ ...item.error, message: t(item.error.message) });
    }
    return error({ status: 500, message: t('common.unknownError') });
  }

  if (!item.data) {
    return (
      notItemFound ?? (
        <FinErrorWidget
          status={404}
          message={t('common.elementNotFound')}
        />
      )
    );
  }

  return render(item.data);
}
