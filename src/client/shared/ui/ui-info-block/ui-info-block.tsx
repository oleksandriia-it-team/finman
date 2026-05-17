import { cn } from '@frontend/shared/utils/cn.util';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { UiTitle } from '../ui-text/ui-title';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import type { UiInfoBlockProps } from '@frontend/ui/ui-info-block/ui-info-block-props';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';

export function UiInfoBlock({
  title,
  description,
  className,
  iconClassName,
  bgClassName,
  onClick,
  size = 'default',
  category,
  icon,
  isIconRoundedFull = false,
}: UiInfoBlockProps) {
  const categoryStyles = category ? CategoriesMapping[category] : null;

  const commonClassName = cn(
    'flex flex-row items-center gap-3 p-3 rounded-xl transition-all duration-200',
    bgClassName,
    onClick && 'cursor-pointer hover:opacity-80 active:scale-[0.98]',
    className,
  );

  const content = (
    <>
      <UiIconBadge
        name={categoryStyles?.icon ?? icon ?? ''}
        title={categoryStyles?.label ?? title ?? ''}
        isReversed
        variant={categoryStyles?.variant ?? 'primary'}
        size={size}
        className={cn('shrink-0', iconClassName || 'bg-muted/20')}
        isRoundedFull={isIconRoundedFull}
      />
      <div className="flex flex-col min-w-0 overflow-hidden">
        <UiTitle
          size="lg"
          className="truncate"
        >
          {title}
        </UiTitle>
        <UiDescription
          className="truncate"
          size="default"
        >
          {description}
        </UiDescription>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={commonClassName}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  return <div className={commonClassName}>{content}</div>;
}
