import { DateFormatType } from '../../../enums/date-type.enum';

export type TransformDateProps = {
  date: Date | string | number;
  type: DateFormatType;
  locale?: string;
};