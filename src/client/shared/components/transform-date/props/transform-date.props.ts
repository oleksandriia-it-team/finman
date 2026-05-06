import { type DateFormatType } from '../../../enums/date-type.enum';
import { type ComponentProps } from 'react';
import type { SupportLanguages } from '@common/enums/support-languages.enum';

export interface TransformDateProps extends Omit<ComponentProps<'p'>, 'children'> {
  date: Date | string | number;
  type: DateFormatType;
  locale?: string;
  language?: SupportLanguages;
}
