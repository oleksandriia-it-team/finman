import Link from 'next/link';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';

export interface ChartEmptyAction {
  label: string;
  href: string;
  icon?: string | undefined;
}

interface ChartEmptyStateProps {
  title?: string | undefined;
  description?: string | undefined;
  action?: ChartEmptyAction | undefined;
}

export function ChartEmptyState({ title = 'Дані відсутні', description, action }: ChartEmptyStateProps) {
  return (
    <div className="size-full flex flex-col items-center justify-center gap-3 p-4 text-muted-foreground">
      <UiIconBadge
        isRoundedFull
        variant="primary-muted"
        name="search"
        size="5xl"
      />
      <UiTitle className="text-center">{title}</UiTitle>
      {description && <UiDescription className="text-center">{description}</UiDescription>}
      {action && (
        <UiButton
          asChild
          variant="primary"
          size="sm"
        >
          <Link href={action.href}>
            <UiSvgIcon name={action.icon ?? 'plus'} />
            {action.label}
          </Link>
        </UiButton>
      )}
    </div>
  );
}
