import { JSX } from 'react';

export interface ModalHookModel {
  isOpen: boolean;
  template: JSX.Element | undefined;
  onClose: (() => void) | undefined;
  openModal: (template: JSX.Element, onClose?: (result?: undefined) => void) => void;
  hideModal: () => void;
}
