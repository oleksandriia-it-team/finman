import { cn } from '@frontend/shared/utils/cn.util';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { FinListInsideWrapperProps } from '@frontend/components/wrappers/props/fin-list-inside-wrapper.props';

export function FinListWrapper({ children, state }: FinListInsideWrapperProps) {
  return (
    <div
      className={cn(
        'overflow-y-auto min-h-0 p-4',
        state !== PromiseState.Error && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
      )}
    >
      {children}
    </div>
  );
}
