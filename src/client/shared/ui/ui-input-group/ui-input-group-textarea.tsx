"use client"

import * as React from "react"
import { cn } from "@frontend/shared/utils"
import { UiTextarea } from "@frontend/ui/ui-textarea/ui-textarea"

export function UiInputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <UiTextarea
      data-slot="input-group-control"
      className={cn(
        "input-group-control input-group-textarea",
        className
      )}
      {...props}
    />
  )
}
