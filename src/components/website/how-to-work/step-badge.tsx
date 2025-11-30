import { cn } from "@/lib/utils"

interface StepBadgeProps {
  number: number
  colorClass?: string
}

export function StepBadge({ number, colorClass = "bg-emerald-500" }: StepBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-sm font-semibold",
        colorClass,
      )}
    >
      {number}
    </span>
  )
}
