import { type ComponentDefaultProps } from './component.props';
import type { ReactNode } from 'react';

export interface InputDefaultProps extends Omit<ComponentDefaultProps, 'onChange' | 'onInput'> {
  value?: string | undefined | null;
  placeholder?: string | undefined;
  disabled?: boolean;
  description?: string | ReactNode;
}
