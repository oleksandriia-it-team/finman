import { JSX } from 'react';

export interface ModalConfigModel {
  template: JSX.Element;
  onClose: (result: boolean) => void;
}
