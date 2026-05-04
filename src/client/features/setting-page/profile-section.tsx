import { cn } from '@frontend/shared/utils/cn.util';
import { type ReactNode } from 'react';
import { CardContent, CardTitle, UiCard } from '@frontend/ui/ui-card/ui-card';

interface ProfileSectionProps {
  title: string;
  children: ReactNode;
  className?: string | undefined;
}

export function ProfileSection({ title, children, className }: ProfileSectionProps) {
  return (
    <UiCard className={cn('gap-5 rounded-lg border border-border p-5 py-5', className)}>
      <CardTitle className="text-base">{title}</CardTitle>
      <CardContent className="space-y-4 px-0">{children}</CardContent>
    </UiCard>
  );
}
