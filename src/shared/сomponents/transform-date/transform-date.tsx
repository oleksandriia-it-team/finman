import { FormatDate, DateFormatType } from '../../../data-access/date-service/date.service';
import React, { useMemo } from 'react';


type TransformDateProps = {
  date: Date | string | number;
  type: DateFormatType;
  locale?: string;
};

export default function TransformDate({ date, type, locale = 'en-US' }: TransformDateProps) {
  const formatted = useMemo(() => {
    return FormatDate(date, type, locale);
  }, [ date, type, locale ]);

  return <p>{ formatted }</p>;
}
