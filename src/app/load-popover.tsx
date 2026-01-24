import { ChildrenComponentProps } from '../client/shared/models/component-with-chilren.model';
import { usePopover } from '../client/shared/hooks/popover/popover.hook';
import { useShallow } from 'zustand/react/shallow';

export default function LoadPopover({ children }: ChildrenComponentProps) {
  const { template, top, left, show } = usePopover(
    useShallow((state) => ({ template: state.template, left: state.left, top: state.top, show: state.show })),
  );

  return (
    <>
      {show && template && (
        <div
          className="absolute z-1000"
          style={{ top: `${top}px`, left: `${left}px` }}
        >
          {template}
        </div>
      )}

      {children}
    </>
  );
}
