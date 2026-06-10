import { CardDescription, CardHeader, CardTitle, UiCard } from '@frontend/ui/ui-card/ui-card';
import type { ChartCardTemplateProps } from '@frontend/components/chart-card-template/chart-card-template-props';
import { cn } from '@frontend/shared/utils/cn.util';

function ChartCardRoot({ children, className }: ChartCardTemplateProps) {
  return <UiCard className={className}>{children}</UiCard>;
}

function ChartCardHeader({ title, children, description, className }: ChartCardTemplateProps) {
  const classes = cn('flex flex-row! justify-between', className);

  return (
    <CardHeader>
      <div className={classes}>
        <div className="flex flex-col gap-2">
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex flex-col gap-2">{children}</div>
      </div>
    </CardHeader>
  );
}

function ChartCardContent({ children, className }: ChartCardTemplateProps) {
  const classes = cn('size-full', className);
  return <div className={classes}>{children}</div>;
}

export const ChartCardLayout = {
  Root: ChartCardRoot,
  Header: ChartCardHeader,
  Content: ChartCardContent,
};
