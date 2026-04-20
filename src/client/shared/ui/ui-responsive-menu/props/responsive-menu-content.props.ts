import { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';

export interface ResponsiveMenuContentProps extends ChildrenComponentProps {
  asChild?: boolean;
  className?: string;
}
