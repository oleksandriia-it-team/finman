import type { ListScreenHandlerProps } from '@frontend/components/screen-handlers/props/list-screen-handler.props';
import { FinErrorWidget } from '../error/fin-error-widget';
import { useMemo } from 'react';
import { UiSkeleton } from '@frontend/ui/ui-skeleton/ui-skeleton';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';

export function FinListScreenHandler({
  skeleton,
  notItemFound,
  children,
  error,
  state,
  hasData,
  appError,
  skeletonItems,
  skeletonClassName,
}: ListScreenHandlerProps) {
  const skeletonArray = useMemo(
    () => Array.from({ length: skeletonItems }, (_, i) => `skeleton-${i}`),
    [skeletonItems],
  );

  if (state === PromiseState.Loading) {
    const Skeleton = skeleton ?? UiSkeleton;

    return (
      <>
        {skeletonArray.map((key) => (
          <Skeleton
            key={key}
            className={skeletonClassName ?? ''}
          />
        ))}
      </>
    );
  }

  if (state === PromiseState.Error) {
    return (
      error ?? (
        <FinErrorWidget
          status={appError?.status ?? 500}
          message={appError?.message ?? 'Сталася помилка при завантаженні даних'}
        />
      )
    );
  }

  if (!hasData) {
    return notItemFound ?? <span className="italic">Дані не знайдено</span>;
  }

  return children;
}
