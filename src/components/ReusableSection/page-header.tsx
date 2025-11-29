import { cn } from "@/lib/utils"

interface CreateBookHeaderProps {
  title?: string
  highlightedWord?: string
  subtitle?: string
  className?: string
}

export function CreateBookHeader({
  title = "Create Your",
  highlightedWord = "Book",
  subtitle = "Turn your memories into magical storybooks in just 6 easy steps",
  className,
}: CreateBookHeaderProps) {
  return (
    <section
      className={cn("relative w-full overflow-hidden px-4 py-12 md:py-16 rounded-2xl", className)}
      style={{
        background: "linear-gradient(90deg, #f5e6f0 0%, #f0e8f2 25%, #eaebf4 50%, #e8ecf5 75%, #e5eef6 100%)",
      }}
    >
      {/* Decorative sparkles/stars */}
      <Sparkle className="absolute top-4 left-[15%] h-1.5 w-1.5 opacity-40" />
      <Sparkle className="absolute top-8 right-[20%] h-1 w-1 opacity-30" />
      <Sparkle className="absolute top-6 right-[35%] h-1.5 w-1.5 opacity-25" />
      <Sparkle className="absolute bottom-6 left-[25%] h-1 w-1 opacity-35" />
      <Sparkle className="absolute bottom-4 right-[15%] h-1.5 w-1.5 opacity-30" />
      <Sparkle className="absolute top-1/2 left-[8%] h-1 w-1 opacity-20" />
      <Sparkle className="absolute top-1/3 right-[8%] h-1 w-1 opacity-25" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          {title} <span className="text-violet-600">{highlightedWord}</span>
        </h2>
        <p className="max-w-md text-sm text-gray-600 md:text-base">{subtitle}</p>
      </div>
    </section>
  )
}

function Sparkle({ className }: { className?: string }) {
  return <div className={cn("rounded-full bg-gray-400", className)} />
}
