import { ComponentPropsWithRef } from 'react';

export type ButtonVariant = 'default' | 'secondary' | 'destructive' | 'muted' | 'accent' | 'link';

export type ButtonSize = 'default' | 'xs' | 'sm' | 'lg';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isOutlined?: boolean;
  isGhost?: boolean;
  isRoundedFull?: boolean;
  bgNone?: boolean;
  asChild?: boolean;
}
