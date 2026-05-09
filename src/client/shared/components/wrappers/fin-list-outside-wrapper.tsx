import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';

export function FinListOutsideWrapper({ children }: ChildrenComponentProps) {
  return <div className="flex-1 overflow-y-auto min-h-0 p-4">{children}</div>;
}
