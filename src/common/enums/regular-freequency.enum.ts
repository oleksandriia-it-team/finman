export const RegularPaymentFrequency = {
  Daily: 'daily',
  Weekly: 'weekly',
  Monthly: 'monthly',
  Yearly: 'yearly',
} as const;

export const RegularPaymentFrequencyFilter = {
  Today: 'today',
  Week: 'week',
  Month: 'month',
  Year: 'year',
} as const;

export type RegularPaymentFrequency = (typeof RegularPaymentFrequency)[keyof typeof RegularPaymentFrequency];

export type RegularPaymentFrequencyFilter =
  (typeof RegularPaymentFrequencyFilter)[keyof typeof RegularPaymentFrequencyFilter];
