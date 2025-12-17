import { StepBadge } from "./step-badge"
import { GradientIconPanel } from "./gradient-icon-panel"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface StepCardProps {
  stepNumber: number
  title: string
  description: string
  icon: ReactNode
  badgeColor: string
  titleGradient: string
  panelGradient: string
  reversed?: boolean
}

export function StepCard({
  stepNumber,
  title,
  description,
  icon,
  badgeColor,
  titleGradient,
  panelGradient,
  reversed = false,
}: StepCardProps) {
  const contentSection = (
    <div className="flex flex-col justify-center p-6 md:p-8">
      <div className="flex items-center gap-3 mb-3">
        <StepBadge number={stepNumber} colorClass={panelGradient} />
        <h3 className={cn("text-xl md:text-2xl font-bold bg-clip-text text-transparent", titleGradient)}>{title}</h3>
      </div>
      <p className="text-gray-600 text-sm md:text-base leading-relaxed">{description}</p>
    </div>
  )

  const iconSection = <GradientIconPanel gradientClass={panelGradient}>{icon}</GradientIconPanel>

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {reversed ? (
          <>
            {iconSection}
            {contentSection}
          </>
        ) : (
          <>
            {contentSection}
            {iconSection}
          </>
        )}
      </div>
    </div>
  )
}
