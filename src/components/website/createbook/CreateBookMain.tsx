import { Button } from "@/components/ui/button";
import CreateBookStep from "./CreateBookStep";
import { Card } from "@/components/ui/card";
import { CreateBookHeader } from "@/components/ReusableSection/page-header";
import { ReactNode } from "react";

interface createbookmainprops {
  children: ReactNode;
  step: number;
  next: () => void;
  back: () => void;
  handelcall: () => void;
  isNextDisabled?: boolean;
  isLoading?: boolean;
}

const CreateBookMain = ({
  children,
  step,
  next,
  back,
  handelcall,
  isNextDisabled,
  isLoading,
}: createbookmainprops) => {
  // console.log('step',step,next,back)
  return (
    <section className="space-y-10 ">
      <CreateBookHeader
        title="Create Your"
        highlightedWord="Book"
        subtitle="Turn your memories into magical storybooks in just 4 easy steps"
      />

      <CreateBookStep step={step} />

      <Card className="my-6 max-w-6xl mx-auto px-5 py-8 ">
        {children}

        {step !== 4 && !isLoading ? (
          <div className="grid grid-cols-2 gap-10 mt-10">
            <Button
              variant="outline"
              className="border-red-400 cursor-pointer py-6"
              onClick={back}
              disabled={step === 0}
            >
              Back
            </Button>

            <Button
              className="bg-linear-to-r cursor-pointer from-[#FF7CE5] to-[#5D5FEF] text-white py-6"
              disabled={isNextDisabled}
              onClick={step == 2 || step == 3 ? handelcall : next}
            >
              {step == 3 ? "Generate Book" : "Next Step"}
            </Button>
          </div>
        ) : null}
      </Card>
    </section>
  );
};

export default CreateBookMain;
