import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GradientIconPanelProps {
  gradientClass: string
  children: ReactNode
  className?: string
}

export function GradientIconPanel({ gradientClass, children, className }: GradientIconPanelProps) {
  return (
    <div className={cn("flex items-center justify-center rounded-2xl h-full min-h-[180px]", gradientClass, className)}>
      {children}
    </div>
  )
}
