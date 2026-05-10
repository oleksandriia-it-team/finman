import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';

export function FinListPageWrapper({ children }: ChildrenComponentProps) {
  return <div className="size-full overflow-hidden flex flex-col pb-8 relative">{children}</div>;
}
