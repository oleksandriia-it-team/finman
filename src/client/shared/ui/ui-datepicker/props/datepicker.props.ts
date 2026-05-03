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
  Pick<ComponentProps<typeof DayPicker>, 'className' | 'formatters'> & {
    placeholder: string;
    locale?: string;
    includeTime?: boolean;
    calendarClassName?: string;
  };
