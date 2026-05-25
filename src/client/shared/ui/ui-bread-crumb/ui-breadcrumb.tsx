import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

function UiBreadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      {...props}
    />
  );
}

function UiBreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5',
        className,
      )}
      {...props}
    />
  );
}

function UiBreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  );
}

function UiBreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : 'a';

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn('transition-colors hover:text-foreground', className)}
      {...props}
    />
  );
}

function UiBreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn('font-normal text-foreground', className)}
      {...props}
    />
  );
}

function UiBreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? (
        <UiSvgIcon
          name={'chevron-right'}
          size="xs"
        />
      )}
    </li>
  );
}

function UiBreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      aria-hidden="true"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <UiSvgIcon
        name="three-dots"
        size="sm"
      />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  UiBreadcrumb,
  UiBreadcrumbList,
  UiBreadcrumbItem,
  UiBreadcrumbLink,
  UiBreadcrumbPage,
  UiBreadcrumbSeparator,
  UiBreadcrumbEllipsis,
};
