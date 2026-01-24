import { ChildrenComponentProps } from '../client/shared/models/component-with-chilren.model';
import { usePopover } from '../client/shared/hooks/popover/popover.hook';
import { useShallow } from 'zustand/react/shallow';
import { useMemo, useState } from 'react';
import { getPageCoords } from '../client/shared/utils/get-page-cords.util';
import { MinPopoverGap } from '../client/shared/constants/min-popover-gap.constants';
import { useEventContainment } from '../client/shared/hooks/event-containment/event-containment.hook';
import { useDynamicKey } from '../client/shared/hooks/dynamic-key/dynamic-key.hook';

export default function LoadPopover({ children }: ChildrenComponentProps) {
  const { template, target, show, hidePopover } = usePopover(
    useShallow((state) => ({
      template: state.template,
      target: state.target,
      show: state.show,
      hidePopover: state.hidePopover,
    })),
  );

  const dynamicKey = useDynamicKey(target);

  const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);

  const { top, left, minWidth } = useMemo(() => {
    if (!target) {
      return { top: 0, minWidth: 0, left: 0 };
    }

    const { top, left } = getPageCoords(target);

    const width = target.clientWidth;

    return { top: top + target.clientHeight + MinPopoverGap, left, minWidth: width };
  }, [target]);

  const listenElements = useMemo(() => {
    return wrapperRef && target ? [wrapperRef, target] : [];
  }, [target, wrapperRef]);

  useEventContainment(listenElements, 'click', (isInside) => {
    if (!isInside) {
      hidePopover();
    }
  });

  return (
    <>
      {show && template && (
        <div
          key={dynamicKey}
          ref={setWrapperRef}
          className="absolute z-1000"
          style={{ top: `${top}px`, left: `${left}px`, minWidth: `${minWidth}px` }}
        >
          {template}
        </div>
      )}

      {children}
    </>
  );
}
