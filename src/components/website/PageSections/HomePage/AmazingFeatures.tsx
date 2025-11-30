"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import FeaturesCard from "../../Common/FeaturesCard";
import SectionHeader from "../../Common/SectionHeader";

const featuresData = [
  {
    id: 1,
    icon: "/icon/world.svg",
    title: "AI Narration",
    description:
      "Your voice, narrating the entire story using advanced AI technology",
    gradientFrom: "#a855f7",
    gradientTo: "#ec4899",
  },
  {
    id: 2,
    icon: "/icon/book.svg",
    title: "Smart Editing",
    description:
      "Intelligent suggestions and auto-corrections to polish your stories",
    gradientFrom: "#3b82f6",
    gradientTo: "#06b6d4",
  },
  {
    id: 3,
    icon: "/icon/camera.svg",
    title: "Creative Tools",
    description: "Powerful editors and tools to bring your imagination to life",
    gradientFrom: "#f59e0b",
    gradientTo: "#f97316",
  },
  {
    id: 4,
    icon: "/icon/voice.svg",
    title: "Story Library",
    description:
      "Access thousands of stories and curated collections from around the world",
    gradientFrom: "#10b981",
    gradientTo: "#14b8a6",
  },
  {
    id: 5,
    icon: "/icon/edit.svg",
    title: "Community",
    description: "Share your stories and connect with readers and writers",
    gradientFrom: "#8b5cf6",
    gradientTo: "#6366f1",
  },
  {
    id: 6,
    icon: "/icon/heart.svg",
    title: "Premium Features",
    description:
      "Unlock exclusive features and early access to new storytelling tools",
    gradientFrom: "#ef4444",
    gradientTo: "#f97316",
  },
];

const AmazingFeatures = () => {
  const [showMore, setShowMore] = useState(false);

  const displayedFeatures = showMore ? featuresData : featuresData.slice(0, 6);

  return (
    <section className="w-full bg-background py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <SectionHeader
            title1="Amazing"
            title2=" Features"
            dis="Everything you need to create the perfect storybook"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedFeatures.map((feature) => (
            <FeaturesCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradientFrom={feature.gradientFrom}
              gradientTo={feature.gradientTo}
            />
          ))}
        </div>

        {/* {!showMore && (
          <div className="mt-12 flex justify-center">
            <Button
              onClick={() => setShowMore(true)}
              variant="outline"
              size="lg"
              className="border-border/50"
            >
              See More Features
            </Button>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default AmazingFeatures;
