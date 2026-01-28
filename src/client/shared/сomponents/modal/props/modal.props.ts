import { ReactNode } from 'react';

export interface ModalProps<R> {
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
  onClose?: (result: R | undefined) => void;
}
