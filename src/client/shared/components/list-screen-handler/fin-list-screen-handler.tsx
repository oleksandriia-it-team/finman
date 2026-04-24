import type { ListScreenHandlerProps } from '@frontend/components/list-screen-handler/props/list-screen-handler.props';
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
  errorMessage,
  skeletonItems,
  skeletonClassName,
}: ListScreenHandlerProps) {
  const skeletonArray = useMemo(() => Array.from({ length: skeletonItems }), [skeletonItems]);

  if (state === PromiseState.Loading) {
    const Skeleton = skeleton ?? UiSkeleton;

    return (
      <>
        {skeletonArray.map((_, index) => (
          <Skeleton
            key={index}
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
          status={400}
          message={errorMessage ?? 'Сталася помилка при завантаженні даних'}
        />
      )
    );
  }

  if (!hasData) {
    return (
      notItemFound ?? (
        <FinErrorWidget
          status={404}
          message="Нічого не знайдено"
        />
      )
    );
  }

  return children;
}
