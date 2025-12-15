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
    <Card className="group relative overflow-hidden border-border/50 bg-card p-6 transition-all  duration-300 hover:border-border hover:shadow-lg">
      <p
        className=" flex items-center justify-center  w-14 h-14  rounded-lg  text-white"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        
        <Image src={icon} alt="icon" width={28} height={28} className=" object-cover" />
      </p>
     
      <div>

      <h3 className=" text-2xl font-semibold text-foreground font-serif mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Card>
  )
}

export default FeaturesCard
