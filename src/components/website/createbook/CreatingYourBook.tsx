"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  BookOpen,
  Sparkles,
  PenTool,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  Music,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CreatingYourBookProps {
  mode?: "book" | "voice";
}

const CreatingYourBook: React.FC<CreatingYourBookProps> = ({
  mode = "book",
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const bookSteps = [
    { id: 1, title: "Crafting your story", icon: PenTool, duration: 2000 },
    { id: 2, title: "Creating chapters", icon: BookOpen, duration: 2500 },
    { id: 3, title: "Designing characters", icon: Sparkles, duration: 3000 },
    {
      id: 4,
      title: "Generating illustrations",
      icon: ImageIcon,
      duration: 4000,
    },
    { id: 5, title: "Preparing narration", icon: Mic, duration: 2000 },
  ];

  const voiceSteps = [
    { id: 1, title: "Analyzing voice sample", icon: Mic, duration: 2000 },
    { id: 2, title: "Processing audio patterns", icon: Music, duration: 3000 },
    { id: 3, title: "Generating voice model", icon: Sparkles, duration: 4000 },
    {
      id: 4,
      title: "Finalizing voice clone",
      icon: CheckCircle2,
      duration: 1500,
    },
  ];

  const steps = mode === "voice" ? voiceSteps : bookSteps;

  useEffect(() => {
    let currentStep = 0;
    let timeoutId: NodeJS.Timeout;

    const runSteps = () => {
      if (currentStep >= steps.length) return;

      setActiveStep(currentStep);
      const duration = steps[currentStep].duration;

      timeoutId = setTimeout(() => {
        currentStep++;
        runSteps();
      }, duration);
    };

    runSteps();

    return () => clearTimeout(timeoutId);
  }, [mode, steps]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto py-12">
      {/* Main Pulse Icon */}
      <div className="relative mb-8">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-50"
        />
        <div
          className="relative flex items-center justify-center w-20 h-20 rounded-full shadow-2xl text-white z-10"
          style={{
            background: "linear-gradient(135deg, #F472B6 0%, #A855F7 100%)",
          }}
        >
          {mode === "voice" ? (
            <Mic className="w-8 h-8" />
          ) : (
            <BookOpen className="w-8 h-8" />
          )}
        </div>
      </div>

      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
        {mode === "voice" ? "Cloning Your Voice" : "Creating Your Book"}
      </h3>
      <p className="text-gray-500 mb-8 text-sm">
        {mode === "voice"
          ? "Please wait while we process your voice..."
          : "It could take upto 1 minutes, We are weaving your magic story..."}
      </p>

      <div className="w-full space-y-4">
        {steps.map((item, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative overflow-hidden p-4 flex items-center gap-4 rounded-xl border transition-all duration-300",
                isActive
                  ? "border-purple-500/50 bg-purple-500/5 shadow-lg shadow-purple-500/10 scale-[1.02]"
                  : isCompleted
                    ? "border-green-500/30 bg-green-500/5 opacity-80"
                    : "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 opacity-50",
              )}
            >
              {/* Progress Bar Background for Active Step */}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-purple-600"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: item.duration / 1000,
                    ease: "linear",
                  }}
                />
              )}

              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors",
                  isActive
                    ? "bg-purple-100 text-purple-600"
                    : isCompleted
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400",
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <item.icon className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1">
                <h4
                  className={cn(
                    "font-medium text-sm transition-colors",
                    isActive
                      ? "text-gray-900 dark:text-gray-100"
                      : isCompleted
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-400",
                  )}
                >
                  {item.title}
                </h4>
              </div>

              {isActive && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-semibold text-purple-600 uppercase tracking-wider"
                >
                  Processing
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CreatingYourBook;
