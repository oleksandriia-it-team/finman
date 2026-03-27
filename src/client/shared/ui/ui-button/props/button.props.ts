import { ChildrenComponentProps } from '../../../models/component-with-chilren.model';
import { ComponentPropsWithRef } from 'react';

export type ButtonVariant = 'warning' | 'danger' | 'info' | 'success' | 'default';

export type ButtonProps = ComponentPropsWithRef<'button'> &
  ChildrenComponentProps & {
    variant: ButtonVariant;
    type?: 'button' | 'submit' | 'reset' | undefined;
    isOutlined?: boolean | undefined;
    isRoundedFull?: boolean | undefined;
    bgNone?: boolean | undefined;
  };
