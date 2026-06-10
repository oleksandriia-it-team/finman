'use client';

import { useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { UiSkeleton } from '@frontend/ui/ui-skeleton/ui-skeleton';
import type { TableScreenHandlerProps } from '@frontend/components/screen-handlers/props/table-screen-handler.props';
import { FinListScreenHandler } from '@frontend/components/screen-handlers/fin-list-screen-handler';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';
import { UiTableRow } from '@frontend/ui/ui-table/ui-table-row';
import { UiTableCell } from '@frontend/ui/ui-table/ui-table-cell';
import { FinErrorTableWidget } from '@frontend/components/error/fin-error-table-widget';

export function FinTableScreenHandler({
  skeleton,
  skeletonClassName,
  totalColumns,
  error,
  ...props
}: TableScreenHandlerProps) {
  const t = useTranslations();
  const tableSkeleton = useCallback(() => {
    const Skeleton = skeleton ?? UiSkeleton;

    const countCells = Array.from({ length: totalColumns }).map((_, i) => i);

    return (
      <UiTableRow>
        {countCells.map((cell) => (
          <UiTableCell key={cell}>
            <Skeleton className={skeletonClassName ?? ''} />
          </UiTableCell>
        ))}
      </UiTableRow>
    );
  }, [skeleton, skeletonClassName, totalColumns]);

  const tableError = useMemo(() => {
    return (
      <UiTableRow>
        <UiTableCell colSpan={totalColumns}>
          {error ?? (
            <FinErrorTableWidget
              status={(props.appError?.status ?? 500) as ApiResultOperationError['status']}
              message={props.appError?.message ? t(props.appError.message) : t('common.dataLoadError')}
            />
          )}
        </UiTableCell>
      </UiTableRow>
    );
  }, [error, totalColumns, props.appError]);

  const tableEmpty = useMemo(
    () => (
      <UiTableRow>
        <UiTableCell colSpan={totalColumns}>
          <span className="italic">{t('common.notFound')}</span>
        </UiTableCell>
      </UiTableRow>
    ),
    [totalColumns],
  );

  return (
    <FinListScreenHandler
      {...props}
      skeleton={tableSkeleton}
      error={tableError}
      notItemFound={props.notItemFound ?? tableEmpty}
    />
  );
}
