import { cn } from '@frontend/shared/utils/cn.util';
import { CardContent, CardTitle, UiCard } from '@frontend/ui/ui-card/ui-card';
import type { ProfileSectionProps } from '@frontend/features/user-settings/props/profile-section.props';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';

export function ProfileSection({ title, children, icon, className }: ProfileSectionProps) {
  return (
    <UiCard className={cn('flex rounded-lg border border-border p-5', className)}>
      {!!icon && (
        <UiIconBadge
          name={icon}
          variant="primary-muted"
        />
      )}
      <div className="flex flex-col gap-1">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardContent className="space-y-4 px-0">{children}</CardContent>
      </div>
    </UiCard>
  );
}
