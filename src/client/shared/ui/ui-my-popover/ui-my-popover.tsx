import { cn } from '@frontend/shared/utils/cn.util';

function UiMyPopoverWrapper({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col gap-3 size-full items-center justify-center', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function UiMyPopoverHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col gap-3 items-center justify-center', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function UiMyPopoverTitle({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-2xl font-bold text-foreground', className)}
      {...props}
    >
      {children}
    </p>
  );
}

function UiMyPopoverDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-muted', className)}
      {...props}
    >
      {children}
    </p>
  );
}

function UiMyPopoverActions({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col gap-1 w-full', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function UiMyPopoverFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export const UiMyPopover = {
  Wrapper: UiMyPopoverWrapper,
  Header: UiMyPopoverHeader,
  Title: UiMyPopoverTitle,
  Description: UiMyPopoverDescription,
  Actions: UiMyPopoverActions,
  Footer: UiMyPopoverFooter,
};
