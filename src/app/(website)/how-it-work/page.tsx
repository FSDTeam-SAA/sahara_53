import { CTA } from '@/components/ReusableSection/content-card'
import { CreateBookHeader } from '@/components/ReusableSection/page-header'
import { HowItWorksSection } from '@/components/website/how-to-work/how-it-works'

export default function page() {
  return (
    <>
     <div className="m-8 ">
        <CreateBookHeader
          title="How It "
          highlightedWord="Works"
          subtitle="Turn your memories into magical storybooks in just 6 easy steps"
        />
      </div>
    <HowItWorksSection/>
      <div className="m-8">
      <CTA/>
    </div>
    </>
  )
}
