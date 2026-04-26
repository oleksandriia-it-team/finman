import { RegularPaymentFrequency } from '@common/enums/regular-freequency.enum';

export const FrequencyOptions = [
  { label: 'Щодня', value: RegularPaymentFrequency.Daily },
  { label: 'Щотижня', value: RegularPaymentFrequency.Weekly },
  { label: 'Щомісяця', value: RegularPaymentFrequency.Monthly },
  { label: 'Щороку', value: RegularPaymentFrequency.Yearly },
];

export const DayOfMonthOptions = Array.from({ length: 31 }, (_, i) => ({
  label: String(i + 1),
  value: String(i + 1),
}));
