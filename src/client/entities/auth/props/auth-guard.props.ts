import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';

export interface AuthGuardProps extends ChildrenComponentProps {
  routePath?: string;
}
