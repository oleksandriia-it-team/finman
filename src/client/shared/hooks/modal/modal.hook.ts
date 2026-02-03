import { create } from 'zustand/react';
import { ModalHookModel } from './model/modal-hook.model';

export const useModalStore = create<ModalHookModel>((set, get) => ({
  isOpen: false,
  template: undefined,
  onClose: undefined,
  openModal: (template, onClose) => {
    set({ isOpen: true, template, onClose });
  },
  hideModal: () => {
    set({ isOpen: false, template: undefined, onClose: undefined });
  },
}));
