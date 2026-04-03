"use client"

import * as React from "react"
import { cn } from "@frontend/shared/utils"

import './styles/input-group-styles.scss'

export function UiInputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "input-group group/input-group",
        className
      )}
      {...props}
    />
  )
}
