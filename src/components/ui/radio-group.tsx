import * as React from "react"
import { RadioGroup } from "@base-ui/react/radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroupRoot({ className, ...props }: RadioGroup.Root.Props) {
  return (
    <RadioGroup.Root
      data-slot="radio-group"
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioGroup.Item.Props) {
  return (
    <RadioGroup.Item
      data-slot="radio-group-item"
      className={cn(
        "border-primary text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 aspect-square h-4 w-4 rounded-full border bg-transparent shadow-xs transition-[color,box-shadow] focus-visible:ring-[3px] aria-invalid:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 outline-none",
        className
      )}
      {...props}
    >
      <RadioGroup.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroup.Indicator>
    </RadioGroup.Item>
  )
}

export { RadioGroupRoot as RadioGroup, RadioGroupItem }
