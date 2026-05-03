import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';

export interface AuthLayoutProps extends ChildrenComponentProps {
  imageSrc: string;
  rightSideTitle?: string;
  rightSideDescription?: string;
  rightSideClassName?: string;
  rightSideImageClassName?: string;
}
