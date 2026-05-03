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
  category = 'expense-misc',
  isIconRoundedFull = false,
}: UiInfoBlockProps) {
  const { variant, icon, label } = CategoriesMapping[category];

  const isClickable = !!onClick;
  return (
    <div
      className={cn(
        'flex flex-row items-center gap-3 p-3 rounded-xl transition-all duration-200',
        bgClassName,
        isClickable && 'cursor-pointer hover:opacity-80 active:scale-[0.98]',
        className,
      )}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <UiIconBadge
        name={icon}
        title={label}
        isReversed
        variant={variant}
        size={size}
        className={cn('shrink-0', iconClassName || 'bg-muted/20')}
        isRoundedFull={isIconRoundedFull}
      />
      <div className="flex flex-col">
        <UiTitle size="lg">{title}</UiTitle>
        <UiDescription size="default">{description}</UiDescription>
      </div>
    </div>
  );
}
