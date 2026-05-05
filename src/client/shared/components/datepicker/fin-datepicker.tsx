import { UiPopoverTrigger } from '@frontend/ui/ui-popover/ui-popover-trigger';
import { UiPopoverContent } from '@frontend/ui/ui-popover/ui-popover-content';
import { UiCalendar } from '@frontend/ui/ui-datepicker/ui-calendar';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useCallback, useMemo, useState } from 'react';
import { FinTransformDate } from '../transform-date/fin-transform-date';
import { DateFormatType } from '@frontend/shared/enums/date-type.enum';
import { cn } from '@frontend/shared/utils/cn.util';
import { isToday } from 'date-fns';
import { MonthTitles, WeekTitles } from '@common/constants/month-titles.constant';
import type { Month } from '@common/enums/month.enum';
import { UiPopover } from '@frontend/ui/ui-popover/ui-popover';
import type { DatepickerProps } from '../controlled-fields/props/controlled-datepicker.props';

export function FinDatepicker({
  placeholder,
  className,
  calendarClassName,
  locale,
  includeTime,
  ref,
  onBlur,
  disabled,
  clearable = true,
  mode,
  onSelect,
  selected,
  maxDate,
  minDate,
  ...props
}: DatepickerProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen);
      if (!newOpen) {
        onBlur?.();
      }
    },
    [onBlur],
  );

  const getDateContent = useCallback(
    (date: Date, type: DateFormatType.Short | DateFormatType.TimeOnly) => {
      return (
        <FinTransformDate
          type={type}
          date={date}
          locale={locale}
        />
      );
    },
    [locale],
  );

  const buttonValue = useMemo(() => {
    if (!selected || (mode === 'range' && !selected.to && !selected.from)) {
      return placeholder ?? '';
    }

    if (mode === 'single' && isToday(selected)) {
      return (
        <>
          Сьогодні, {getDateContent(selected, DateFormatType.Short)}
          {includeTime && <> о {getDateContent(selected, DateFormatType.TimeOnly)}</>}
        </>
      );
    }

    if (mode === 'single') {
      return (
        <>
          {getDateContent(selected, DateFormatType.Short)}

          {includeTime && getDateContent(selected, DateFormatType.TimeOnly)}
        </>
      );
    } else {
      return (
        <>
          {selected.from && getDateContent(selected.from, DateFormatType.Short)}
          {selected.from && includeTime && getDateContent(selected.from, DateFormatType.TimeOnly)}-
          {selected.to && getDateContent(selected.to, DateFormatType.Short)}
          {selected.to && includeTime && getDateContent(selected.to, DateFormatType.TimeOnly)}
        </>
      );
    }
  }, [getDateContent, includeTime, placeholder, mode, selected]);

  return (
    <UiPopover
      open={open}
      onOpenChange={handleOpenChange}
    >
      <UiPopoverTrigger asChild>
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          data-state={open ? 'open' : 'closed'}
          className={cn('basic-input w-full flex gap-2 items-center', className)}
          {...props}
        >
          <UiSvgIcon
            name="calendar4"
            size="default"
          />

          <div className="flex flex-1 gap-1">{buttonValue}</div>

          {!!selected && clearable && (
            <button
              type="button"
              className="cursor-pointer"
              onClick={(e) => {
                onSelect(undefined);
                e.stopPropagation();
              }}
            >
              <UiSvgIcon
                name="x"
                size="default"
              />
            </button>
          )}
        </button>
      </UiPopoverTrigger>

      <UiPopoverContent
        onCloseAutoFocus={(event) => {
          event.preventDefault();
        }}
      >
        <UiCalendar
          className={calendarClassName ?? ''}
          required
          formatters={{
            formatWeekdayName: (weekDay) => WeekTitles[weekDay.getDay()],
            formatMonthCaption: (month) =>
              `${MonthTitles[month.getMonth() as unknown as Month]} ${month.getFullYear()}`,
          }}
          mode={mode as never}
          selected={selected as never}
          onSelect={
            ((selected: never) => {
              onSelect(selected);
              if (mode === 'single') {
                handleOpenChange(false);
              }
            }) as never
          }
          minDate={minDate}
          maxDate={maxDate}
        />
      </UiPopoverContent>
    </UiPopover>
  );
}
