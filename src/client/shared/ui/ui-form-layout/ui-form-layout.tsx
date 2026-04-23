import { cn } from '@frontend/shared/utils/cn.util';

function FormLayout({ className, children, ...props }: React.HTMLAttributes<HTMLFormElement>) {
  return (
    <form
      noValidate
      className={cn('p-4 h-full overflow-y-auto flex flex-col gap-6', className)}
      {...props}
    >
      {children}
    </form>
  );
}

function FormHeader({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1 mb-2', className)}>{children}</div>;
}

function FormTitle({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-2xl font-bold text-foreground', className)}>{children}</h2>;
}

function FormDescription({ className, children }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted', className)}>{children}</p>;
}

function FormSection({ label, className, children }: React.HTMLAttributes<HTMLDivElement> & { label?: string }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && <span className="text-sm font-medium text-foreground">{label}</span>}
      {children}
    </div>
  );
}

function FormGrid({ cols = 2, className, children }: React.HTMLAttributes<HTMLDivElement> & { cols?: number }) {
  return (
    <div
      className={cn('grid gap-4', className)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}

function FormActions({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('grid grid-cols-2 gap-4 mt-4', className)}>{children}</div>;
}

export const UiFormLayout = {
  Root: FormLayout,
  Header: FormHeader,
  Title: FormTitle,
  Description: FormDescription,
  Section: FormSection,
  Grid: FormGrid,
  Actions: FormActions,
};
