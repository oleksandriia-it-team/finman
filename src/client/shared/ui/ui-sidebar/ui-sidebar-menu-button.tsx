'use client';

import * as React from 'react';
import { Slot } from 'radix-ui';

import { cn } from '@frontend/shared/utils/cn.util';
import { useSidebar } from './ui-sidebar-provider';

import './styles/sidebar-menu-button-variants.scss';
import { UiTooltip } from '@frontend/ui/ui-tooltip/ui-tooltip';
import { UiTooltipContent } from '@frontend/ui/ui-tooltip/ui-tooltip-content';
import { UiTooltipTrigger } from '@frontend/ui/ui-tooltip/ui-tooltip-trigger';

export interface UiSidebarMenuButtonProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
  isActive?: boolean;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  tooltip?: string | React.ComponentProps<typeof UiTooltipContent>;
}

export function UiSidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: UiSidebarMenuButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      data-variant={variant}
      className={cn('sidebar-menu-button', className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <UiTooltip>
      <UiTooltipTrigger asChild>{button}</UiTooltipTrigger>
      <UiTooltipContent
        side="right"
        align="center"
        hidden={state !== 'collapsed' || isMobile}
        {...tooltip}
      />
    </UiTooltip>
  );
}
