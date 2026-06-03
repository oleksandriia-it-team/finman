export const TransactionPriority = {
  Critical: 10,
  Urgent: 9,
  VeryHigh: 8,
  High: 7,
  Elevated: 6,
  Medium: 5,
  Moderate: 4,
  Low: 3,
  Background: 2,
  Minimal: 1,
} as const;

/** Translation keys under the `priority.*` namespace. */
export const TransactionPriorityLabelKeys = {
  Critical: 'critical',
  Urgent: 'urgent',
  VeryHigh: 'veryHigh',
  High: 'high',
  Elevated: 'elevated',
  Medium: 'medium',
  Moderate: 'moderate',
  Low: 'low',
  Background: 'background',
  Minimal: 'minimal',
} as const;
