"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"

export function UiComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}
