import { type DateFormatType } from '../../../enums/date-type.enum';
import { type ComponentProps } from 'react';

export interface TransformDateProps extends Omit<ComponentProps<'p'>, 'children'> {
  date: Date | string | number;
  type: DateFormatType;
  locale?: string;
}
