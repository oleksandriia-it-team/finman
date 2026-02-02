import { create } from 'zustand/react';
import { ModalHookModel } from './model/modal-hook.model';
import { ModalParams } from './model/modal-params';

export const useModalStore = create<ModalHookModel>((set, get) => ({
  isOpen: false,
  params: null,

  openModal: (params) => {
    set({
      isOpen: true,
      params: {
        closeOnOutsideClick: true,
        closeOnEsc: true,
        ...params,
      } as ModalParams<unknown>,
    });
  },

  closeModal: (result) => {
    const { params } = get();

    if (params?.onResolve) {
      params.onResolve(result);
    }

    set({ isOpen: false, params: null });
  },
}));
