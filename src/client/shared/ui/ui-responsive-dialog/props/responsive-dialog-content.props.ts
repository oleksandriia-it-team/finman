import { type ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';

export interface ResponsiveDialogContentProps extends ChildrenComponentProps {
  className?: string;
  mobileSide?: 'bottom' | 'left' | 'right' | 'top';
}
