export type UiStatusBadgeVariant = 'success' | 'destructive' | 'warning' | 'orange' | 'teal' | 'neutral';

export interface UiStatusBadgeProps {
  label: string;
  variant?: UiStatusBadgeVariant;
  className?: string;
}
