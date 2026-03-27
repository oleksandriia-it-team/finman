import { ChildrenComponentProps } from '../../../models/component-with-chilren.model';
import { ComponentPropsWithRef } from 'react';

export type UiOptionItemProps = ComponentPropsWithRef<'li'> &
  ChildrenComponentProps & {
    selected?: boolean;
    onClick: () => void;
  };
