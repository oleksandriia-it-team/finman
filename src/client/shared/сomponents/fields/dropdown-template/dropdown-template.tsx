'use client';

import SvgIcon from '../../svg-icon/svg-icon';
import { DropdownInputTemplateProps } from '../models/input.model';
import { useCallback, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { usePopover } from '../../../hooks/popover/popover.hook';
import { useShallow } from 'zustand/react/shallow';
import { useCloseWithPopover } from '../../../hooks/popover/use-close-with-popover.hook';

export default function DropdownTemplate({
  value,
  className,
  chevronClassName,
  placeholder,
  optionsTemplate,
  id,
  setOpen,
  open,
}: DropdownInputTemplateProps) {
  const { showPopover, hidePopover } = usePopover(
    useShallow((state) => ({
      showPopover: state.showPopover,
      hidePopover: state.hidePopover,
    })),
  );

  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const setVisibility = useCallback(() => {
    setOpen(!open);
    if (open) {
      hidePopover();
    } else if (inputWrapperRef.current) {
      showPopover(optionsTemplate, inputWrapperRef.current);
    }
  }, [setOpen, open, hidePopover, showPopover, optionsTemplate]);

  useCloseWithPopover(optionsTemplate, () => setOpen(false));

  const inputClasses = useMemo(() => {
    return clsx(className, 'form-control', 'default-field-styles');
  }, [className]);

  const chevronWrapperClasses = clsx(
    'default-field-height',
    'default-field-padding-right',
    'top-0',
    'right-0',
    'absolute',
    'flex',
    'items-center',
  );

  const chevronClasses = useMemo(() => {
    return clsx(open && 'rotate-180', chevronClassName);
  }, [open, chevronClassName]);

  return (
    <div
      className="relative cursor-pointer"
      onClick={setVisibility}
      ref={inputWrapperRef}
    >
      <input
        id={id}
        readOnly={true}
        placeholder={placeholder}
        className={inputClasses}
        value={value}
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
