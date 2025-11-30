import { CreateBookHeader } from "@/components/ReusableSection/page-header";
import React, { ReactNode } from "react";
import CreateBookStep from "./CreateBookStep";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CreateBookInterface {
  children: ReactNode;
}

const CreateBookMain = ({ children }: CreateBookInterface) => {
  return (
    <section className="space-y-10">
      {/* Header */}
      <CreateBookHeader
        title="Create Your"
        highlightedWord="Book"
        subtitle="Turn your memories into magical storybooks in just 4 easy steps"
      />

      {/* Steps */}
      <CreateBookStep step={0} />

      {/* Page Content */}
      <Card className="my-6  max-w-3xl mx-auto px-5 py-8">
        {children}

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-10 justify-between mt-10">
          <Button variant="outline" className=" border-red-400 cursor-pointer ">Back</Button>
          <Button className="bg-gradient-to-r cursor-pointer from-[#FF7CE5] to-[#5D5FEF] text-white">
            Next Step
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default CreateBookMain;
