import type { InputControlProps } from '@frontend/shared/props/input-control.props';

import type { ComponentProps } from 'react';
import { type DateRange, type DayPicker } from 'react-day-picker';

export type DatepickerVariantsProps =
  | {
      mode: 'range';
      selected: DateRange | undefined;
      onSelect: (dateRange: DateRange | undefined) => void;
    }
  | {
      mode: 'single';
      selected: Date | undefined;
      onSelect: (date: Date | undefined) => void;
    };

export type DatepickerProps = DatepickerVariantsProps &
  Omit<ComponentProps<'button'>, 'onBlur' | 'onSelect'> &
  Pick<ComponentProps<typeof DayPicker>, 'formatters'> & {
    placeholder?: string | undefined;
    locale?: string;
    includeTime?: boolean;
    calendarClassName?: string;
    onBlur?: () => void;
    disabled?: boolean | undefined;
    clearable?: boolean;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
  };

export type ControlledDatepickerProps = Omit<DatepickerProps, 'selected' | 'onSelect' | 'ref'> &
  InputControlProps & {
    id?: string;
    transformForSingle?: (date: Date) => Date;
  };
