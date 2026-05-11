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
  0: 'Нд',
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Сб',
};
