import { ReactNode } from 'react';

export interface ModalParams<R = unknown> {
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  onResolve?: (result: R | undefined) => void;
}
