'use client';

import { UiMyPopover } from '@frontend/ui/ui-my-popover/ui-my-popover';
import { UiResponsiveMenuContent } from '@frontend/ui/ui-responsive-menu/ui-responsive-menu-content';
import { UiSvgIconContainer } from '@frontend/ui/ui-svg-icon/ui-svg-icon-container';
import { UiInfoBlock } from '@frontend/ui/ui-info-block/ui-info-block';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiConfirmModal } from '@frontend/components/confirm-modal/fin-confirm-modal';
import type { ColorVariantModel } from '@frontend/shared/models/color-variant.model';
import type { SizeVariantModel } from '@frontend/shared/models/size-variant.model';

interface IncomeExpenseCardAction {
  title?: string;
  description?: string;
  icon?: string;
  variant?: ColorVariantModel;
  onClick: () => void;
  confirm?: {
    title?: string;
    description?: string;
  };
  bgClassName?: string;
}

interface IncomeExpenseCardPopoverProps {
  icon?: string;
  title?: string;
  description?: string;
  actions?: IncomeExpenseCardAction[];
  onCancel?: () => void;
  iconSize?: SizeVariantModel;
  iconColor?: string;
}

function PopoverAction({ action }: { action: IncomeExpenseCardAction }) {
  const infoBlock = (
    <UiInfoBlock
      size="xl"
      name={action.icon ?? ''}
      title={action.title ?? ''}
      description={action.description}
      bgClassName={action.bgClassName}
      className="w-full rounded-4xl"
      iconClassName={action.bgClassName}
      onClick={action.confirm ? undefined : action.onClick}
    />
  );

  if (action.confirm) {
    return (
      <UiConfirmModal
        onConfirm={action.onClick}
        title={action.confirm.title ?? ''}
        description={action.confirm.description ?? ''}
        confirmVariant={action.variant === 'destructive' ? 'destructive' : 'primary'}
        trigger={infoBlock}
      />
    );
  }

  return infoBlock;
}

export function IncomeExpenseCardPopover({
  icon,
  title,
  description,
  actions = [],
  onCancel,
  iconSize = 'default',
  iconColor,
}: IncomeExpenseCardPopoverProps) {
  return (
    <UiResponsiveMenuContent className="size-full rounded-4xl">
      <UiMyPopover.Wrapper>
        <UiMyPopover.Header>
          {icon && (
            <UiSvgIconContainer
              className="rounded-full w-fit"
              name={icon}
              size={iconSize}
              style={{ color: iconColor }}
            />
          )}
          {title && <UiMyPopover.Title>{title}</UiMyPopover.Title>}
          {description && <UiMyPopover.Description>{description}</UiMyPopover.Description>}
        </UiMyPopover.Header>

        {actions.length > 0 && (
          <UiMyPopover.Actions>
            {actions.map((action, index) => (
              <PopoverAction
                key={index}
                action={action}
              />
            ))}
          </UiMyPopover.Actions>
        )}

        <UiMyPopover.Footer className="w-full">
          <UiButton
            variant="muted"
            isOutlined
            size="lg"
            isRoundedFull
            className="w-full"
            onClick={onCancel}
          >
            Скасувати
          </UiButton>
        </UiMyPopover.Footer>
      </UiMyPopover.Wrapper>
    </UiResponsiveMenuContent>
  );
}
