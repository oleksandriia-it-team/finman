import { create } from 'zustand/react';
import { PopoverHookModel } from './models/popover.hook.model';
import { JSX } from 'react';

export const usePopover = create<PopoverHookModel>((set) => ({
  show: false,
  template: undefined,
  target: undefined,
  showPopover: (template: JSX.Element, targetEl: HTMLElement) => {
    set({ show: true, template, target: targetEl });
  },
  hidePopover: () => {
    set({ show: false, template: undefined, target: undefined });
  },
}));
