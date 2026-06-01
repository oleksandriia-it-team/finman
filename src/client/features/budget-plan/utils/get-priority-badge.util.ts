import { TransactionPriority, TransactionPriorityLabel } from '@common/enums/priority.enum';
import type { UiStatusBadgeVariant } from '@frontend/ui/ui-status-badge/props/ui-status-badge.props';

type PriorityBadge = { label: string; variant: UiStatusBadgeVariant };

const priorityValueToKey = Object.fromEntries(
  Object.entries(TransactionPriority).map(([key, value]) => [value, key]),
) as Record<number, keyof typeof TransactionPriorityLabel>;

function getPriorityVariant(priority: number): UiStatusBadgeVariant {
  if (priority <= 2) return 'success';
  if (priority <= 4) return 'teal';
  if (priority <= 6) return 'warning';
  if (priority <= 8) return 'orange';
  return 'destructive';
}

export function getPriorityBadge(priority: number): PriorityBadge {
  const key = priorityValueToKey[priority];
  const label = key ? TransactionPriorityLabel[key] : String(priority);
  return { label, variant: getPriorityVariant(priority) };
}
