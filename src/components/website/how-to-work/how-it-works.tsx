import type React from "react"
import { StepCard } from "./step-card"
import {
  SparkleIcon,
  CameraIcon,
  MagicWandIcon,
  MicrophoneIcon,
  EditPencilIcon,
  ShoppingCartIcon,
} from "./icons/step-icons"

interface StepData {
  stepNumber: number
  title: string
  description: string
  iconName: string
  badgeColor: string
  titleGradient: string
  panelGradient: string
  reversed: boolean
}

const steps: StepData[] = [
  {
    stepNumber: 1,
    title: "Share Your Story",
    description:
      "Start by telling us a memory or the beginning of your story. Pick your language, genre, and overall vibe.",
    iconName: "sparkle",
    badgeColor: "bg-emerald-500",
    titleGradient: "bg-gradient-to-r from-orange-500 to-pink-500",
    panelGradient: "bg-gradient-to-r from-orange-400 to-pink-500",
    reversed: false,
  },
  {
    stepNumber: 2,
    title: "Add Your Face (Optional)",
    description:
      "Upload a photo and let AI turn you into a beautiful cartoon character who becomes the star of your story.",
    iconName: "camera",
    badgeColor: "bg-pink-500",
    titleGradient: "bg-gradient-to-r from-pink-500 to-purple-500",
    panelGradient: "bg-gradient-to-r from-purple-500 to-pink-400",
    reversed: true,
  },
  {
    stepNumber: 3,
    title: "AI Writes Your Story",
    description:
      "Our AI creates a complete storyline with 3–8 engaging chapters tailored to your prompt and character.",
    iconName: "wand",
    badgeColor: "bg-emerald-500",
    titleGradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
    panelGradient: "bg-gradient-to-r from-blue-500 to-purple-500",
    reversed: false,
  },
  {
    stepNumber: 4,
    title: "Add Your Voice (Optional)",
    description:
      "Record a quick voice sample, and AI will create a natural audiobook narration that sounds just like you.",
    iconName: "microphone",
    badgeColor: "bg-emerald-500",
    titleGradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
    panelGradient: "bg-gradient-to-r from-cyan-400 to-blue-500",
    reversed: true,
  },
  {
    stepNumber: 5,
    title: "Customize Your Book",
    description:
      "Edit text, reorder chapters, adjust illustrations, and personalize your book until it's perfect.",
    iconName: "pencil",
    badgeColor: "bg-emerald-500",
    titleGradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
    panelGradient: "bg-gradient-to-r from-teal-400 to-emerald-400",
    reversed: false,
  },
  {
    stepNumber: 6,
    title: "Order Your Printed Book",
    description:
      "Choose your book size, paper type, and finish. Place your order and get your custom story delivered to your doorstep.",
    iconName: "cart",
    badgeColor: "bg-emerald-500",
    titleGradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
    panelGradient: "bg-gradient-to-r from-lime-400 to-yellow-400",
    reversed: true,
  },
];


const iconMap: Record<string, React.ReactNode> = {
  sparkle: <SparkleIcon className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />,
  camera: <CameraIcon className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />,
  wand: <MagicWandIcon className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />,
  microphone: <MicrophoneIcon className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />,
  pencil: <EditPencilIcon className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />,
  cart: <ShoppingCartIcon className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />,
}

export function HowItWorksSection() {
  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className=" w-[95%] lg:max-w-[80%] mx-auto space-y-4 sm:space-y-5 md:space-y-6 ">
        {steps.map((step) => (
          <StepCard
            key={step.stepNumber}
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
            badgeColor={step.badgeColor}
            titleGradient={step.titleGradient}
            panelGradient={step.panelGradient}
            reversed={step.reversed}
            icon={iconMap[step.iconName]}
          />
        ))}
      </div>
    </section>
  )
}
