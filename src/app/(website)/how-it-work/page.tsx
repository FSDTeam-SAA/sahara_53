import { CTA } from '@/components/ReusableSection/content-card'
import { CreateBookHeader } from '@/components/ReusableSection/page-header'
import { HowItWorksSection } from '@/components/website/how-to-work/how-it-works'

export default function page() {
  return (
    <>
     <div className="mt-8">
        <CreateBookHeader
          title="Design Your"
          highlightedWord="Story"
          subtitle="Customize every detail to make it uniquely yours"
        />
      </div>
    <HowItWorksSection/>
    <CTA/>
    </>
  )
}
