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

export const TransactionPriorityLabel = {
  Critical: 'Критичний',
  Urgent: 'Невідкладний',
  VeryHigh: 'Дуже високий',
  High: 'Високий',
  Elevated: 'Підвищений',
  Medium: 'Середній',
  Moderate: 'Помірний',
  Low: 'Низький',
  Background: 'Фоновий',
  Minimal: 'Мінімальний',
} as const;

export const PriorityOptions = Object.entries(TransactionPriority).map(([key, value]) => ({
  label: TransactionPriorityLabel[key as keyof typeof TransactionPriorityLabel],
  value,
}));
