import { create } from 'zustand/react';
import { PopoverHookModel } from './models/popover.hook.model';
import { JSX, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { getPageCoords } from '../../utils/get-page-cords.util';

export const usePopover = create<PopoverHookModel>((set) => ({
  show: false,
  template: undefined,
  top: undefined,
  left: undefined,
  showPopover: (template: JSX.Element, targetEl: Element) => {
    const { top, left } = getPageCoords(targetEl);

    set({ show: true, template, top: top + targetEl.clientHeight, left });
  },
  hidePopover: () => {
    set({ show: false, template: undefined, top: undefined, left: undefined });
  },
}));

/**
 * Synchronizes local component state with the global popover store.
 *
 * This hook monitors the global popover state and triggers the provided `closeDropdown`
 * callback when the popover associated with the specific `template` is closed
 * or replaced by another popover.
 *
 * It uses a `ref` to track previous ownership, ensuring the callback fires correctly
 * even when the store's template resets to `undefined` upon closing.
 *
 * @param template - The JSX Element or reference identifying the specific popover content.
 * @param closeDropdown - The callback function to execute when the popover closes (e.g., `() => setIsOpen(false)`).
 *
 * @example
 * const MyComponent = () => {
 * const [isOpen, setIsOpen] = useState(false);
 * const contentRef = useRef(null);
 *
 * // Auto-close local state when the global popover closes
 * useCloseWithPopover(contentRef.current, () => setIsOpen(false));
 *
 * return <div ref={contentRef}>Popover Content</div>;
 * };
 */
export const useCloseWithPopover = (template: JSX.Element, closeDropdown: () => void) => {
  const { isGlobalShow, globalTemplate } = usePopover(
    useShallow((state) => ({
      isGlobalShow: state.show,
      globalTemplate: state.template,
    })),
  );

  const wasMyPopoverRef = useRef(false);

  useEffect(() => {
    const isMyPopoverNow = isGlobalShow && globalTemplate === template;

    if (!isMyPopoverNow && wasMyPopoverRef.current) {
      closeDropdown();
    }

    wasMyPopoverRef.current = isMyPopoverNow;
  }, [isGlobalShow, globalTemplate, template, closeDropdown]);
};
