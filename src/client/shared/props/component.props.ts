import { ComponentPropsWithoutRef, Ref } from 'react';

export interface ComponentDefaultProps extends ComponentPropsWithoutRef<'div'> {
  className?: string | undefined;
  ref?: Ref<never>;
}
