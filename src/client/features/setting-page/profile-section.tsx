import { cn } from '@frontend/shared/utils/cn.util';
import { type ReactNode } from 'react';

interface ProfileSectionProps {
  title: string;
  children: ReactNode;
  className?: string | undefined;
}

export function ProfileSection({ title, children, className }: ProfileSectionProps) {
  return (
    <section className={cn('rounded-lg border border-border bg-background p-5 shadow-sm', className)}>
      <h2 className="mb-5 text-base font-semibold text-foreground">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
