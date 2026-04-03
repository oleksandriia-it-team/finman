"use client"

import * as React from "react"
import { cn } from "@frontend/shared/utils"
import { UiButton } from "@frontend/ui/ui-button/ui-button"
import { ButtonProps } from "@frontend/ui/ui-button/props/button.props"

export interface InputGroupButtonProps extends Omit<ButtonProps, "size"> {
  size?: "xs" | "sm" | "icon-xs" | "icon-sm"
}

export function UiInputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: InputGroupButtonProps) {
  return (
    <UiButton
      type={type}
      data-size={size}
      variant={variant}
      className={cn("input-group-button", className)}
      {...props}
    />
  )
}
