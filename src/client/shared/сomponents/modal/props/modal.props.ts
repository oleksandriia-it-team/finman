import { ReactNode, RefObject } from 'react';

export interface ModalProps<R> {
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
  onClose?: (result: R | undefined) => void;
  contentRef?: RefObject<HTMLElement | null>;
}
