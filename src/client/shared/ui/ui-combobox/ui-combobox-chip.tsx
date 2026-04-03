"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { XIcon } from "lucide-react"
import { cn } from "@frontend/shared/utils"
import { UiButton } from "@frontend/ui/ui-button/ui-button"

export function UiComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "combobox-chip",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<UiButton variant="ghost" size="icon-xs" />}
          className="combobox-chip-remove"
          data-slot="combobox-chip-remove"
        >
          <XIcon />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}
