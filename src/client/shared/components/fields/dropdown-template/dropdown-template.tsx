'use client';

import SvgIcon from '../../svg-icon/svg-icon';
import { DropdownInputTemplateProps } from '../props/input.props';
import { useMemo, useRef } from 'react';
import { cn } from '../../../utils/cn.util';

export default function DropdownTemplate({
  value,
  className,
  chevronClassName,
  placeholder,
  id,
  open,
}: DropdownInputTemplateProps) {
  // TODO: Refactor when Shadcn popover will be ready
  // const { showPopover, hidePopover, isGlobalShow } = usePopover(
  //   useShallow((state) => ({
  //     showPopover: state.showPopover,
  //     hidePopover: state.hidePopover,
  //     isGlobalShow: state.show,
  //   })),
  // );

  const inputWrapperRef = useRef<HTMLDivElement>(null);

  // const setVisibility = useCallback(() => {
  //   setOpen(!open);
  //   if (open) {
  //     hidePopover();
  //   } else if (inputWrapperRef.current) {
  //     showPopover(optionsTemplate, inputWrapperRef.current);
  //   }
  // }, [setOpen, open, hidePopover, showPopover, optionsTemplate]);
  //
  // useEffect(() => {
  //   if (open && isGlobalShow && inputWrapperRef.current) {
  //     showPopover(optionsTemplate, inputWrapperRef.current);
  //   }
  // }, [optionsTemplate, open, isGlobalShow, showPopover]);

  // TODO: Refactor when Shadcn popover will be ready
  // useCloseWithPopover(inputWrapperRef.current, () => setOpen(false));

  // const handleKeyDown = useCallback(
  //   (e: React.KeyboardEvent) => {
  //     if (e.defaultPrevented) {
  //       return;
  //     }
  //
  //     if (e.key === 'Enter' || e.key === ' ') {
  //       e.preventDefault();
  //       setVisibility();
  //     }
  //   },
  //   [setVisibility],
  // );

  const inputClasses = useMemo(() => {
    return cn(className, 'form-control', 'default-field-styles');
  }, [className]);

  const chevronWrapperClasses = cn(
    'default-field-height',
    'default-field-padding-right',
    'top-0',
    'right-0',
    'absolute',
    'flex',
    'items-center',
  );

  const chevronClasses = useMemo(() => {
    return cn(open && 'rotate-180', chevronClassName);
  }, [open, chevronClassName]);

  return (
    <div
      className="relative cursor-pointer"
      // onClick={setVisibility}
      ref={inputWrapperRef}
      tabIndex={0}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      // onKeyDown={handleKeyDown}
    >
      <input
        id={id}
        readOnly={true}
        placeholder={placeholder}
        className={inputClasses}
        value={value ?? ''}
        tabIndex={-1} // Input is read-only, focus should be on the wrapper
        aria-hidden="true" // Hide input from screen readers as wrapper acts as combobox
      />

      <div className={chevronWrapperClasses}>
        <SvgIcon
          className={chevronClasses}
          size="small"
          name="chevron-up"
        />
      </div>
    </div>
  );
}
