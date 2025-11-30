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
    description: "Start by sharing a memory or the beginning of your story. Choose your preferred language and genre.",
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
      "Upload a photo and watch as AI transforms it into a beautiful cartoon character that becomes the star of your story!",
    iconName: "camera",
    badgeColor: "bg-pink-500",
    titleGradient: "bg-gradient-to-r from-pink-500 to-purple-500",
    panelGradient: "bg-gradient-to-r from-purple-500 to-pink-400",
    reversed: true,
  },
  {
    stepNumber: 3,
    title: "AI Creates Your Book",
    description:
      "Our AI writes a complete story with 8-10 chapters, each beautifully illustrated with your cartoon character in stunning scenes.",
    iconName: "wand",
    badgeColor: "bg-emerald-500",
    titleGradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
    panelGradient: "bg-gradient-to-r from-blue-500 to-purple-500",
    reversed: false,
  },
  {
    stepNumber: 4,
    title: "Review & Edit",
    description:
      "Record a voice sample so AI can create personalized narration for your entire audiobook in your own voice!",
    iconName: "microphone",
    badgeColor: "bg-emerald-500",
    titleGradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
    panelGradient: "bg-gradient-to-r from-cyan-400 to-blue-500",
    reversed: true,
  },
  {
    stepNumber: 5,
    title: "AI Creates Your Book",
    description:
      "Our AI writes a complete story with 8-10 chapters, each beautifully illustrated with your cartoon character in stunning scenes.",
    iconName: "pencil",
    badgeColor: "bg-emerald-500",
    titleGradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
    panelGradient: "bg-gradient-to-r from-teal-400 to-emerald-400",
    reversed: false,
  },
  {
    stepNumber: 6,
    title: "Order Your Book",
    description:
      "Record a voice sample so AI can create personalized narration for your entire audiobook in your own voice!",
    iconName: "cart",
    badgeColor: "bg-emerald-500",
    titleGradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
    panelGradient: "bg-gradient-to-r from-lime-400 to-yellow-400",
    reversed: true,
  },
]

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
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 w-auto">
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
