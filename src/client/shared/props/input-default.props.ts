import type { ReactNode } from 'react';

export interface InputDefaultProps {
  value?: string | undefined | null;
  placeholder?: string | undefined;
  disabled?: boolean;
  description?: string | ReactNode;
  id?: string | undefined;
  className?: string | undefined;
  onBlur?: (event: Event) => void;
}
