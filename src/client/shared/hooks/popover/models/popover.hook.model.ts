import { JSX } from 'react';

export interface PopoverHookModel {
  template: JSX.Element | undefined;
  top: number | undefined;
  left: number | undefined;
  show: boolean;
  showPopover: (template: JSX.Element, targetEl: Element) => void;
  hidePopover: () => void;
}
