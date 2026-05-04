import { Month } from '@common/enums/month.enum';

export const MonthTitles: Record<Month, string> = {
  [Month.January]: 'Січень',
  [Month.February]: 'Лютий',
  [Month.March]: 'Березень',
  [Month.April]: 'Квітень',
  [Month.May]: 'Травень',
  [Month.June]: 'Червень',
  [Month.July]: 'Липень',
  [Month.August]: 'Серпень',
  [Month.September]: 'Вересень',
  [Month.October]: 'Жовтень',
  [Month.November]: 'Листопад',
  [Month.December]: 'Грудень',
};

export const WeekTitles: Record<number, string> = {
  0: 'Пн',
  1: 'Вт',
  2: 'Ср',
  3: 'Чт',
  4: 'Пт',
  5: 'Сб',
  6: 'Нд',
};
