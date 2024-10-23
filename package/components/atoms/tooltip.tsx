"use client"

import * as RadixTooltip from "@radix-ui/react-tooltip"
import { cva, VariantProps } from "class-variance-authority"
import { useAtom } from "jotai"
import React from "react"
import { twMerge } from "tailwind-merge"
import { StyleAtom } from "@atoms/states/style-atom"

const tooltipContent = cva([], {
  variants: {
    intent: {
      primary: ["rounded-0.5md", "bg-zinc-700", "font-open-sans", "text-white"],
    },
    size: {
      md: ["px-4", "py-2.5", "text-2xs"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
})

const tooltipArrow = cva([], {
  variants: {
    intent: {
      primary: ["fill-zinc-700"],
    },
    size: {
      md: ["w-4", "h-2"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
})

export interface TooltipProps extends VariantProps<typeof tooltipContent>, RadixTooltip.TooltipProps {
  explainer: React.ReactElement | string
  children: React.ReactElement
  className?: string
  withArrow?: boolean
  side?: "top" | "right" | "bottom" | "left"
}

export function Tooltip({
  children,
  explainer,
  open,
  defaultOpen,
  onOpenChange,
  intent,
  size,
  side = "top",
  className,
  withArrow,
}: TooltipProps) {
  const [styles] = useAtom(StyleAtom)

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} delayDuration={200}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={5}
            className={twMerge(
              tooltipContent({ intent, size, className }),
              `bg-${styles.tooltipBackgroundColor || "zinc-700"} text-${styles.tooltipTextColor || "white"}`
            )}
          >
            {explainer}
            {withArrow ? (
              <RadixTooltip.Arrow
                className={twMerge(
                  tooltipArrow({ intent, size, className }),
                  `fill-${styles.tooltipArrowColor || "zinc-700"}`
                )}
              />
            ) : null}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
