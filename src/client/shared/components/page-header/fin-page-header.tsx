import {
  UiBreadcrumb,
  UiBreadcrumbItem,
  UiBreadcrumbLink,
  UiBreadcrumbList,
  UiBreadcrumbPage,
  UiBreadcrumbSeparator,
} from '@frontend/ui/ui-bread-crumb/ui-breadcrumb';
import { Fragment } from 'react';
import type { FinPageHeaderProps } from '@frontend/components/page-header/props/fin-page-header.props';

export function FinPageHeader({ breadcrumbs, actions }: FinPageHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-background border-b border-border w-full shrink-0">
      <UiBreadcrumb>
        <UiBreadcrumbList>
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <Fragment key={item.label}>
                <UiBreadcrumbItem>
                  {isLast ? (
                    <UiBreadcrumbPage>{item.label}</UiBreadcrumbPage>
                  ) : item.href ? (
                    <UiBreadcrumbLink href={item.href}>{item.label}</UiBreadcrumbLink>
                  ) : (
                    <UiBreadcrumbPage>{item.label}</UiBreadcrumbPage>
                  )}
                </UiBreadcrumbItem>
                {!isLast && <UiBreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </UiBreadcrumbList>
      </UiBreadcrumb>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
