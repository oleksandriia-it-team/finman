import type { ReactNode } from 'react';
import { CardDescription, CardHeader, CardTitle, UiCard } from '@frontend/ui/ui-card/ui-card';
import type { ChartCardTemplateProps } from '@frontend/components/chart-card-template/chart-card-template-props';
import { ChartEmptyState, type ChartEmptyAction } from '@frontend/components/chart-empty-state/chart-empty-state';
import { FinLoaderShort } from '@frontend/components/loader/fin-loader-short';
import { cn } from '@frontend/shared/utils/cn.util';

interface ChartCardStateProps {
  loading?: boolean | undefined;
  isEmpty?: boolean | undefined;
  emptyTitle?: string | undefined;
  emptyDescription?: string | undefined;
  emptyAction?: ChartEmptyAction | undefined;
}

interface ChartCardContentProps extends ChartCardTemplateProps, ChartCardStateProps {}

interface ChartCardProps extends ChartCardStateProps {
  title: string;
  description: string;
  children: ReactNode;
  filterTrigger?: ReactNode | undefined;
}

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

function renderChartContent({
  children,
  loading,
  isEmpty,
  emptyTitle,
  emptyDescription,
  emptyAction,
}: ChartCardContentProps) {
  if (loading) return <FinLoaderShort />;
  if (isEmpty) {
    return (
      <ChartEmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }
  return children;
}

function ChartCardContent({ className, ...rest }: ChartCardContentProps) {
  const classes = cn('size-full', className);
  return <div className={classes}>{renderChartContent(rest)}</div>;
}

export const ChartCardLayout = {
  Root: ChartCardRoot,
  Header: ChartCardHeader,
  Content: ChartCardContent,
};

export function ChartCard({ title, description, filterTrigger, children, ...state }: ChartCardProps) {
  return (
    <ChartCardLayout.Root>
      <ChartCardLayout.Header
        title={title}
        description={description}
      >
        {filterTrigger}
      </ChartCardLayout.Header>
      <ChartCardLayout.Content {...state}>{children}</ChartCardLayout.Content>
    </ChartCardLayout.Root>
  );
}
