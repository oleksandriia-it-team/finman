import { create } from 'zustand/react';
import { PopoverHookModel } from './models/popover.hook.model';
import { JSX } from 'react';
import { getPageCoords } from '../../utils/get-page-cords.util';

const MinPopoverGap = 2;

export const usePopover = create<PopoverHookModel>((set) => ({
  show: false,
  template: undefined,
  top: undefined,
  left: undefined,
  minWidth: undefined,
  showPopover: (template: JSX.Element, targetEl: Element) => {
    const { top, left } = getPageCoords(targetEl);

    const width = targetEl.clientWidth;

    set({ show: true, template, top: top + targetEl.clientHeight + MinPopoverGap, left, minWidth: width });
  },
  hidePopover: () => {
    set({ show: false, template: undefined, top: undefined, left: undefined, minWidth: undefined });
  },
}));
