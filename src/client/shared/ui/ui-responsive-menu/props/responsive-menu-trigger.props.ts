import { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';

export interface ResponsiveMenuTriggerProps extends ChildrenComponentProps {
  asChild?: boolean;
  className?: string;
}
