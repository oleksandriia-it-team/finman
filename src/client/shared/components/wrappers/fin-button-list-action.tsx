import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';

export function FinButtonListAction({ children }: ChildrenComponentProps) {
  return <div className="fixed bottom-6 right-6">{children}</div>;
}
