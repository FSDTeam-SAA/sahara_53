import type React from "react"
import { cn } from "@/lib/utils"
import { Check, Clock, X, AlertCircle } from "lucide-react"

type StatusType =
  | "Succeeded"
  | "Pending"
  | "Failed"
  | "Paid"
  | "Cancelled"
  | "Delivered"
  | "In Progress"
  | "active"
  | "inactive"
  | "suspended"
  | "Completed"
  | "Draft"
  |string

interface StatusBadgeProps {
  status: StatusType
  showIcon?: boolean
}

const statusConfig: Record<
  StatusType,
  {
    bg: string
    text: string
    icon: React.ComponentType<{ className?: string }> | null
    border?: string
  }
> = {
  Succeeded: { bg: "bg-transparent", text: "text-green-600", icon: Check },
  Paid: { bg: "bg-transparent", text: "text-green-600", icon: Check },
  Delivered: { bg: "bg-transparent", text: "text-green-600", icon: Check },
  Completed: { bg: "bg-green-50", text: "text-green-600", icon: Check, border: "border border-green-200" },
  active: { bg: "bg-green-50", text: "text-green-600", icon: Check, border: "border border-green-200" },
  Pending: { bg: "bg-transparent", text: "text-yellow-600", icon: Clock },
  "In Progress": { bg: "bg-transparent", text: "text-yellow-600", icon: Clock },
  inactive: { bg: "bg-yellow-50", text: "text-yellow-600", icon: Clock, border: "border border-yellow-200" },
  Draft: { bg: "bg-gray-50", text: "text-gray-600", icon: AlertCircle, border: "border border-gray-200" },
  Failed: { bg: "bg-transparent", text: "text-red-600", icon: X },
  Cancelled: { bg: "bg-transparent", text: "text-red-600", icon: X },
  suspended: { bg: "bg-red-50", text: "text-red-600", icon: X, border: "border border-red-200" },
}

export function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.Pending
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
        config.bg,
        config.text,
        config.border,
      )}
    >
      {showIcon && Icon && <Icon className="h-3 w-3" />}
      {status}
    </span>
  )
}
