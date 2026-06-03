import { UiPopoverTrigger } from '@frontend/ui/ui-popover/ui-popover-trigger';
import { UiPopoverContent } from '@frontend/ui/ui-popover/ui-popover-content';
import { UiCalendar } from '@frontend/ui/ui-datepicker/ui-calendar';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useCallback, useMemo, useState } from 'react';
import { FinTransformDate } from '../transform-date/fin-transform-date';
import { DateFormatType } from '@frontend/shared/enums/date-type.enum';
import { isToday } from 'date-fns';
import type { Month } from '@common/enums/month.enum';
import { useMonthTitles, useWeekTitles } from '@frontend/shared/i18n/use-month-titles.hook';
import { UiPopover } from '@frontend/ui/ui-popover/ui-popover';
import type { DatepickerProps } from '../controlled-fields/props/controlled-datepicker.props';
import { UiInputGroup } from '@frontend/ui/ui-input-group/ui-input-group';
import { UiInputGroupAddon } from '@frontend/ui/ui-input-group/ui-input-group-addon';
import { cn } from '@frontend/shared/utils/cn.util';
import { defaultLocale } from '@frontend/shared/utils/get-preferred-locale.util';
import { useTranslations } from 'next-intl';

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
  const tCommon = useTranslations('common');
  const monthTitles = useMonthTitles();
  const weekTitles = useWeekTitles();

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
          locale={locale ?? defaultLocale}
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
          {tCommon('today')}, {getDateContent(selected, DateFormatType.Short)}
          {includeTime && (
            <>
              {' '}
              {tCommon('at')} {getDateContent(selected, DateFormatType.TimeOnly)}
            </>
          )}
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
  }, [getDateContent, includeTime, placeholder, mode, selected, tCommon]);

  return (
    <UiPopover
      open={open}
      onOpenChange={handleOpenChange}
      modal={false}
    >
      <UiPopoverTrigger asChild>
        <UiInputGroup
          data-state={open ? 'open' : 'closed'}
          className="flex cursor-pointer"
        >
          <button
            ref={ref}
            className={cn('flex gap-2 flex-1 outline-transparent cursor-pointer', className)}
            {...props}
            disabled={disabled}
            type="button"
          >
            <UiInputGroupAddon align="inline-start">
              <UiSvgIcon
                name="calendar4"
                size="default"
              />
            </UiInputGroupAddon>

            <span className="truncate min-w-0 flex-1 text-left">{buttonValue}</span>
          </button>

          {!!selected && clearable && (
            <UiInputGroupAddon align="inline-end">
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
            </UiInputGroupAddon>
          )}
        </UiInputGroup>
      </UiPopoverTrigger>

      <UiPopoverContent
        onCloseAutoFocus={(event) => {
          event.preventDefault();
        }}
      >
        <UiCalendar
          className={calendarClassName ?? ''}
          required={false}
          formatters={{
            formatWeekdayName: (weekDay) => weekTitles[weekDay.getDay()],
            formatMonthCaption: (month) =>
              `${monthTitles[month.getMonth() as unknown as Month]} ${month.getFullYear()}`,
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
