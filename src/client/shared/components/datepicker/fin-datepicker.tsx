import { UiPopover } from '@frontend/ui/ui-popover/ui-popover';
import { UiPopoverTrigger } from '@frontend/ui/ui-popover/ui-popover-trigger';
import { UiPopoverContent } from '@frontend/ui/ui-popover/ui-popover-content';
import { UiCalendar } from '@frontend/ui/ui-datepicker/ui-calendar';
import type { DatepickerProps } from '@frontend/ui/ui-datepicker/props/datepicker.props';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useCallback, useMemo } from 'react';
import { FinTransformDate } from '../transform-date/fin-transform-date';
import { DateFormatType } from '@frontend/shared/enums/date-type.enum';
import { cn } from '@frontend/shared/utils/cn.util';
import { isToday } from 'date-fns';

export function FinDatepicker({
  placeholder,
  className,
  calendarClassName,
  locale,
  includeTime,
  ...props
}: DatepickerProps) {
  const getDateContent = useCallback(
    (date: Date) => {
      return (
        <FinTransformDate
          type={DateFormatType.Short}
          date={date}
          locale={locale}
        />
      );
    },
    [locale],
  );

  const getTimeContent = useCallback(
    (date: Date) => {
      return (
        <FinTransformDate
          type={DateFormatType.TimeOnly}
          date={date}
          locale={locale}
        />
      );
    },
    [locale],
  );

  const buttonValue = useMemo(() => {
    if (!props.selected || (props.mode === 'range' && !props.selected.to && !props.selected.from)) {
      return placeholder;
    }

    if (props.mode === 'single' && isToday(props.selected)) {
      return (
        <>
          Сьогодні, {getDateContent(props.selected)} о {getTimeContent(props.selected)}
        </>
      );
    }

    if (props.mode === 'single') {
      return (
        <>
          {getDateContent(props.selected)}

          {includeTime && getTimeContent(props.selected)}
        </>
      );
    } else {
      return (
        <>
          {props.selected.from && getDateContent(props.selected.from)}
          {props.selected.from && includeTime && getTimeContent(props.selected.from)}-
          {props.selected.to && getDateContent(props.selected.to)}
          {props.selected.to && includeTime && getTimeContent(props.selected.to)}
        </>
      );
    }
  }, [getDateContent, getTimeContent, includeTime, placeholder, props.mode, props.selected]);

  return (
    <UiPopover>
      <UiPopoverTrigger>
        <button className={cn('basic-input w-full flex gap-2 items-center', className)}>
          <UiSvgIcon
            name="calendar4"
            size="default"
          />

          <div className="flex flex-1 gap-1">{buttonValue}</div>

          {!!props.selected && (
            <button
              className="cursor-pointer"
              onClick={() => props.onSelect(undefined)}
            >
              <UiSvgIcon
                name="x"
                size="default"
              />
            </button>
          )}
        </button>
      </UiPopoverTrigger>

      <UiPopoverContent>
        <UiCalendar
          className={calendarClassName ?? ''}
          required
          {...props}
        />
      </UiPopoverContent>
    </UiPopover>
  );
}
