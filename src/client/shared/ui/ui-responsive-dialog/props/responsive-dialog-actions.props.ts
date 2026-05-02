import { type ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';

export interface ResponsiveDialogActionsProps extends Partial<ChildrenComponentProps> {
  asChild?: boolean;
  className?: string;
}
