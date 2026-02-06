import { usePopover } from './popover.hook';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useRef } from 'react';

export const useCloseWithPopover = (target: Element | undefined | null, closeDropdown: () => void) => {
  const { isGlobalShow, globalTarget } = usePopover(
    useShallow((state) => ({
      isGlobalShow: state.show,
      globalTarget: state.target,
    })),
  );

  const wasMyPopoverRef = useRef(false);

  useEffect(() => {
    const isMyPopoverNow = isGlobalShow && globalTarget === target;

    if (!isMyPopoverNow && wasMyPopoverRef.current) {
      closeDropdown();
    }

    wasMyPopoverRef.current = isMyPopoverNow;
  }, [isGlobalShow, closeDropdown]);
};
