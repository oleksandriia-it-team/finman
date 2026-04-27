'use client';

import { UiResponsiveMenuContent } from '@frontend/ui/ui-responsive-menu/ui-responsive-menu-content';
import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { UiButton } from '@frontend/ui/ui-button/ui-button';

interface IncomeExpenseCardPopoverProps extends ChildrenComponentProps {
  icon?: string;
  title?: string;
  description?: string;
}

export function IncomeExpenseCardActions({ icon, title, description, children }: IncomeExpenseCardPopoverProps) {
  const isMobile = useIsMobile();

  return (
    <UiResponsiveMenuContent className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-2">
        {!isMobile && children}

        {isMobile && (
          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-3 flex-col items-center">
              {!!icon && (
                <UiIconBadge
                  size="xl"
                  isRoundedFull
                  name={icon}
                  variant="default"
                />
              )}

              <div className="flex flex-col gap-1 items-center">
                {!!title && <span className="font-bold text-base text-foreground">{title}</span>}

                {!!description && <span className="text-sm text-muted-foreground">{description}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2">{children}</div>
          </div>
        )}
      </div>

      {isMobile && <UiButton>Скасувати</UiButton>}
    </UiResponsiveMenuContent>
  );
}
