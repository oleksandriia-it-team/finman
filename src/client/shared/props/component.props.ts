import { type ComponentPropsWithoutRef } from 'react';

export interface ComponentDefaultProps extends ComponentPropsWithoutRef<'div'> {
  className?: string | undefined;
}
