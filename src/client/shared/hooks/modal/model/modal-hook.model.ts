import { ModalParams } from './modal-params';

export interface ModalHookModel {
  isOpen: boolean;
  params: ModalParams<unknown> | null;
  openModal: <T>(params: ModalParams<T>) => void;
  closeModal: <T>(result?: T) => void;
}
