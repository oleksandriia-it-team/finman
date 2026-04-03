import { ComponentPropsWithRef } from 'react';

export interface ComponentDefaultProps extends ComponentPropsWithRef<'div'> {
  className?: string | undefined;
}
