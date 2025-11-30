import type React from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  gradientFrom: string
  gradientTo: string
}

const FeaturesCard = ({ icon, title, description, gradientFrom, gradientTo }: FeatureCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-lg">
      <p
        className="mb-2 flex items-center justify-center  w-14 h-14  rounded-lg p-3 text-white"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        
        <Image src={icon} alt="icon" width={28} height={28} className=" object-cover" />
      </p>

      <h3 className="mb-1 text-lg font-semibold text-foreground font-serif">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  )
}

export default FeaturesCard
