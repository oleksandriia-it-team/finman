"use client"

import * as React from "react"
import { cn } from "@frontend/shared/utils"
import { UiInput } from "@frontend/ui/ui-input/ui-input"

export function UiInputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <UiInput
      data-slot="input-group-control"
      className={cn(
        "input-group-control",
        className
      )}
      {...props}
    />
  )
}
