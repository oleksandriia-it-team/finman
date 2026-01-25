import { JSX } from 'react';

export interface PopoverHookModel {
  template: JSX.Element | undefined;
  target: HTMLElement | undefined;
  show: boolean;
  showPopover: (template: JSX.Element, targetEl: HTMLElement) => void;
  hidePopover: () => void;
}
