"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { cn } from "@frontend/shared/utils"

import { UiInputGroup } from "@frontend/ui/ui-input-group/ui-input-group"
import { UiInputGroupAddon } from "@frontend/ui/ui-input-group/ui-input-group-addon"
import { UiInputGroupButton } from "@frontend/ui/ui-input-group/ui-input-group-button"
import { UiInputGroupInput } from "@frontend/ui/ui-input-group/ui-input-group-input"

import { UiComboboxTrigger } from "./ui-combobox-trigger"
import { UiComboboxClear } from "./ui-combobox-clear"

export function UiComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <UiInputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<UiInputGroupInput disabled={disabled} />}
        {...props}
      />
      <UiInputGroupAddon align="inline-end">
        {showTrigger && (
          <UiInputGroupButton
            size="icon-xs"
            variant="ghost"
            asChild
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          >
            <UiComboboxTrigger />
          </UiInputGroupButton>
        )}
        {showClear && <UiComboboxClear disabled={disabled} />}
      </UiInputGroupAddon>
      {children}
    </UiInputGroup>
  )
}
