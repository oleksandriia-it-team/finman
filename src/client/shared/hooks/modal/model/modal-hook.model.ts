import { JSX } from 'react';

export interface ModalHookModel {
  template: JSX.Element | undefined;
  onClose: (result: boolean) => void;
}
