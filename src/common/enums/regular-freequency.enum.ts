export const RegularPaymentFrequency = {
  Daily: 'daily',
  Weekly: 'weekly',
  Monthly: 'monthly',
  Yearly: 'yearly',
} as const;

export type RegularPaymentFrequency = (typeof RegularPaymentFrequency)[keyof typeof RegularPaymentFrequency];
